import * as anchor from '@project-serum/anchor';
import { Provider } from '@project-serum/anchor';
import { PublicKey, Connection, Transaction } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { mintAuthorityKeypair } from './utils/users';

import { MAGAI_MINT_STRING_DEV } from '../context/tokens/token.constants';
const mintPk = new PublicKey(MAGAI_MINT_STRING_DEV);

// @ts-ignore
export const checkUserMagaiBalance = async (connection, wallet) => {
    try {
        let userMagai = 0;

        // get all token accounts from connected wallet
        const response = await connection.getParsedTokenAccountsByOwner(wallet.publicKey, {
            programId: TOKEN_PROGRAM_ID,
        });

        // @ts-ignore
        response.value.forEach((accountInfo) => {
            // console.log(accountInfo.account.data['parsed']['info'].mint);
            if (accountInfo.account.data['parsed']['info'].mint === MAGAI_MINT_STRING_DEV) {
                userMagai = accountInfo.account.data['parsed']['info']['tokenAmount']['amount'];
            }
        });

        console.log('balance refresh');
        console.log(userMagai);
        return userMagai;
    } catch (err) {
        console.error(err);
    }
};

// @ts-ignore
export const initialize = async (provider: Provider, program) => {
    const sender = program.provider.wallet;

    const tx = await program.transaction.initialize({
        signers: sender,
    });

    tx.feePayer = await program.provider.wallet.publicKey;
    const blockhashObj = await provider.connection.getRecentBlockhash();
    tx.recentBlockhash = await blockhashObj.blockhash;
    const signedTransaction = await program.provider.wallet.signTransaction(tx);

    const test = signedTransaction.serialize();
    const transactionId = await provider.connection.sendRawTransaction(test);
    console.log('transactionId: ', transactionId);

    console.log('initialized successfully!');
    return transactionId;
};

// @ts-ignore
export const sendPayment = async (program, amount) => {
    console.log('preparing payment transaction...');
    let tx;

    try {
        console.log('enter try block');
        const bankATA = (
            await program.provider.connection.getParsedTokenAccountsByOwner(
                program.provider.wallet.publicKey as PublicKey,
                {
                    mint: mintPk as PublicKey,
                }
            )
        ).value;

        console.log('bankATA');
        console.log(bankATA);
        const senderATA = (
            await program.provider.connection.getParsedTokenAccountsByOwner(
                program.provider.wallet.publicKey as PublicKey,
                {
                    mint: mintPk as PublicKey,
                }
            )
        ).value;

        console.log('senderATA');
        console.log(senderATA);
        // @ts-ignore
        const paymentAmount = new anchor.BN(amount);

        console.log('paymentAmount');
        console.log(paymentAmount);

        const sender = program.provider.wallet;
        tx = await program.transaction.purchaseMarketplaceItem(paymentAmount, {
            accounts: {
                sender: sender.publicKey,
                tokenMint: mintPk,
                senderMagaiTokenAccount: senderATA[0].pubkey,
                magaiBankTokenAccount: bankATA[0].pubkey,
                tokenProgram: TOKEN_PROGRAM_ID,
            },
            signers: [program.provider.wallet],
        });

        tx.feePayer = await program.provider.wallet.publicKey;
        const blockhashObj = await program.provider.connection.getRecentBlockhash();
        tx.recentBlockhash = await blockhashObj.blockhash;
        const signedTx = await program.provider.wallet.signTransaction(tx);

        const serializedTx = signedTx.serialize();
        const txId = await program.provider.connection.sendRawTransaction(serializedTx);
        console.log('transactionId: ', txId);

        console.log('payment successfully sent!');
        return { message: 'success', payload: txId };
    } catch (err) {
        console.error(err);
        return { message: 'failed', payload: '' };
    }
};
