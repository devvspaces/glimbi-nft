import { mintTo, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromFile,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

async function main() {
  const user = await getKeypairFromFile(process.env.KEYPAIR_PATH);
  const connection = new Connection(clusterApiUrl("devnet"), {
    commitment: "confirmed",
  });

  // Substitute in your token mint account from create-token-mint.ts
  const tokenMintAccount = new PublicKey(
    "6RXktFWSd9qSdEVbwQwhhWXJm9SL9yrykhEvGb8Fsih9"
  );
  // Here we are making an associated token account for our own address, but we can
  // make an ATA on any other wallet in devnet!
  const recipient = new PublicKey("2J1rPo2JsrGWWdwvbYGNYqsNsV5pjrsjRcRuYf2pUYjQ");
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMintAccount,
    recipient
  );
  console.log(`Token Account: ${tokenAccount.address.toBase58()}`);
  let link = getExplorerLink(
    "address",
    tokenAccount.address.toBase58(),
    "devnet"
  );
  console.log(`✅ Token Account: ${link}`);

  // Our token has 9 decimal places
  const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 9);
  // Mint tokens
  const transactionSignature = await mintTo(
    connection,
    user,
    tokenMintAccount,
    tokenAccount.address,
    user,
    10 * MINOR_UNITS_PER_MAJOR_UNITS
  );
  link = getExplorerLink("transaction", transactionSignature, "devnet");
  console.log(`✅ Success! Mint Token Transaction: ${link}`);
}

main().catch(console.error);
