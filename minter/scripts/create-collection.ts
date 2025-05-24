import {
  generateSigner,
  keypairIdentity,
  percentAmount,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  getKeypairFromFile,
} from "@solana-developers/helpers";
import { Connection } from "@solana/web3.js";
import {
  createNft,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import dotenv from "dotenv";
import { NETWORK } from "./utils";
dotenv.config();

async function main() {
  // create a new connection to Solana's devnet cluster
  const connection = new Connection(NETWORK, {
    commitment: "confirmed",
    wsEndpoint: NETWORK.replace("http", "ws"),
  });

  // load keypair from local file system
  // assumes that the keypair is already generated using `solana-keygen new`
  const user = await getKeypairFromFile(process.env.KEYPAIR_PATH!);

  console.log("Loaded user:", user.publicKey.toBase58());

  const umi = createUmi(connection);

  // convert to umi compatible keypair
  const umiKeypair = umi.eddsa.createKeypairFromSecretKey(user.secretKey);

  // assigns a signer to our umi instance, and loads the MPL metadata program and Irys uploader plugins.
  umi.use(keypairIdentity(umiKeypair)).use(mplTokenMetadata());

  const uri = "https://peach-necessary-primate-505.mypinata.cloud/ipfs/bafkreigsjyzvivmso5r3eo3sawwvjgafxjif7bqndr2imp6rdnzq3is5ze"

  // generate mint keypair
  const collectionMint = generateSigner(umi);

  // create and mint NFT
  await createNft(umi, {
    mint: collectionMint,
    name: "Glimbi Tales Collection",
    symbol: "GLIMBI",
    uri,
    authority: umi.identity,
    sellerFeeBasisPoints: percentAmount(5, 2),
    isCollection: true,
    isMutable: true,
    collectionDetails: {
      __kind: 'V1',
      size: 0,
    },
  }).sendAndConfirm(umi, { send: { commitment: "finalized" } });

  console.log(`Collection NFT address is:`, collectionMint.publicKey);
  console.log("✅ Finished successfully!");
}

main().catch(console.error);
