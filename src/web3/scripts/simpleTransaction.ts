import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { connection, payer } from '../lib/variables';
import { requestAirdrop } from '../lib/helpers';

const simpleTransaction = async () => {
  console.log('payer is', payer.publicKey.toBase58());

  const balance = await connection.getBalance(payer.publicKey);

  if (balance < LAMPORTS_PER_SOL) {
    await requestAirdrop({ connection, publicKey: payer.publicKey });
  }

  return 'balance is: ' + balance / LAMPORTS_PER_SOL;
};

export default simpleTransaction;
