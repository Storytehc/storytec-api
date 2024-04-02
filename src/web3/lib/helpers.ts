import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction
} from '@solana/web3.js';
import * as path from 'path';
import * as fs from 'fs';

// constant declarations
const RELATIVE_DIR_PATH = path.relative(
  __filename,
  path.join(__dirname, '..', 'keys')
); // get the relative path for the keys directory

interface RequestAirdrop {
  connection: Connection;
  publicKey: PublicKey;
  amount?: number;
}

export const requestAirdrop = async (params: RequestAirdrop) => {
  const { connection, publicKey } = params;

  console.log('Requesting airdrop for', publicKey.toBase58());

  // get the signature of the completed airdrop
  const signature = await connection.requestAirdrop(
    publicKey,
    LAMPORTS_PER_SOL
  );

  console.log('Success!');
  console.log('Transaction signature:', signature);
};

export const saveKeypairToFile = (
  keypair: Keypair,
  fileName: string,
  dirPath: string
) => {
  try {
    // we will write the keypair to a file. But first, we would need to convert it to JSON
    fileName = path.join(dirPath, `${fileName}.json`); // path of the file

    if (!fs.existsSync(dirPath)) {
      // make the directory
      fs.mkdirSync(dirPath);
    }

    if (fs.existsSync(fileName)) {
      // if the file exists, delete it
      fs.unlinkSync(fileName);
    }

    fs.writeFileSync(fileName, `[${keypair.secretKey.toString()}]`, {
      encoding: 'utf-8'
    });

    return fileName;
  } catch (err: unknown) {
    throw new Error(`Could not say key to file: ${err}`);
  }
};

export const loadKeypairFromFile = (searchPath: string) => {
  try {
    // open the file and read the keypair from the file
    const keypairBytes = JSON.parse(
      fs.readFileSync(searchPath, { encoding: 'utf-8' })
    );
    return Keypair.fromSecretKey(new Uint8Array(keypairBytes));
  } catch (err: unknown) {
    throw new Error(`Could not load key from file: ${err}`);
  }
};

export const loadKeypairOrGenerate = (
  fileName: string = 'keypair',
  dirPath: string = RELATIVE_DIR_PATH
) => {
  try {
    // load or generate the keypair
    const searchPath = path.join(dirPath, `${fileName}.json`);
    let keypair = Keypair.generate();

    // check if the file exists
    if (fs.existsSync(searchPath)) {
      keypair = loadKeypairFromFile(searchPath);
    } else {
      // save the keypair to the file
      saveKeypairToFile(keypair, fileName, dirPath);
    }

    return keypair;
  } catch (err: unknown) {
    throw new Error(`There was an error loading Keypair ${err}`);
  }
};

interface BuildTransaction {
  payerKey: PublicKey;
  instructions: TransactionInstruction[];
  connection: Connection;
  signers: Keypair[];
}

export const buildTransaction = async (params: BuildTransaction) => {
  const { payerKey, instructions, connection, signers } = params;

  // get most recent block hash
  const { blockhash } = await connection.getLatestBlockhash();

  // generate a transaction message
  const message = new TransactionMessage({
    payerKey,
    instructions,
    recentBlockhash: blockhash
  }).compileToV0Message();

  // create a new versioned transaction
  const tx = new VersionedTransaction(message);
  console.log('Transaction Created..');

  // sign the transaction for all signers
  signers.forEach((signer) => tx.sign([signer]));

  return tx;
};

interface ExplorerUrl {
  address?: string;
  txSignature?: string;
  cluster?: 'devnet' | 'testnet' | 'mainnet-beta';
}

export const showExplorerUrl = (params: ExplorerUrl) => {
  const { address, txSignature, cluster = 'devnet' } = params;
  let baseUrl: string = 'https://explorer.solana.com';

  if (address) baseUrl += `/address/${address}`;
  else if (txSignature) baseUrl += `/tx/${txSignature}`;
  else return '[unknown]';

  const url = new URL(baseUrl);
  url.searchParams.append('cluster', cluster);
  return url.toString() + '\n';
};

export const base64ToUint8Array = (base64: string) => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};
