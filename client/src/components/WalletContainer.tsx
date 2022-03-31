import React, { useState, useEffect, useContext } from 'react';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';

import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Program, Provider } from '@project-serum/anchor';

// import { TokenContext } from '../context/tokens/token.context';
// import useTokens from '../context/tokens/token.actions';

import market_idl from '../utils/idl.json';

import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import { preflightCommitment, programID, connectionConfig } from '../utils/index';

import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { MAGAI_MINT_STRING } from '../context/tokens/token.constants';

import axios from 'axios';

import MarketPlace from './MarketPlace';
import * as styles from '../styles/index';

const WalletContainer: React.FC = () => {
    const [tokenAmount, setTokenAmount] = useState(0);
    const devnet = clusterApiUrl('devnet');
    const mainnet = clusterApiUrl('mainnet-beta');
    const network = mainnet;

    const wallet = useAnchorWallet();
    console.log(wallet);
    // @ts-ignore
    const connection = new Connection(network, connectionConfig);
    // @ts-ignore
    const provider = new Provider(connection, wallet, preflightCommitment);
    // @ts-ignore
    const program = new Program(market_idl, programID, provider);

    // TODO: parse user tokens and set MAGAI tokens to state, display on screen.
    // const {
    //     state: { tokenAmount, staked, loading },
    // } = useContext(TokenContext);

    // const { checkUserMagaiBalance } = useTokens();

    useEffect(() => {
        const checkUserMagaiBalance = async () => {
            if (wallet) {
                try {
                    let userMagai = 0;

                    // get all token accounts from connected wallet
                    const response = await connection.getParsedTokenAccountsByOwner(wallet.publicKey, {
                        programId: TOKEN_PROGRAM_ID,
                    });

                    // @ts-ignore
                    response.value.forEach((accountInfo) => {
                        // console.log(accountInfo.account.data['parsed']['info'].mint);
                        if (accountInfo.account.data['parsed']['info'].mint === MAGAI_MINT_STRING) {
                            userMagai = accountInfo.account.data['parsed']['info']['tokenAmount']['amount'];
                        }
                    });

                    setTokenAmount(userMagai);
                } catch (err) {
                    console.error(err);
                }
            }
        };
        checkUserMagaiBalance();
    }, [wallet, connection]);

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
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                                marginTop: '40px',
                            }}
                        >
                            <WalletMultiButton />
                            <p>$MAGAI: {tokenAmount}</p>
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
                                    <MarketPlace balance={tokenAmount} provider={provider} program={program} />
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
