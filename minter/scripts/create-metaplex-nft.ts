import {
  createNft,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  generateSigner,
  keypairIdentity,
  percentAmount,
  publicKey as UMIPublicKey,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import {
  airdropIfRequired,
  getExplorerLink,
  getKeypairFromFile,
} from "@solana-developers/helpers";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as path from "path";
import { uploadFile, uploadJson } from "./utils";
import "dotenv/config";

async function main() {
  // create a new connection to Solana's devnet cluster
  const connection = new Connection(clusterApiUrl("devnet"), {
    commitment: "confirmed",
  });

  // load keypair from local file system
  // assumes that the keypair is already generated using `solana-keygen new`
  const user = await getKeypairFromFile(process.env.KEYPAIR_PATH!);
  console.log("Loaded user:", user.publicKey.toBase58());

  await airdropIfRequired(
    connection,
    user.publicKey,
    1 * LAMPORTS_PER_SOL,
    0.1 * LAMPORTS_PER_SOL
  );

  const umi = createUmi(connection);

  // convert to umi compatible keypair
  const umiKeypair = umi.eddsa.createKeypairFromSecretKey(user.secretKey);

  // load our plugins and signer
  umi
    .use(keypairIdentity(umiKeypair))
    .use(mplTokenMetadata())
    .use(irysUploader());

  // Substitute in your collection NFT address from create-metaplex-nft-collection.ts
  const collectionNftAddress = UMIPublicKey(
    "4FEmXnCjFFm43RxYDhiUrUVsk6YzsrXG4sHVVhfrrUWK"
  );

  const NFTImagePath = path.resolve(
    path.dirname("."),
    "./output/nft_5ae4244543da4bcaa8678a93b53d2ad5.png"
  );
  const image = await uploadFile(NFTImagePath);
  console.log("image uri:", image);
  // upload offchain json using irys and get metadata uri
  const uri = await uploadJson({
    name: "Glimbi #03",
    symbol: "GT",
    description: "Glimbi are remarkable beings with unique powers.",
    image,
    attributes: [
      { trait_type: "body", value: "Stormcharged Form" },
      { trait_type: "cloth", value: "Glacial Veil" },
      { trait_type: "wand", value: "Hawkeye Spear" },
      { trait_type: "ear", value: "Earthborn Ridge" },
      { trait_type: "mouth", value: "Frozen Fang" },
      { trait_type: "eye", value: "Lightning Glare" },
    ],
  });
  console.log("NFT offchain metadata URI:", uri);

  // generate mint keypair
  const mint = generateSigner(umi);

  // create and mint NFT
  await createNft(umi, {
    mint,
    name: "Glimbi Tales #01",
    symbol: "GT",
    uri,
    updateAuthority: umi.identity.publicKey,
    sellerFeeBasisPoints: percentAmount(0),
    collection: {
      key: collectionNftAddress,
      verified: false,
    },
    isCollection: false,
  }).sendAndConfirm(umi, { send: { commitment: "finalized" } });

  let explorerLink = getExplorerLink("address", mint.publicKey, "devnet");
  console.log(`NFT Mint:  ${explorerLink}`);
}

main().catch(console.error);
