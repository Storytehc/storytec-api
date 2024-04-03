import { Connection, clusterApiUrl } from '@solana/web3.js';
import { loadKeypairOrGenerate } from './helpers';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
// import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { bundlrUploader } from '@metaplex-foundation/umi-uploader-bundlr';

import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { keypairIdentity } from '@metaplex-foundation/umi';
// import {
//   createSignerFromKeypair,
//   signerIdentity
// } from '@metaplex-foundation/umi';

// The rpc node is the devnet url if not customized
const RPC_NODE_URL: string =
  process.env.SOLANA_RPC_NODE ?? clusterApiUrl('devnet');

export const connection = new Connection(RPC_NODE_URL); // create a connection

export const umi = createUmi(RPC_NODE_URL)
  .use(mplTokenMetadata())
  .use(bundlrUploader());

export const payer = loadKeypairOrGenerate(); // load the payer

// register secret key with the umi framework
umi.use(keypairIdentity(payer));
