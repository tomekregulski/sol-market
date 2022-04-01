import { PublicKey, Keypair } from '@solana/web3.js';

const mintAuthority = [
    160, 175, 57, 60, 74, 185, 112, 151, 235, 211, 38, 152, 46, 228, 8, 243, 38, 181, 239, 235, 207, 69, 172, 0, 103,
    38, 188, 8, 50, 194, 166, 236, 176, 81, 156, 143, 189, 60, 241, 242, 20, 104, 52, 205, 88, 78, 48, 87, 86, 5, 148,
    48, 131, 207, 4, 104, 156, 81, 32, 246, 255, 15, 182, 211,
].slice(0, 32);

export const mintAuthorityKeypair = Keypair.fromSeed(Uint8Array.from(mintAuthority));
