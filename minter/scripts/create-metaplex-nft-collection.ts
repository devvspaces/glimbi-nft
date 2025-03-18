import {
  generateSigner,
  keypairIdentity,
  percentAmount,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  airdropIfRequired,
  getExplorerLink,
  getKeypairFromFile,
} from "@solana-developers/helpers";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { promises as fs } from "fs";
import * as path from "path";
import "dotenv/config";
import {
  createNft,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import { uploadFile, uploadJson } from "./utils";

async function main() {
  // create a new connection to Solana's devnet cluster
  const connection = new Connection(clusterApiUrl("devnet"), {
    commitment: "confirmed",
  });

  // load keypair from local file system
  // assumes that the keypair is already generated using `solana-keygen new`
  const user = await getKeypairFromFile(process.env.KEYPAIR_PATH!);

  await airdropIfRequired(
    connection,
    user.publicKey,
    1 * LAMPORTS_PER_SOL,
    0.1 * LAMPORTS_PER_SOL
  );

  console.log("Loaded user:", user.publicKey.toBase58());

  const umi = createUmi(connection);

  // convert to umi compatible keypair
  const umiKeypair = umi.eddsa.createKeypairFromSecretKey(user.secretKey);

  // assigns a signer to our umi instance, and loads the MPL metadata program and Irys uploader plugins.
  umi
    .use(keypairIdentity(umiKeypair))
    .use(mplTokenMetadata())

  const collectionImagePath = path.resolve(
    path.dirname("."),
    "./assets/collection.png"
  );
  const image = await uploadFile(collectionImagePath);
  console.log("image uri:", image);
  const uri = await uploadJson({
    name: "Glimbi Tales",
    symbol: "GT",
    description:
      "Glimbi are remarkable beings with unique powers, united in their quest to protect their world from the mysterious dangers that threaten their home.",
    image,
    properties: {
      files: [
        {
          uri: image,
          type: 'image/png',
        },
      ],
      category: 'image',
    },
  });
  console.log("Collection offchain metadata URI:", uri);

  // generate mint keypair
  const collectionMint = generateSigner(umi);

  // create and mint NFT
  await createNft(umi, {
    mint: collectionMint,
    name: "Glimbi Tales",
    uri,
    updateAuthority: umi.identity.publicKey,
    sellerFeeBasisPoints: percentAmount(0),
    isCollection: true,
    isMutable: true,
  }).sendAndConfirm(umi, { send: { commitment: "finalized" } });

  let explorerLink = getExplorerLink(
    "address",
    collectionMint.publicKey,
    "devnet"
  );
  console.log(`Collection NFT:  ${explorerLink}`);
  console.log(`Collection NFT address is:`, collectionMint.publicKey);
  console.log("✅ Finished successfully!");
}

main().catch(console.error);
