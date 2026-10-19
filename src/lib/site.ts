export const SITE = {
  name: '匣方艺创',
  nameEn: 'Xia Fundery',
  tagline: '把技术变成作品，让想法拥有形状。',
  description:
    '匣方艺创（Xia Fundery）是一个独立工作室，专注于软件开发、数字创作、游戏与交互体验、AI 应用与基础技术研究。我们把技术做成作品，让想法拥有形状。',
  // Set SITE_URL at build time to publish the real domain.
  url: import.meta.env.SITE_URL || 'https://xia-fundery.example.com',
  // External links are intentionally empty placeholders until the studio
  // provides real accounts. Leave them blank to hide the corresponding link.
  email: '',
  github: '',
  bluesky: '',
  x: '',
} as const;

export const NAV_LINKS = [
  { href: '/', label: '首页', en: 'Home' },
  { href: '/projects', label: '项目', en: 'Projects' },
  { href: '/research', label: '研究', en: 'Research' },
  { href: '/team', label: '团队', en: 'Team' },
  { href: '/about', label: '关于', en: 'About' },
] as const;

export const PROJECT_TYPES = [
  { value: 'software', label: '软件开发', en: 'Software' },
  { value: 'game', label: '游戏开发', en: 'Game' },
  { value: 'ai', label: 'AI 应用', en: 'AI App' },
  { value: 'opensource', label: '开源工具', en: 'Open Source' },
  { value: 'experiment', label: '实验创作', en: 'Experiment' },
] as const;

export const PROJECT_STATUS = {
  released: { label: '已发布', en: 'Released', tone: 'ok' },
  ongoing: { label: '进行中', en: 'In progress', tone: 'accent' },
  archived: { label: '已归档', en: 'Archived', tone: 'muted' },
  planning: { label: '规划中', en: 'Planned', tone: 'muted' },
} as const;

export const RESEARCH_TYPES = {
  paper: { label: '学术论文', en: 'Paper' },
  report: { label: '技术报告', en: 'Report' },
  preprint: { label: '预印本', en: 'Preprint' },
  project: { label: '研究项目', en: 'Research project' },
  experiment: { label: '实验记录', en: 'Experiments' },
} as const;

export const RESEARCH_STATUS = {
  published: { label: '已发表', en: 'Published' },
  preprint: { label: '预印本', en: 'Preprint' },
  'in-progress': { label: '研究中', en: 'In progress' },
  internal: { label: '内部记录', en: 'Internal notes' },
  archived: { label: '已归档', en: 'Archived' },
} as const;
