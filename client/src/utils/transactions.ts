import * as anchor from '@project-serum/anchor';
import { Provider } from '@project-serum/anchor';
import { PublicKey, Connection, Transaction } from '@solana/web3.js';

// @ts-ignore
// const findTokenAccounts = async (token) => {
//     const mint = new PublicKey(token);
//     const ATA = (
//         await provider.connection.getParsedTokenAccountsByOwner(program.provider.wallet.publicKey as PublicKey, {
//             mint: mint as PublicKey,
//         })
//     ).value;
//     console.log(ATA[0]);
//     setSelectedStakingToken(ATA[0]);
// };

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
    console.log('signedTransaction');
    console.log(signedTransaction);

    const test = signedTransaction.serialize();
    const transactionId = await provider.connection.sendRawTransaction(test);
    console.log(transactionId);

    console.log('initialized successfully!');
    return transactionId;
};
