import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');
const out = (rel) => join(publicDir, rel);

const C = {
  ink950: '#0c1320',
  ink900: '#17202f',
  ink700: '#374662',
  ink500: '#5d7095',
  ink300: '#a5b3cc',
  ink200: '#c9d2e3',
  paper50: '#faf7f1',
  paper100: '#f4efe6',
  accent400: '#e6ab4f',
  accent500: '#d9923a',
  accent600: '#b8782b',
};

const SANSSERIF =
  "'Space Grotesk', 'Avenir Next', 'Segoe UI', -apple-system, sans-serif";
const CJK = "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

function esc(s) {
  return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function save(rel, content) {
  const path = out(rel);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

const PROJECTS = [
  { slug: 'casket-kit', zh: '匣形', en: 'Casket Kit', type: 'SOFTWARE', variant: 0 },
  { slug: 'above-the-deep', zh: '深水之上', en: 'Above the Deep', type: 'GAME', variant: 1 },
  { slug: 'weave-note', zh: '织文', en: 'Weave', type: 'AI APP', variant: 2 },
  { slug: 'fathom-ts', zh: '类型工具库', en: 'Fathom', type: 'OPEN SOURCE', variant: 3 },
  { slug: 'standing-wave', zh: '驻波', en: 'Standing Wave', type: 'EXPERIMENT', variant: 4 },
  { slug: 'lantern-docs', zh: '灯塔', en: 'Lantern', type: 'SOFTWARE', variant: 5 },
  { slug: 'echo-scrub', zh: '辨音', en: 'Echo Scrub', type: 'AI APP', variant: 0 },
  { slug: 'zero-hour', zh: '零时', en: 'Zero Hour', type: 'GAME', variant: 1 },
  { slug: 'vilstia', zh: '樟庭徊路', en: 'Vilstia', type: 'SOFTWARE', variant: 3 },
];

const MEMBERS = [
  { slug: 'qi-an', char: '祁', latin: 'Q' },
  { slug: 'su-he', char: '苏', latin: 'S' },
  { slug: 'lu-yu', char: '陆', latin: 'L' },
  { slug: 'shen-zhuo', char: '沈', latin: 'S' },
  { slug: 'jiang-che', char: '江', latin: 'J' },
  { slug: 'tang-qi', char: '唐', latin: 'T' },
];

function coverFrame(content, { bg = C.paper50 } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="840" viewBox="0 0 1200 840">
<rect width="1200" height="840" fill="${bg}"/>
<rect x="22" y="22" width="1156" height="796" fill="none" stroke="${C.ink900}" stroke-opacity="0.9" stroke-width="2"/>
<path d="M22 22h26M22 22v26M1178 22h-26M1178 22v26M22 818v-26M22 818h26M1178 818h-26M1178 818v-26" stroke="${C.ink900}" stroke-width="2"/>
<text x="40" y="52" font-family="${SANSSERIF}" font-size="17" letter-spacing="3" fill="${C.ink700}">XIA&nbsp;FUNDERY</text>
${content}
</svg>`;
}

function coverBottom({ zh, en, type, index }) {
  return `<text x="40" y="796" font-family="${CJK}" font-size="34" fill="${C.ink900}">${esc(zh)}</text>
<text x="40" y="788" font-family="${SANSSERIF}" font-size="30" fill="${C.ink900}" opacity="0.92">${esc(en)}</text>
<text x="40" y="816" font-family="${SANSSERIF}" font-size="17" letter-spacing="3" fill="${C.ink500}">${type}</text>
<text x="1160" y="816" text-anchor="end" font-family="${SANSSERIF}" font-size="17" letter-spacing="3" fill="${C.ink700}">NO.${String(index + 1).padStart(2, '0')}</text>`;
}

function coverGeometry(variant) {
  switch (variant) {
    case 0: {
      return `<g fill="none" stroke="${C.ink900}" stroke-width="2">
<circle cx="300" cy="420" r="120"/><circle cx="300" cy="420" r="200"/><circle cx="300" cy="420" r="280"/>
<path d="M300 140v560M140 420h320" stroke-dasharray="6 10"/>
</g>
<circle cx="920" cy="330" r="46" fill="${C.accent500}"/>
<path d="M900 620h120M900 620v-52" stroke="${C.ink900}" stroke-width="2"/>`;
    }
    case 1: {
      return `<path d="M0 840 L0 0 H640 Z" fill="${C.ink900}"/>
<path d="M0 840 L0 0 H640 Z" fill="none" stroke="${C.paper50}" stroke-width="1.5" opacity="0.35"/>
<circle cx="1120" cy="200" r="150" fill="${C.accent500}"/>
<path d="M0 260c180 120 320-120 520 0 160 96 300-40 460 40" fill="none" stroke="${C.paper50}" stroke-width="7" opacity="0.7"/>
<path d="M0 320c180 120 320-120 520 0 160 96 300-40 460 40" fill="none" stroke="${C.accent400}" stroke-width="3"/>`;
    }
    case 2: {
      return `<g stroke="${C.ink900}" stroke-width="2" fill="none">
<path d="M80 560v180M80 560h180M80 560l180 180"/>
<path d="M300 340v120M300 340h120M300 340l120 120"/>
<path d="M480 700v100M480 700h100"/>
</g>
<circle cx="980" cy="250" r="70" fill="${C.paper100}" stroke="${C.ink900}" stroke-width="2"/>
<circle cx="980" cy="250" r="34" fill="${C.accent500}"/>
<path d="M720 640 960 400M960 640 720 400" stroke="${C.ink900}" stroke-width="2" opacity="0.5"/>`;
    }
    case 3: {
      return `<g transform="rotate(8 600 420)">
<rect x="330" y="220" width="360" height="360" fill="none" stroke="${C.ink900}" stroke-width="2"/>
<rect x="380" y="270" width="260" height="260" fill="none" stroke="${C.accent500}" stroke-width="6"/>
<path d="M250 560h220M250 560v-90M250 560l90-90" fill="none" stroke="${C.ink700}" stroke-width="2"/>
</g>
<circle cx="1030" cy="660" r="24" fill="${C.ink900}"/>`;
    }
    case 4: {
      const bars = [
        [500, 340], [540, 260], [580, 400], [620, 300],
        [660, 380], [700, 210], [740, 330], [780, 250],
        [820, 420], [860, 290],
      ].map(([x, h]) => `<rect x="${x}" y="${420 - h}" width="22" height="${h}" fill="${C.ink900}"/>`).join('');
      return `<path d="M0 420c200 90 340-120 560-40 160 60 260-60 420-20" fill="none" stroke="${C.ink700}" stroke-width="2"/>
<path d="M0 440c200 90 340-120 560-40 160 60 260-60 420-20" fill="none" stroke="${C.accent500}" stroke-width="3"/>
${bars}
<circle cx="118" cy="180" r="42" fill="${C.paper100}" stroke="${C.ink900}" stroke-width="2"/>`;
    }
    default: {
      return `<g stroke="${C.ink900}" stroke-width="2">
<rect x="120" y="140" width="60" height="520"/>
<rect x="210" y="180" width="60" height="480"/>
<rect x="300" y="120" width="60" height="540"/>
<rect x="390" y="260" width="60" height="400"/>
</g>
<rect x="520" y="200" width="220" height="220" fill="${C.accent500}"/>
<path d="M860 620l160-160M1020 620l-160-160" stroke="${C.ink900}" stroke-width="2"/>
<circle cx="920" cy="320" r="14" fill="${C.ink900}"/>`;
    }
  }
}

for (const [i, p] of PROJECTS.entries()) {
  const svg = coverFrame(
    `${coverGeometry(p.variant)}${coverBottom({ zh: p.zh, en: p.en, type: p.type, index: i })}`,
    { bg: p.variant === 1 ? C.paper100 : C.paper50 },
  );
  save(`img/covers/${p.slug}.svg`, svg);
}

const AVATAR_BG = [
  [C.ink900, C.accent500],
  [C.ink700, C.paper100],
  [C.accent600, C.paper50],
  [C.ink500, C.paper50],
  [C.ink900, C.paper100],
  [C.ink700, C.accent400],
];

for (const [i, m] of MEMBERS.entries()) {
  const [bg, fg] = AVATAR_BG[i % AVATAR_BG.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
<rect width="320" height="320" fill="${bg}"/>
<circle cx="160" cy="160" r="120" fill="none" stroke="${fg}" stroke-width="2"/>
<circle cx="160" cy="160" r="88" fill="none" stroke="${fg}" stroke-opacity="0.45" stroke-width="1.5"/>
<text x="160" y="192" text-anchor="middle" font-family="${CJK}" font-size="110" font-weight="700" fill="${fg}">${m.char}</text>
<rect x="70" y="238" width="180" height="2" fill="${fg}" opacity="0.6"/>
</svg>`;
  save(`img/avatars/${m.slug}.svg`, svg);
}

const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
<rect x="4" y="4" width="40" height="40" rx="10" fill="none" stroke="currentColor" stroke-width="3"/>
<rect x="13" y="13" width="22" height="22" rx="5" fill="none" stroke="currentColor" stroke-width="2" opacity="0.55"/>
<rect x="20" y="20" width="8" height="8" rx="2" fill="currentColor"/>
</svg>`;

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
<rect x="1.5" y="1.5" width="45" height="45" rx="11" fill="#17202f"/>
<rect x="6.5" y="6.5" width="35" height="35" rx="9" fill="none" stroke="#faf7f1" stroke-width="2"/>
<rect x="15" y="15" width="18" height="18" rx="4" fill="none" stroke="#d9923a" stroke-width="2"/>
<rect x="21" y="21" width="6" height="6" rx="1" fill="#d9923a"/>
</svg>`;

save('brand/logo-mark.svg', mark);
save('favicon.svg', favicon);

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#0c1320"/>
<rect x="34" y="34" width="1132" height="562" fill="none" stroke="#faf7f1" stroke-opacity="0.9" stroke-width="2"/>
<path d="M34 34h30M34 34v30M1166 34h-30M1166 34v30M34 596v-30M34 596h30M1166 596h-30M1166 596v-30" stroke="#faf7f1" stroke-width="2"/>
<rect x="34" y="34" width="1132" height="562" fill="none" stroke="#faf7f1" stroke-opacity="0.35" stroke-width="1.5"/>
<rect x="64" y="92" width="34" height="34" rx="8" fill="none" stroke="#faf7f1" stroke-width="3"/>
<rect x="76" y="104" width="22" height="22" rx="5" fill="none" stroke="#faf7f1" stroke-width="2" opacity="0.6"/>
<rect x="88" y="116" width="8" height="8" rx="2" fill="#d9923a"/>
<text x="118" y="122" font-family="'Space Grotesk','Avenir Next','Segoe UI',sans-serif" font-size="34" letter-spacing="4" fill="#faf7f1">XIA&nbsp;FUNDERY</text>
<text x="64" y="316" font-family="'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif" font-size="64" font-weight="600" fill="#faf7f1">匣方艺创</text>
<text x="66" y="376" font-family="'Space Grotesk','Avenir Next','Segoe UI',sans-serif" font-size="44" fill="#faf7f1">把技术变成作品，让想法拥有形状。</text>
<text x="64" y="452" font-family="'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif" font-size="24" fill="#a5b3cc">软件开发 · 数字创作 · 游戏与交互 · AI 应用 · 技术研究</text>
<circle cx="1100" cy="480" r="44" fill="#d9923a"/>
<circle cx="1100" cy="480" r="20" fill="#faf7f1"/>
</svg>`;
save('brand/og.svg', og);

console.log('Assets generated in', publicDir);
