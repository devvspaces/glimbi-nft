import {
  createV1,
  TokenStandard,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  generateSigner,
  percentAmount,
  keypairIdentity,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { getKeypairFromFile } from "@solana-developers/helpers";
import "dotenv/config";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { uploadFile, uploadJson } from "./utils";
import * as path from "path";

async function createFungibleToken() {
  // create a new connection to Solana's devnet cluster
  const connection = new Connection(clusterApiUrl("devnet"), {
    commitment: "confirmed",
  });

  // load keypair from local file system
  // assumes that the keypair is already generated using `solana-keygen new`
  const user = await getKeypairFromFile(process.env.KEYPAIR_PATH);
  console.log("Loaded user:", user.publicKey.toBase58());

  // Initialize Umi
  const umi = createUmi(connection);
  // convert to umi compatible keypair
  const umiKeypair = umi.eddsa.createKeypairFromSecretKey(user.secretKey);

  // assigns a signer to our umi instance, and loads the MPL metadata program and Irys uploader plugins.
  umi.use(keypairIdentity(umiKeypair)).use(mplTokenMetadata());

  // Generate a new mint
  const mint = generateSigner(umi);

  // Upload metadata
  const collectionImagePath = path.resolve(
    path.dirname("."),
    "./assets/collection.png"
  );
  const image = await uploadFile(collectionImagePath);
  console.log("image uri:", image);
  const uri = await uploadJson({
    name: "Glimbi Token",
    symbol: "GT",
    description: "Utility token for Glimbi Tales",
    image,
  });
  console.log("Collection offchain metadata URI:", uri);

  // Create the fungible token
  try {
    // Create token with metadata
    await createV1(umi, {
      mint,
      authority: umi.identity,
      name: "Glimbi Token",
      symbol: "GLMB",
      uri,
      sellerFeeBasisPoints: percentAmount(0), // No secondary sale fee
      tokenStandard: TokenStandard.Fungible,
    }).sendAndConfirm(umi);

    console.log("Fungible Token Created Successfully!");
    console.log("Mint Address:", mint.publicKey);
  } catch (error) {
    console.error("Error creating fungible token:", error);
  }
}

// Run the function
createFungibleToken().catch(console.error);
