import React, { useState, useEffect } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import * as anchor from '@project-serum/anchor';

// import { preflightCommitment, programID, getNft, connectionConfig } from '../utils/index';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Program, Provider } from '@project-serum/anchor';

import axios from 'axios';

import MarketPlace from './MarketPlace';

import * as styles from '../styles/index';

const WalletContainer: React.FC = () => {
    const devnet = clusterApiUrl('devnet');
    // const mainnet = clusterApiUrl('mainnet-beta');
    const network = devnet;

    const wallet = useAnchorWallet();
    // console.log(wallet);
    // @ts-ignore
    // const connection = new Connection(network, connectionConfig);
    // @ts-ignore
    // const provider = new Provider(connection, wallet, preflightCommitment);
    // @ts-ignore
    // const program = new Program(idl, programID, provider);

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

    // TODO: parse user tokens and set MAGAI tokens to state, display on screen.

    return (
        <>
            <div className="multi-wrapper">
                <div className="button-wrapper">
                    <WalletModalProvider>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '80px',
                            }}
                        >
                            <WalletMultiButton />
                        </div>
                        {wallet ? (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <MarketPlace />
                            </div>
                        ) : (
                            <p>Connect your wallet to begin</p>
                        )}
                    </WalletModalProvider>
                </div>
            </div>
        </>
    );
};

export default WalletContainer;
