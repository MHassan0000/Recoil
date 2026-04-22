const { createClient } = require("@sanity/client");
const fs = require("node:fs");
const path = require("node:path");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const match =
      trimmed.match(/^export\s+([A-Za-z_][A-Za-z0-9_]*)=(.*)$/) ||
      trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);

    if (!match) continue;

    const key = match[1];
    let value = match[2] ?? "";

    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

const cwd = process.cwd();
loadEnvFile(path.join(cwd, ".env.local"));
loadEnvFile(path.join(cwd, ".env"));

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing required Sanity env values. Ensure NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_WRITE_TOKEN exist."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-10-11",
  token,
  useCdn: false,
});

async function resetDataset() {
  const references = await client.fetch(
    '*[_type in ["author","startup"]]{_id, _type}'
  );

  if (!Array.isArray(references) || references.length === 0) {
    console.log("No author/startup docs found. Dataset already clean.");
    return;
  }

  const startupIds = references.filter((doc) => doc._type === "startup").map((doc) => doc._id);
  const authorIds = references.filter((doc) => doc._type === "author").map((doc) => doc._id);

  for (const id of authorIds) {
    await client.patch(id).unset(["bookmarks"]).commit();
  }

  for (const id of startupIds) {
    await client.delete(id);
  }

  for (const id of authorIds) {
    await client.delete(id);
  }

  console.log(`Deleted ${startupIds.length + authorIds.length} documents from ${dataset}.`);
}

resetDataset().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
