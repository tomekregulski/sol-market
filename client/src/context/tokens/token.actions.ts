import { useContext, useState } from 'react';
import { Provider, web3, utils, BN } from '@project-serum/anchor';
import { PublicKey, Transaction } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

import { TokenContext } from './token.context';
import { MAGAI_MINT_STRING } from './token.constants';

export default function useTokens() {
    const { state, dispatch } = useContext(TokenContext);

    // @ts-ignore
    const checkUserMagaiBalance = async (provider) => {
        const { wallet, connection } = provider;

        try {
            let userMagai = 0;

            // get all token accounts from connected wallet
            const response = await connection.getParsedTokenAccountsByOwner(wallet.publicKey, {
                programId: TOKEN_PROGRAM_ID,
            });

            // @ts-ignore
            response.value.forEach((accountInfo) => {
                if (accountInfo.account.data['parsed']['info'].mint === MAGAI_MINT_STRING) {
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
}
