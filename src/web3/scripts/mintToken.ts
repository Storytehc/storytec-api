import { TokenStandard, mintV1 } from '@metaplex-foundation/mpl-token-metadata';
import { MintTokenParams } from 'src/typing/validators';
import { payer, umi } from '../lib/variables';
import { createSignerFromKeypair, publicKey } from '@metaplex-foundation/umi';

export const mintTokenOnBlockchain = async (mintTokenBody: MintTokenParams) => {
  // this is where you do the airdrop thingy
  const builder = mintV1(umi, {
    mint: publicKey(mintTokenBody.token),
    authority: createSignerFromKeypair(umi, payer),
    amount: mintTokenBody.amountToMint,
    tokenOwner: payer.publicKey,
    tokenStandard: TokenStandard.Fungible
  });

  await builder.sendAndConfirm(umi);
};
