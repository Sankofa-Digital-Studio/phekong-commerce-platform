import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicImagesRoot = resolve(repoRoot, "public", "images");
const manifestPath = resolve(repoRoot, "src", "lib", "images", "approved-assets.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const nextConfig = (await import(pathToFileURL(resolve(repoRoot, "next.config.mjs")).href)).default;
const errors = [];
const ids = new Set();
const sources = new Set();
let sourceByteTotal = 0;

for (const asset of manifest.assets) {
  const absolutePath = resolve(repoRoot, asset.file);
  const relativeToImages = relative(publicImagesRoot, absolutePath);

  if (relativeToImages.startsWith(`..${sep}`) || relativeToImages === "..") {
    errors.push(`${asset.id}: file must remain inside public/images`);
    continue;
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*\.(?:avif|jpe?g|png|webp)$/.test(relativeToImages.replaceAll("\\", "/"))) {
    errors.push(`${asset.id}: filename must be lowercase kebab-case and use an approved format`);
  }

  if (ids.has(asset.id)) {
    errors.push(`${asset.id}: duplicate id`);
  }
  ids.add(asset.id);

  if (sources.has(asset.src)) {
    errors.push(`${asset.id}: duplicate public src ${asset.src}`);
  }
  sources.add(asset.src);

  if (asset.src !== `/${relative(repoRoot, absolutePath).replaceAll("\\", "/").replace(/^public\//, "")}`) {
    errors.push(`${asset.id}: src does not match file`);
  }

  try {
    const [buffer, fileStat, metadata] = await Promise.all([
      readFile(absolutePath),
      stat(absolutePath),
      sharp(absolutePath).metadata(),
    ]);
    const digest = createHash("sha256").update(buffer).digest("hex");

    sourceByteTotal += fileStat.size;
    if (metadata.width !== asset.width || metadata.height !== asset.height) {
      errors.push(
        `${asset.id}: manifest dimensions ${asset.width}x${asset.height} do not match ${metadata.width}x${metadata.height}`,
      );
    }
    if (metadata.format !== asset.format) {
      errors.push(`${asset.id}: manifest format ${asset.format} does not match ${metadata.format}`);
    }
    if (fileStat.size !== asset.bytes) {
      errors.push(`${asset.id}: manifest bytes ${asset.bytes} do not match ${fileStat.size}`);
    }
    if (digest !== asset.sha256) {
      errors.push(`${asset.id}: SHA-256 does not match the approved inventory`);
    }
  } catch (error) {
    errors.push(`${asset.id}: cannot inspect file (${error instanceof Error ? error.message : String(error)})`);
  }

  if (asset.sourceOwner !== "Not recorded in the repository") {
    errors.push(`${asset.id}: source ownership must not be asserted without a repository rights record`);
  }
  if (asset.rightsStatus !== "retain-existing-only") {
    errors.push(`${asset.id}: unapproved rights status ${asset.rightsStatus}`);
  }
}

if (sourceByteTotal !== manifest.sourceByteTotal) {
  errors.push(`sourceByteTotal ${manifest.sourceByteTotal} does not match ${sourceByteTotal}`);
}

const formats = nextConfig.images?.formats ?? [];
for (const requiredFormat of ["image/avif", "image/webp"]) {
  if (!formats.includes(requiredFormat)) {
    errors.push(`next.config.mjs must enable ${requiredFormat}`);
  }
}

if (errors.length > 0) {
  console.error("Image pipeline validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `Validated ${manifest.assets.length} approved assets (${sourceByteTotal} source bytes); AVIF and WebP delivery are enabled.`,
);
