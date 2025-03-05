import {
  findMetadataPda,
  mplTokenMetadata,
  verifyCollectionV1,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  keypairIdentity,
  publicKey as UMIPublicKey,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  airdropIfRequired,
  getExplorerLink,
  getKeypairFromFile,
} from "@solana-developers/helpers";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
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

  // assigns a signer to our umi instance, and loads the MPL metadata program and Irys uploader plugins.
  umi.use(keypairIdentity(umiKeypair)).use(mplTokenMetadata());

  // Substitute in your collection NFT address from create-metaplex-nft-collection.ts
  const collectionAddress = UMIPublicKey(
    "4FEmXnCjFFm43RxYDhiUrUVsk6YzsrXG4sHVVhfrrUWK"
  );

  // Substitute in your NFT address from create-metaplex-nft.ts
  const nftAddress = UMIPublicKey(
    "DMcgKjCRbuEAmV56WkUWCm3JQfy1VNRQqwHGZ8KqU7kV"
  );

  // Verify our collection as a Certified Collection
  // See https://developers.metaplex.com/token-metadata/collections
  const metadata = findMetadataPda(umi, { mint: nftAddress });
  await verifyCollectionV1(umi, {
    metadata,
    collectionMint: collectionAddress,
    authority: umi.identity,
  }).sendAndConfirm(umi);

  let explorerLink = getExplorerLink("address", nftAddress, "devnet");
  console.log(`verified collection:  ${explorerLink}`);
  console.log("✅ Finished successfully!");
}

main().catch(console.error);
