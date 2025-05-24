import "dotenv/config";
import fs from "fs";
import path from "path";
import pLimit from "p-limit";
import { uploadFile, uploadJson } from "./utils";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// File paths for persisting state
const UPLOADS_JSON_PATH = path.join(__dirname, "../uploads.json");
const FAILURES_JSON_PATH = path.join(__dirname, "../failures.json");

// Load existing uploads to avoid re-uploading
function loadJson<T>(filePath: string): T | null {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
}

// Persist uploads and failures
function saveState(uploads: Record<string, string>, failures: string[]) {
  try {
    fs.writeFileSync(UPLOADS_JSON_PATH, JSON.stringify(uploads, null, 2));
    fs.writeFileSync(FAILURES_JSON_PATH, JSON.stringify(failures, null, 2));
    console.log(
      `\n🔖 State saved to ${UPLOADS_JSON_PATH} & ${FAILURES_JSON_PATH}`
    );
  } catch (err) {
    console.error("Error saving state:", err);
  }
}

// Graceful shutdown handler
function setupGracefulShutdown(
  uploads: Record<string, string>,
  failures: string[]
) {
  const handler = (signal: string) => {
    console.warn(`\n⚠️ Caught ${signal}, saving state and exiting...`);
    saveState(uploads, failures);
    process.exit();
  };

  process.on("SIGINT", () => handler("SIGINT"));
  process.on("SIGTERM", () => handler("SIGTERM"));
  process.on("uncaughtException", (err) => {
    console.error("Uncaught exception:", err);
    saveState(uploads, failures);
    process.exit(1);
  });
  process.on("unhandledRejection", (reason: any) => {
    console.error("Unhandled rejection:", reason);
    saveState(uploads, failures);
    process.exit(1);
  });
}

async function main() {
  const DIR = path.join(__dirname, "../output");
  const METADATA_DIR = path.join(DIR, "metadata");
  const IMAGE_DIR = path.join(DIR, "images");

  const jsonFilesAll = fs
    .readdirSync(METADATA_DIR)
    .filter((f) => f.endsWith(".json"));
  const imageFiles = new Set(
    fs.readdirSync(IMAGE_DIR).filter((f) => f.endsWith(".png"))
  );

  // Load previous state
  const existingUploads =
    loadJson<Record<string, string>>(UPLOADS_JSON_PATH) || {};
  const uploads: Record<string, string> = { ...existingUploads };
  const failures: string[] = loadJson<string[]>(FAILURES_JSON_PATH) || [];

  // Filter out already-uploaded JSONs
  const pendingJsonFiles = jsonFilesAll
    .filter((jsonFile) => {
      const id = path.basename(jsonFile, ".json");
      return !(id in uploads);
    })
    .sort((a, b) => {
      const idA = parseInt(path.basename(a, ".json"), 10);
      const idB = parseInt(path.basename(b, ".json"), 10);
      return idA - idB; // Sort by numeric ID
    });

  console.log(
    `🔄 Found ${pendingJsonFiles.length} files to process (skipped ${
      jsonFilesAll.length - pendingJsonFiles.length
    } already uploaded).`
  );

  // limit concurrency
  const limit = pLimit(1);

  // Setup graceful shutdown
  setupGracefulShutdown(uploads, failures);

  const tasks = pendingJsonFiles.map((jsonFile) =>
    limit(async () => {
      const id = path.basename(jsonFile, ".json");
      const imageFile = `${id}.png`;

      if (!imageFiles.has(imageFile)) {
        console.warn(`⚠️ Missing image for ${jsonFile}, skipping.`);
        failures.push(jsonFile);
        return;
      }

      try {
        // 1. upload image
        const imgPath = path.join(IMAGE_DIR, imageFile);
        const imageUrl = await uploadFile(imgPath, imageFile);

        // 2. read & patch JSON
        const jsonPath = path.join(METADATA_DIR, jsonFile);
        const json = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

        // 3. upload JSON
        const metadataUrl = await uploadJson({
          name: `Glimbi Tales #${id}`,
          description:
            "In a dark and mystical world, players take on the role of powerful mages tasked with exploring and defending cursed lands filled with hidden resources, corrupted dungeons, and secrets waiting to be uncovered.",
          image: imageUrl,
          attributes: [
            ...json.traits,
            {
              trait_type: "tier",
              value: json.tier,
            },
          ],
          properties: {
            files: [
              {
                uri: imageUrl,
                type: "image/png",
              },
            ],
          },
        });

        console.log(`✅ [${id}]`);
        uploads[id] = metadataUrl;
      } catch (err: any) {
        console.error(`❌ Error uploading ${id}:`, err.message || err);
        failures.push(jsonFile);
      }
    })
  );

  // Execute all tasks with concurrency limit
  await Promise.all(tasks);

  // Final save
  saveState(uploads, failures);

  console.log(`🎉 All done!`);
  console.log(` • successes: ${Object.keys(uploads).length}`);
  console.log(` • failures:  ${failures.length}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
