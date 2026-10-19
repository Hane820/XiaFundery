import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, posix, resolve } from 'node:path';

const dist = resolve('dist');
const files = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else files.push(p);
  }
};
walk(dist);

const htmlFiles = files.filter((f) => f.endsWith('.html'));
const checked = new Set();
const problems = [];
let internalLinks = 0;

const assetExists = (url) => {
  const clean = url.split('#')[0].split('?')[0];
  if (!clean || clean === '/') return true;
  const rel = clean.replace(/^\//, '');
  const p = resolve(dist, rel);
  if (existsSync(p) && statSync(p).isFile()) return true;
  const index = resolve(dist, rel, 'index.html');
  return existsSync(index) && statSync(index).isFile();
};

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const srcRoot = file.replace(/\\/g, '/');
  const dirPart = srcRoot.slice(0, srcRoot.lastIndexOf('/'));

  const refs = [
    ...html.matchAll(/(?:href|src)="([^"]+)"/g),
  ].map((m) => m[1]).filter((u) => u.startsWith('/'));

  for (const url of refs) {
    internalLinks += 1;
    if (checked.has(url)) continue;
    checked.add(url);
    if (!assetExists(url)) {
      problems.push({ file: srcRoot, url });
    }
  }
}

console.log(`Scanned ${htmlFiles.length} HTML files, ${internalLinks} internal refs (${checked.size} unique).`);
if (problems.length === 0) {
  console.log('OK: no missing local assets or internal links.');
} else {
  console.log('MISSING:');
  for (const p of problems) console.log(`  ${p.file} -> ${p.url}`);
}
