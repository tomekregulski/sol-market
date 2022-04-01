import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Cashier } from '../target/types/cashier';
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import {
  TOKEN_PROGRAM_ID,
  getMint,
  getAccount,
  createAssociatedTokenAccount,
} from '@solana/spl-token';
import { assert } from 'chai';

import {
  ownerWalletKeypair,
  payerKeypair, // Call this something better - attacker, etc
  rewardMintAuthorityKeypair,
} from './utils/users';

describe('cashier', () => {
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Cashier as Program<Cashier>;

  const rewardMint = 'CoLyPNKkZvFhNMeh9BT3ELGj7dgk3MS234AWXPoFYemZ';
  const rewardMintPk = new PublicKey(rewardMint);

  console.log('rewardMintPk');
  console.log(rewardMintPk);
  console.log('ownerWalletKeypair');
  console.log(ownerWalletKeypair.publicKey.toString());

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log('Your transaction signature', tx);
  });

  it('Sends money', async () => {
    console.log('attempting distribution...');

    let senderMagaiTokenAccount = (
      await provider.connection.getParsedTokenAccountsByOwner(
        ownerWalletKeypair.publicKey as PublicKey,
        {
          mint: rewardMintPk as PublicKey,
        }
      )
    ).value;

    // let ata = await createAssociatedTokenAccount(
    //   provider.connection, // connection
    //   payerKeypair, // fee payer
    //   rewardMintPk, // mint
    //   payerKeypair.publicKey // owner,
    // );

    // let payerTokenAccount = (
    //   await provider.connection.getParsedTokenAccountsByOwner(
    //     payerKeypair.publicKey as PublicKey,
    //     {
    //       mint: rewardMintPk as PublicKey,
    //     }
    //   )
    // ).value;
    let receiverTokenAccount = (
      await provider.connection.getParsedTokenAccountsByOwner(
        rewardMintAuthorityKeypair.publicKey as PublicKey,
        {
          mint: rewardMintPk as PublicKey,
        }
      )
    ).value;

    console.log('retrievedRewardAta');
    console.log(senderMagaiTokenAccount[0]);

    console.log('mintAuthorityTokenAccount');
    console.log(receiverTokenAccount[0]);

    const amount = new anchor.BN(10);
    console.log('amount');
    console.log(amount);

    console.log('rewardMintAuthorityKeypair.publicKey');
    console.log(rewardMintAuthorityKeypair.publicKey);
    console.log(rewardMintAuthorityKeypair.publicKey.toString());

    const tx = await program.rpc.purchaseMarketplaceItem(amount, {
      accounts: {
        sender: ownerWalletKeypair.publicKey,
        tokenMint: rewardMintPk,
        senderMagaiTokenAccount: senderMagaiTokenAccount[0].pubkey,
        magaiBankTokenAccount: receiverTokenAccount[0].pubkey,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
      signers: [ownerWalletKeypair],
    });

    console.log(tx);

    console.log('successfully collected rewards');
  });
});
