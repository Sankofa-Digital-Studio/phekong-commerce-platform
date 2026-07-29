import { createHash } from "node:crypto";
import { mkdir, readFile, stat } from "node:fs/promises";
import { basename, dirname, extname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicImagesRoot = resolve(repoRoot, "public", "images");
const options = new Map();

for (const argument of process.argv.slice(2)) {
  if (!argument.startsWith("--")) {
    throw new Error(`Unexpected argument: ${argument}`);
  }

  const [key, ...valueParts] = argument.slice(2).split("=");
  options.set(key, valueParts.length > 0 ? valueParts.join("=") : true);
}

const inputOption = options.get("input");
const outputOption = options.get("output");

if (typeof inputOption !== "string" || typeof outputOption !== "string") {
  throw new Error(
    "Usage: npm run images:prepare -- --input=<source> --output=public/images/<kebab-name>.<webp|avif|jpg|png> [--width=1600] [--height=1200] [--quality=78] [--force]",
  );
}

const inputPath = resolve(repoRoot, inputOption);
const outputPath = resolve(repoRoot, outputOption);
const relativeOutput = relative(publicImagesRoot, outputPath);

if (relativeOutput.startsWith(`..${sep}`) || relativeOutput === "..") {
  throw new Error("Prepared output must remain inside public/images.");
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*\.(?:avif|jpe?g|png|webp)$/.test(basename(outputPath))) {
  throw new Error("Output filename must be lowercase kebab-case and use AVIF, WebP, JPEG, or PNG.");
}

if (!options.has("force")) {
  try {
    await stat(outputPath);
    throw new Error("Output exists. Review it first, then rerun with --force to replace that exact file.");
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      // Expected for a new output.
    } else {
      throw error;
    }
  }
}

const width = Number(options.get("width") || 1600);
const height = Number(options.get("height") || 1600);
const extension = extname(outputPath).slice(1).toLowerCase().replace("jpg", "jpeg");
const defaultQuality = extension === "avif" ? 55 : extension === "webp" ? 78 : extension === "jpeg" ? 82 : 90;
const quality = Number(options.get("quality") || defaultQuality);

if (![width, height, quality].every(Number.isFinite) || width <= 0 || height <= 0 || quality < 1 || quality > 100) {
  throw new Error("Width, height, and quality must be valid positive numbers; quality must be between 1 and 100.");
}

await mkdir(dirname(outputPath), { recursive: true });

let pipeline = sharp(inputPath)
  .rotate()
  .resize({
    width,
    height,
    fit: "inside",
    withoutEnlargement: true,
  });

if (extension === "avif") {
  pipeline = pipeline.avif({ quality, effort: 6 });
} else if (extension === "webp") {
  pipeline = pipeline.webp({ quality, effort: 5 });
} else if (extension === "jpeg") {
  pipeline = pipeline.jpeg({ quality, mozjpeg: true });
} else if (extension === "png") {
  pipeline = pipeline.png({ compressionLevel: 9, quality });
}

await pipeline.toFile(outputPath);

const [metadata, buffer, fileStat] = await Promise.all([
  sharp(outputPath).metadata(),
  readFile(outputPath),
  stat(outputPath),
]);

console.log(
  JSON.stringify(
    {
      file: relative(repoRoot, outputPath).replaceAll("\\", "/"),
      src: `/${relative(publicImagesRoot, outputPath).replaceAll("\\", "/")}`,
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      bytes: fileStat.size,
      sha256: createHash("sha256").update(buffer).digest("hex"),
    },
    null,
    2,
  ),
);
