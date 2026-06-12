const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const manifest = JSON.parse(
  fs.readFileSync(path.join(root, "manifest.json"), "utf8")
);
const version = manifest.version;
const outDir = path.join(root, "dist");
const zipPath = path.join(outDir, `markdown-kit-${version}.zip`);
const stagingDir = path.join(outDir, "staging");

const include = [
  "manifest.json",
  "background.js",
  "content.js",
  "theme.js",
  "viewer.html",
  "viewer.js",
  "icons",
  "lib",
  "styles",
];

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
    return;
  }
  fs.copyFileSync(src, dest);
}

if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}

fs.mkdirSync(stagingDir, { recursive: true });

for (const item of include) {
  copyRecursive(path.join(root, item), path.join(stagingDir, item));
}

if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

if (process.platform === "win32") {
  const psZip = zipPath.replace(/'/g, "''");
  const psStaging = stagingDir.replace(/'/g, "''");
  execSync(
    `powershell -NoProfile -Command "Compress-Archive -Path '${psStaging}\\*' -DestinationPath '${psZip}' -Force"`,
    { stdio: "inherit" }
  );
} else {
  execSync(`zip -r "${zipPath}" .`, { cwd: stagingDir, stdio: "inherit" });
}

fs.rmSync(stagingDir, { recursive: true, force: true });
console.log(`Created ${zipPath}`);
