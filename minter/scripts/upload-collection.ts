import "dotenv/config";
import path from "path";
import { uploadFile, uploadJson } from "./utils";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const DIR = path.join(__dirname, "../output");
  const METADATA_DIR = path.join(DIR, "metadata");
  const IMAGE_DIR = path.join(DIR, "images");

  try {
    // 1. upload image
    // const imgPath = path.join(IMAGE_DIR, imageFile);
    // const imageUrl = await uploadFile(imgPath, imageFile);
    const imageUrl = "https://static.wikia.nocookie.net/allthetropes/images/a/ad/Dungeons_And_Dragons_Official_Poster.jpg/revision/latest?cb=20200625044141"

    // 2. read & patch JSON
    // const jsonPath = path.join(METADATA_DIR, jsonFile);
    // const json = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

    // 3. upload JSON
    const metadataUrl = await uploadJson({
      name: `Glimbi Tales Collection`,
      symbol: "GLIMBI",
      description:
        "In a dark and mystical world, players take on the role of powerful mages tasked with exploring and defending cursed lands filled with hidden resources, corrupted dungeons, and secrets waiting to be uncovered.",
      image: imageUrl,
      properties: {
        files: [
          {
            uri: imageUrl,
            type: "image/png",
          },
        ],
      },
    });

    console.log(`✅ [Collection] ${metadataUrl}`);
  } catch (err: any) {
    console.error(`❌ Error uploading:`, err.message || err);
  }

  console.log(`🎉 All done!`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
