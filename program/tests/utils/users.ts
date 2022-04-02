import { publicKey } from '@project-serum/anchor/dist/cjs/utils';
import { base64 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { PublicKey, Keypair } from '@solana/web3.js';
import 'dotenv';

export const rewardWalletSKSeed = process.env.REWARD_WALLET_SK;


const seed = [
  198, 44, 7, 166, 138, 255, 142, 136, 188, 235, 103, 88, 114, 101, 125, 241,
  56, 15, 114, 218, 5, 228, 21, 29, 148, 227, 6, 31, 8, 104, 1, 31, 206, 145,
  205, 30, 167, 20, 125, 71, 143, 125, 130, 56, 158, 111, 106, 184, 87, 119,
  189, 110, 170, 181, 118, 92, 244, 233, 108, 88, 253, 193, 169, 16,
].slice(0, 32);
const payerSeed = [
  122, 43, 175, 60, 82, 71, 105, 52, 240, 221, 90, 202, 164, 83, 83, 56, 48, 96,
  118, 193, 243, 121, 103, 167, 81, 13, 72, 79, 222, 132, 104, 180, 109, 153,
  210, 30, 199, 196, 103, 221, 134, 183, 212, 234, 240, 218, 90, 127, 180, 225,
  237, 59, 190, 241, 11, 23, 74, 239, 145, 164, 39, 184, 15, 144,
].slice(0, 32);
const rewardMintAuthority = [
  38, 160, 146, 62, 123, 196, 115, 195, 67, 100, 163, 195, 137, 72, 39, 153,
  215, 6, 8, 141, 132, 130, 52, 229, 227, 49, 185, 245, 11, 64, 76, 99, 40, 76,
  93, 51, 195, 186, 19, 218, 65, 245, 18, 25, 225, 125, 8, 43, 62, 18, 171, 141,
  14, 95, 253, 47, 78, 87, 216, 255, 245, 122, 242, 36,
].slice(0, 32);

export const payerKeypair = Keypair.fromSeed(Uint8Array.from(payerSeed));
export const ownerWalletKeypair = Keypair.fromSeed(Uint8Array.from(seed));
export const rewardMintAuthorityKeypair = Keypair.fromSeed(
  Uint8Array.from(rewardMintAuthority)
);
