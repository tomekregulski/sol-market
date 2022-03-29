import React, { useState, useEffect } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import * as anchor from '@project-serum/anchor';

import { preflightCommitment, programID, connectionConfig } from '../utils/index';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Program, Provider } from '@project-serum/anchor';
import idl from '../utils/idl.json';

import axios from 'axios';

import MarketPlace from './MarketPlace';

import * as styles from '../styles/index';

const WalletContainer: React.FC = () => {
    const devnet = clusterApiUrl('devnet');
    // const mainnet = clusterApiUrl('mainnet-beta');
    const network = devnet;

    const wallet = useAnchorWallet();
    console.log(wallet);
    // @ts-ignore
    const connection = new Connection(network, connectionConfig);
    // @ts-ignore
    const provider = new Provider(connection, wallet, preflightCommitment);
    // @ts-ignore
    const program = new Program(idl, programID, provider);

    // TODO: parse user tokens and set MAGAI tokens to state, display on screen.

    useEffect(() => {
        axios.get('http://localhost:5678/v1/tx').then((response) => console.log(response.data));
    }, []);

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
                                {
                                    // @ts-ignore
                                    <MarketPlace provider={provider} program={program} />
                                }{' '}
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
