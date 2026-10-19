import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const projectsDir = join(root, 'src/content/projects');
const membersFile = join(root, 'src/config/members.ts');
const outFile = join(root, 'src/content/contributions/contributions.json');

const token = process.env.GITHUB_TOKEN;
const MAX_COMMITS = 1000;
const PER_PAGE = 100;
const MAX_PAGES = 10;

function githubUsername(url) {
  try {
    const u = new URL(url);
    if (u.hostname.replace(/^www\./, '').toLowerCase() !== 'github.com') return null;
    return u.pathname.split('/').filter(Boolean)[0] || null;
  } catch {
    return null;
  }
}

function parseRepo(url) {
  try {
    const u = new URL(url);
    if (u.hostname.replace(/^www\./, '').toLowerCase() !== 'github.com') return null;
    const seg = u.pathname.split('/').filter(Boolean);
    if (seg.length < 2) return null;
    return { owner: seg[0], repo: seg[1].replace(/\.git$/, '') };
  } catch {
    return null;
  }
}

function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  try {
    return parse(match[1]);
  } catch {
    return null;
  }
}

async function fetchCommits(owner, repo) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'xia-fundery-site',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const commits = [];
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const url = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=${PER_PAGE}&page=${page}`;
    const res = await fetch(url, { headers });
    if (res.status === 404) throw new Error(`仓库不存在或不可访问（${owner}/${repo}）`);
    if (res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0') {
      throw new Error('GitHub 接口限流：请设置 GITHUB_TOKEN 或稍后再试');
    }
    if (!res.ok) throw new Error(`GitHub API 返回 ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;
    commits.push(...data);
    if (commits.length >= MAX_COMMITS) {
      commits.length = MAX_COMMITS;
      break;
    }
  }
  return commits;
}

function aggregate(commits, memberByUsername) {
  const matched = new Map();
  let others = 0;
  for (const c of commits) {
    const login = c.author?.login;
    if (!login) {
      others += 1;
      continue;
    }
    const slug = memberByUsername.get(login.toLowerCase());
    if (!slug) {
      others += 1;
      continue;
    }
    const entry = matched.get(slug) ?? { username: login, commits: 0 };
    entry.commits += 1;
    matched.set(slug, entry);
  }
  const members = [...matched.entries()]
    .map(([slug, value]) => ({ slug, username: value.username, commits: value.commits }))
    .sort((a, b) => b.commits - a.commits);
  return { members, others: { commits: others } };
}

async function main() {
  const projects = [];
  for (const file of readdirSync(projectsDir)) {
    if (!file.endsWith('.md')) continue;
    const fm = parseFrontmatter(readFileSync(join(projectsDir, file), 'utf8'));
    if (!fm || !fm.slug || !fm.links?.github) continue;
    projects.push({ slug: fm.slug, github: fm.links.github });
  }

  const { MEMBERS } = await import(`file://${membersFile.replaceAll('\\', '/')}`);
  const memberByUsername = new Map();
  for (const m of MEMBERS) {
    const username = githubUsername(m.links?.github);
    if (username) memberByUsername.set(username.toLowerCase(), m.slug);
  }

  let cache = [];
  if (existsSync(outFile)) {
    try {
      cache = JSON.parse(readFileSync(outFile, 'utf8'));
    } catch {
      cache = [];
    }
  }
  const byId = new Map(cache.map((e) => [e.id, e]));

  for (const project of projects) {
    const repo = parseRepo(project.github);
    if (!repo) {
      byId.delete(project.slug);
      continue;
    }
    try {
      const commits = await fetchCommits(repo.owner, repo.repo);
      const { members, others } = aggregate(commits, memberByUsername);
      byId.set(project.slug, {
        id: project.slug,
        source: project.github,
        fetchedAt: new Date().toISOString(),
        totalCommits: commits.length,
        members,
        others,
      });
      console.log(`✓ ${project.slug}: ${commits.length} commits, ${members.length} members`);
    } catch (err) {
      const prev = byId.get(project.slug);
      if (prev) {
        prev.error = `更新失败：${err.message}（保留上次数据）`;
        console.log(`⚠ ${project.slug}: ${err.message}（保留上次缓存）`);
      } else {
        byId.set(project.slug, {
          id: project.slug,
          source: project.github,
          fetchedAt: new Date().toISOString(),
          totalCommits: 0,
          members: [],
          others: { commits: 0 },
          error: String(err.message),
        });
        console.log(`⚠ ${project.slug}: ${err.message}`);
      }
    }
  }

  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, `${JSON.stringify([...byId.values()], null, 2)}\n`);
  console.log(`\n写入 ${outFile}（${byId.size} 条记录）`);
}

main().catch((err) => {
  console.error('脚本异常：', err.message);
  process.exit(1);
});
