const fs = require("fs");
const path = require("path");

const META_PATH = path.join(__dirname, "meta.json");
const LANGS = ["en", "zh"];

function bumpVersion(version) {
  const parts = version.split(".");
  const minor = parseInt(parts[1] || "0", 10) + 1;
  return `${parts[0]}.${minor}`;
}

function getToday() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function extractTitle(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : path.basename(filePath, ".md");
}

function scanLangDir(langDir, lang) {
  if (!fs.existsSync(langDir)) return lang === "en" ? [] : {};

  const entries = fs.readdirSync(langDir, { withFileTypes: true });
  const dirs = entries.filter((e) => e.isDirectory());

  // If no subdirectories, treat as flat list (for en or future use)
  if (dirs.length === 0) {
    const mdFiles = entries
      .filter((e) => e.isFile() && e.name.endsWith(".md"))
      .sort((a, b) => a.name.localeCompare(b.name));
    return mdFiles.map((f) => ({
      title: extractTitle(path.join(langDir, f.name)),
      source: path.posix.join(lang, f.name),
    }));
  }

  // Has subdirectories — group by directory name
  const result = {};
  for (const dir of dirs.sort((a, b) => a.name.localeCompare(b.name))) {
    const dirPath = path.join(langDir, dir.name);
    const mdFiles = fs
      .readdirSync(dirPath)
      .filter((f) => f.endsWith(".md"))
      .sort();
    result[dir.name] = mdFiles.map((f) => ({
      title: extractTitle(path.join(dirPath, f)),
      source: path.posix.join(lang, dir.name, f),
    }));
  }
  return result;
}

function main() {
  let meta = { version: "0.9", updateTime: "", knowledge: {} };
  if (fs.existsSync(META_PATH)) {
    meta = JSON.parse(fs.readFileSync(META_PATH, "utf-8"));
  }

  meta.version = bumpVersion(meta.version);
  meta.updateTime = getToday();

  const knowledge = {};
  for (const lang of LANGS) {
    knowledge[lang] = scanLangDir(path.join(__dirname, lang), lang);
  }
  meta.knowledge = knowledge;

  fs.writeFileSync(META_PATH, JSON.stringify(meta, null, 2) + "\n");
  console.log(`meta.json updated — version: ${meta.version}, date: ${meta.updateTime}`);
}

main();
