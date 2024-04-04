import {
  createSignerFromKeypair,
  percentAmount
  // sol
} from '@metaplex-foundation/umi';
import { payer, umi } from '../lib/variables';
import { UriGeneratorParams } from 'src/typing/validators';
import {
  TokenStandard,
  createV1
} from '@metaplex-foundation/mpl-token-metadata';
import { saveMintToken } from '../lib/helpers';

const generateUri = async (uriParams: UriGeneratorParams) => {
  const uri = await umi.uploader.uploadJson(uriParams);
  console.log('uri: ', uri);
  return uri;
};

export const createNewTokenOnBlockchain = async (
  uriParams: UriGeneratorParams
) => {
  // request for airdrop if there isn't enough money
  // const balance = await umi.rpc.getBalance(payer.publicKey);
  // console.log(balance);

  // if (balance <= sol(1)) {
  //   // request for airdrop
  //   await umi.rpc.airdrop(payer.publicKey, sol(2));
  // }

  // if no airdrop is needed, continue
  const mintKeypair = umi.eddsa.generateKeypair();
  console.log('Payer key', payer.publicKey);
  console.log('Mint key', mintKeypair.publicKey);

  const builder = createV1(umi, {
    mint: createSignerFromKeypair(umi, mintKeypair),
    authority: createSignerFromKeypair(umi, payer),
    name: uriParams.name,
    uri: await generateUri(uriParams),
    sellerFeeBasisPoints: percentAmount(uriParams.percentOwnership || 5.5),
    tokenStandard: TokenStandard.Fungible,
    symbol: uriParams.symbol
  });

  await builder.sendAndConfirm(umi);

  saveMintToken({ token: mintKeypair.publicKey });

  return {
    token: mintKeypair.publicKey
  };
};
