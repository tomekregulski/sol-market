import { useContext, useState } from 'react';
import { Provider, web3, utils, BN } from '@project-serum/anchor';
import { PublicKey, Transaction } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import * as anchor from '@project-serum/anchor';

import axios from 'axios';
const apiRootUrl = 'http://localhost:5678';

import { TokenContext } from './token.context';
import { MAGAI_MINT_STRING_DEV } from './token.constants';
const mintPk = new PublicKey(MAGAI_MINT_STRING_DEV);

export default function useTokens() {
    const { state, dispatch } = useContext(TokenContext);

    const fetchProducts = async () => {
        console.log('fetch');
        await axios
            .get(`${apiRootUrl}/v1/products`)
            .then((res) => dispatch({ type: 'UPDATE_PRODUCTS', payload: res.data }));
    };

    // @ts-ignore
    const checkUserMagaiBalance = async (provider) => {
        console.log('check balance');
        const { wallet, connection } = provider;

        try {
            let userMagai = 0;

            // get all token accounts from connected wallet
            const response = await connection.getParsedTokenAccountsByOwner(wallet.publicKey, {
                programId: TOKEN_PROGRAM_ID,
            });

            // @ts-ignore
            response.value.forEach((accountInfo) => {
                if (accountInfo.account.data['parsed']['info'].mint === MAGAI_MINT_STRING_DEV) {
                    userMagai = accountInfo.account.data['parsed']['info']['tokenAmount']['amount'];
                }
            });

            dispatch({ type: 'UPDATE_TOKENS', payload: userMagai });
        } catch (err) {
            console.error(err);
        }
    };

    // @ts-ignore
    const checkUserStakingStatus = async (program) => {
        const allStakedTokens = await program.account.stakeAccount.all();

        let currentlyStaking = false;

        for (const token in allStakedTokens) {
            if (
                allStakedTokens[token].account.stakingTokenOwner.toString() ===
                program.provider.wallet.publicKey.toString()
            ) {
                currentlyStaking = true;
                break;
            }
        }

        if (currentlyStaking === true) {
            dispatch({ type: 'UPDATE_CURRENTLY_STAKING', payload: true });
        }
    };

    // @ts-ignore
    const sendPayment = async (program, amount) => {
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

    return {
        checkUserMagaiBalance,
        checkUserStakingStatus,
        fetchProducts,
        sendPayment,
    };
}
