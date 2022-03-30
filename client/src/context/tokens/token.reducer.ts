import { TokenState } from './token.types';

// @ts-ignore
export default function tokenReducer(state: TokenState, { type, payload }) {
    switch (type) {
        case 'UPDATE_TOKENS':
            return {
                ...state,
                unstaked: payload,
            };
        case 'UPDATE_STAKED':
            return {
                ...state,
                staked: payload,
            };
        case 'LOADING':
            return {
                ...state,
                loading: payload,
            };
        default:
            break;
    }
    return state;
}
