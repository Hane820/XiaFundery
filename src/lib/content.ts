import {
  getCollection,
  getEntry,
  getEntries,
  type CollectionEntry,
  type ReferenceDataEntry,
} from 'astro:content';
import { SORTED_MEMBERS, type Member } from '../config/members';

export type ProjectEntry = CollectionEntry<'projects'>;
export type ResearchEntry = CollectionEntry<'research'>;

export type ProjectRef = ReferenceDataEntry<'projects'>;
export type ResearchRef = ReferenceDataEntry<'research'>;

export type { Member };

const epoch = new Date(0).valueOf();

export function projectSortDate(entry: ProjectEntry): number {
  return (
    entry.data.publishDate?.valueOf() ??
    entry.data.updatedDate?.valueOf() ??
    entry.data.startDate?.valueOf() ??
    epoch
  );
}

export function researchSortDate(entry: ResearchEntry): number {
  const date = entry.data.date?.valueOf();
  if (date) return date;
  const year = entry.data.year;
  return year ? new Date(`${year}-01-01`).valueOf() : epoch;
}

export async function getAllProjects(): Promise<ProjectEntry[]> {
  return (await getCollection('projects')).sort(
    (a, b) => projectSortDate(b) - projectSortDate(a),
  );
}

export async function getFeaturedProjects(): Promise<ProjectEntry[]> {
  return (await getAllProjects()).filter((p) => p.data.featured);
}

export async function getProjectBySlug(slug: string): Promise<ProjectEntry | undefined> {
  const projects = await getAllProjects();
  return projects.find((p) => p.data.slug === slug);
}

export function getAllMembers(): Member[] {
  return SORTED_MEMBERS;
}

export function getMemberBySlug(slug: string): Member | undefined {
  return SORTED_MEMBERS.find((m) => m.slug === slug);
}

export function getMembersBySlugs(slugs: string[]): Member[] {
  return slugs
    .map((slug) => getMemberBySlug(slug))
    .filter((m): m is Member => Boolean(m));
}

export async function getAllResearch(): Promise<ResearchEntry[]> {
  return (await getCollection('research')).sort(
    (a, b) => researchSortDate(b) - researchSortDate(a),
  );
}

export async function getFeaturedResearch(): Promise<ResearchEntry[]> {
  return (await getAllResearch()).filter((r) => r.data.featured);
}

export async function getResearchBySlug(
  slug: string,
): Promise<ResearchEntry | undefined> {
  const items = await getAllResearch();
  return items.find((r) => r.data.slug === slug);
}

export function getProjectMembers(slugs: string[]): Member[] {
  return getMembersBySlugs(slugs);
}

export function getResearchAuthors(slugs: string[]): Member[] {
  return getMembersBySlugs(slugs);
}

export async function getRelatedProjects(refs: ProjectRef[]): Promise<ProjectEntry[]> {
  return getEntries(refs);
}

export async function getRelatedResearch(refs: ResearchRef[]): Promise<ResearchEntry[]> {
  return getEntries(refs);
}

export async function getMemberProjects(memberId: string): Promise<ProjectEntry[]> {
  const projects = await getAllProjects();
  return projects.filter((p) => p.data.members.includes(memberId));
}

export async function getMemberResearch(memberId: string): Promise<ResearchEntry[]> {
  const research = await getAllResearch();
  return research.filter((r) => r.data.authors.includes(memberId));
}

export async function getProjectResearch(slug: string): Promise<ResearchEntry[]> {
  const research = await getAllResearch();
  return research.filter((r) =>
    r.data.relatedProjects.some((p) => p.id === slug),
  );
}

export function formatDate(date: Date | undefined, withDay = false): string {
  if (!date || Number.isNaN(date.valueOf())) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  if (!withDay) return `${y}.${m}`;
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

export type ContributionStats = {
  source?: string;
  fetchedAt?: string;
  totalCommits: number;
  members: { slug: string; username: string; commits: number }[];
  others: { commits: number };
  error?: string;
};

export async function getContributions(
  projectSlug: string,
): Promise<ContributionStats | undefined> {
  const entry = await getEntry('contributions', projectSlug);
  return entry?.data as ContributionStats | undefined;
}

export function isGithubUrl(url: string | undefined): boolean {
  if (!url) return false;
  try {
    return new URL(url).hostname.replace(/^www\./, '').toLowerCase() === 'github.com';
  } catch {
    return false;
  }
}

export function slugToLabel(slug: string): string {
  return slug.replaceAll('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
