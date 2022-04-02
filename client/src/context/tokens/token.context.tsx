import React, { createContext, useReducer } from 'react';
import tokenReducer from './token.reducer';
import { TokenState } from './token.types';

const INITIAL_STATE: TokenState = { products: [], purchases: {}, tokenAmount: 0, staked: false, loading: false };

export const TokenContext = createContext<{
    state: TokenState;
    dispatch: React.Dispatch<any>;
}>({
    state: INITIAL_STATE,
    dispatch: () => null,
});

export const TokenProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(tokenReducer, INITIAL_STATE);

    return <TokenContext.Provider value={{ state, dispatch }}>{children}</TokenContext.Provider>;
};
