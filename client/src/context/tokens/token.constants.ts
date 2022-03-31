import { Keypair, PublicKey } from '@solana/web3.js';

export const MAGAI_MINT_STRING_MAIN = 'MAGf4MnUUkkAUUdiYbNFcDnE4EBGHJYLk9foJ2ae7BV';
export const MAGAI_MINT_STRING_DEV = '5wwzrurTXDNHDDrHw2PS78Ev38Hd9f7askUeVzDsnnQ7';

// const rewardMintAuthority = [
//     38, 160, 146, 62, 123, 196, 115, 195, 67, 100, 163, 195, 137, 72, 39, 153, 215, 6, 8, 141, 132, 130, 52, 229, 227,
//     49, 185, 245, 11, 64, 76, 99, 40, 76, 93, 51, 195, 186, 19, 218, 65, 245, 18, 25, 225, 125, 8, 43, 62, 18, 171, 141,
//     14, 95, 253, 47, 78, 87, 216, 255, 245, 122, 242, 36,
// ].slice(0, 32);

// export const rewardMintAuthorityKeypair = Keypair.fromSeed(Uint8Array.from(rewardMintAuthority));

// export const getTokenPk = async (tokenAccount) => {
//     const tokenMintPk = tokenAccount.account.data.parsed.info.mint;
//     return new PublicKey(tokenMintPk);
// };
