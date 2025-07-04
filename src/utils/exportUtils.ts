import type { BadgeData, ExportOptions } from "../types";

export const exportBadges = (badges: BadgeData[], options: ExportOptions): string => {
  const successBadges = badges.filter(badge => badge.status === 'success');
  
  switch (options.format) {
    case 'markdown':
      return generateMarkdown(successBadges, options);
    case 'html':
      return generateHTML(successBadges, options);
    case 'json':
      return generateJSON(successBadges, options);
    default:
      return '';
  }
};

const generateMarkdown = (badges: BadgeData[], options: ExportOptions): string => {
  return badges
    .map(badge => {
      const { name, version } = badge.package;
      const alt = `${name}${options.includeVersions && version ? ` ${version}` : ''}`;
      return `![${alt}](${badge.badgeUrl})`;
    })
    .join('\n');
};

const generateHTML = (badges: BadgeData[], options: ExportOptions): string => {
  const badgeElements = badges
    .map(badge => {
      const { name, version } = badge.package;
      const alt = `${name}${options.includeVersions && version ? ` ${version}` : ''}`;
      return `  <img src="${badge.badgeUrl}" alt="${alt}" />`;
    })
    .join('\n');
  
  return `<div class="badges">\n${badgeElements}\n</div>`;
};

const generateJSON = (badges: BadgeData[], options: ExportOptions): string => {
  const data = badges.map(badge => ({
    name: badge.package.name,
    ...(options.includeVersions && badge.package.version && { version: badge.package.version }),
    badgeUrl: badge.badgeUrl,
    ...(options.includeIcons && badge.iconUrl && { iconUrl: badge.iconUrl }),
    source: badge.package.source
  }));
  
  return JSON.stringify(data, null, 2);
};

export const downloadFile = (content: string, filename: string, mimeType: string = 'text/plain') => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};