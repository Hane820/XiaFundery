import type { ResearchEntry } from './content';

const MONTHS = [
  'jan', 'feb', 'mar', 'apr', 'may', 'jun',
  'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
];

function clean(value: string | undefined): string {
  if (!value) return '';
  return value.replaceAll('&', '\\&').replaceAll('%', '\\%').replaceAll('#', '\\#');
}

export interface CitationAuthor {
  name: string;
}

export function toBibtex(
  entry: ResearchEntry,
  authors: CitationAuthor[],
): string {
  const d = entry.data;
  const year = d.year ?? d.date?.getFullYear() ?? new Date().getFullYear();
  const key = `${d.slug.replaceAll('-', '')}${year}`;
  const authorLine = authors.length
    ? authors.map((a) => clean(a.name)).join(' and ')
    : 'Anonymous';

  const fields: string[] = [`author = {${authorLine}}`, `title = {${clean(d.title)}}`, `year = {${year}}`];

  if (d.date?.getMonth() != null) {
    fields.push(`month = ${MONTHS[d.date.getMonth()]}`);
  }
  if (d.venue) fields.push(`journal = {${clean(d.venue)}}`);
  if (d.doi) fields.push(`doi = {${clean(d.doi)}}`);
  if (d.links.doi || d.links.pdf || d.links.code || d.links.site) {
    const url = d.links.doi || d.links.site || d.links.pdf || d.links.code;
    if (url) fields.push(`url = {${url}}`);
  }
  if (d.status !== 'published') {
    fields.push(`note = {${d.status.replaceAll('-', ' ')}}`);
  }

  return [
    `@${d.bibtexType}{${key},`,
    ...fields.map((f, idx) => (idx === fields.length - 1 ? `  ${f}` : `  ${f},`)),
    `}`,
  ].join('\n');
}
