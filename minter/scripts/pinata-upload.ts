import "dotenv/config";
import { PinataSDK } from "pinata-web3";
import fs from "fs";
import { Blob } from "buffer";
import * as path from "path";

async function main() {
  const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT!,
    pinataGateway: process.env.PINATA_CLOUD!,
  });

  const filePath = path.resolve(path.dirname('.'), "./output/nft_ad6aebe2bde94225b2ec71c1d0efdc0b.png");
  const blob = new Blob([
    fs.readFileSync(filePath),
  ]);
  const file = new File([blob], "nft_ad6aebe2bde94225b2ec71c1d0efdc0b.png", {
    type: "image/png",
  });
  const upload = await pinata.upload.file(file);
  console.log(upload);
  const fileUrl = `https://${process.env.PINATA_CLOUD!}/ipfs/${upload.IpfsHash}`;
  console.log(`📡 Uploaded file to IPFS! URL: ${fileUrl}`);
}

main().catch(console.error);
