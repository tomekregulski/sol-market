import { PublicKey, Connection, Keypair } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Provider } from '@project-serum/anchor';
// import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
// import idl from '../idl.json';

export const preflightCommitment = 'processed';
export const connectionConfig = { commitment: 'confirmed', confirmTransactionInitialTimeout: 60000 };
// export const programID = new PublicKey(idl.metadata.address);
