import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

export const PROJECT_TYPES = [
  'software',
  'game',
  'ai',
  'opensource',
  'experiment',
] as const;

export const PROJECT_STATUSES = [
  'released',
  'ongoing',
  'archived',
  'planning',
] as const;

export const RESEARCH_TYPES = [
  'paper',
  'report',
  'preprint',
  'project',
  'experiment',
] as const;

export const RESEARCH_STATUSES = [
  'published',
  'preprint',
  'in-progress',
  'internal',
  'archived',
] as const;

const linkFields = () =>
  z
    .object({
      website: z.url().optional(),
      github: z.url().optional(),
      demo: z.url().optional(),
      download: z.url().optional(),
      release: z.url().optional(),
      site: z.url().optional(),
      pdf: z.url().optional(),
      doi: z.url().optional(),
      code: z.url().optional(),
      blog: z.url().optional(),
    })
    .default({});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    type: z.enum(PROJECT_TYPES),
    status: z.enum(PROJECT_STATUSES),
    featured: z.boolean().default(false),
    demo: z.boolean().default(false),
    summary: z.string(),
    intro: z.string().optional(),
    image: z.string(),
    tech: z.array(z.string()).default([]),
    startDate: z.coerce.date().optional(),
    publishDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    // 成员通过 src/config/members.ts 中的 slug 引用
    members: z.array(z.string()).default([]),
    links: linkFields(),
    relatedProjects: z.array(reference('projects')).default([]),
    relatedResearch: z.array(reference('research')).default([]),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    type: z.enum(RESEARCH_TYPES),
    status: z.enum(RESEARCH_STATUSES),
    featured: z.boolean().default(false),
    demo: z.boolean().default(false),
    year: z.number().optional(),
    date: z.coerce.date().optional(),
    venue: z.string().optional(),
    // 作者通过 src/config/members.ts 中的 slug 引用
    authors: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]),
    summary: z.string(),
    doi: z.string().optional(),
    citation: z.string().optional(),
    bibtexType: z
      .enum(['article', 'techreport', 'misc', 'inproceedings', 'phdthesis'])
      .default('misc'),
    links: linkFields(),
    relatedProjects: z.array(reference('projects')).default([]),
    relatedResearch: z.array(reference('research')).default([]),
  }),
});

const contributions = defineCollection({
  loader: file('src/content/contributions/contributions.json'),
  schema: z.object({
    id: z.string(),
    source: z.string().optional(),
    fetchedAt: z.string().optional(),
    totalCommits: z.number().int().default(0),
    members: z
      .array(
        z.object({
          slug: z.string(),
          username: z.string(),
          commits: z.number().int(),
        }),
      )
      .default([]),
    others: z.object({ commits: z.number().int().default(0) }).default({ commits: 0 }),
    error: z.string().optional(),
  }),
});

export const collections = { projects, research, contributions };
