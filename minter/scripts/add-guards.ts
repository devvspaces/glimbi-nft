import {
  some,
  sol,
  publicKey,
  keypairIdentity,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  fetchCandyMachine,
  mplCandyMachine,
  safeFetchCandyGuard,
  updateCandyGuard,
} from "@metaplex-foundation/mpl-candy-machine";
import dotenv from "dotenv";
import { getKeypairFromFile } from "@solana-developers/helpers";
import { NETWORK } from "./utils";
dotenv.config();

async function main() {
  // Use the RPC endpoint of your choice.
  const umi = createUmi(NETWORK).use(mplCandyMachine());

  const user = await getKeypairFromFile(process.env.KEYPAIR_PATH!);
  const signer = umi.eddsa.createKeypairFromSecretKey(user.secretKey);
  umi.use(keypairIdentity(signer));

  const candyMachineAddress = publicKey(process.env.CANDY_ID!);
  const candyMachine = await fetchCandyMachine(umi, candyMachineAddress);
  const candyGuard = await safeFetchCandyGuard(umi, candyMachine.mintAuthority);

  if (!candyGuard) {
    throw new Error("Candy Guard not found");
  }
  
  const res = await updateCandyGuard(umi, {
    candyGuard: candyGuard.publicKey,
    groups: [
      {
        label: "public",
        guards: {
          solPayment: some({
            lamports: sol(0.5),
            destination: umi.identity.publicKey,
          }),
          allowList: null,
        },
      },
    ],
    guards: {
      botTax: null,
    },
  }).sendAndConfirm(umi);
  console.log(`Candy Guard updated`);

  await new Promise((resolve) => setTimeout(resolve, 5000));
}

main().catch(console.error);
