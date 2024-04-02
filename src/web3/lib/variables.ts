import { Connection, clusterApiUrl } from '@solana/web3.js';
import { loadKeypairOrGenerate } from './helpers';

// The rpc node is the devnet url if not customized
const RPC_NODE_URL: string =
  process.env.SOLANA_RPC_NODE ?? clusterApiUrl('devnet');

export const connection = new Connection(RPC_NODE_URL); // create a connection

export const payer = loadKeypairOrGenerate(); // load the payer
