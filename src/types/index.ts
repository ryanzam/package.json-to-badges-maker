export interface PackageInfo {
    name: string;
    version?: string;
    source?: 'dependencies' | 'devDependencies' | 'peerDependencies' | 'optionalDependencies';
}

export interface ParsedPackages {
    dependencies: PackageInfo[];
    devDependencies: PackageInfo[];
    peerDependencies: PackageInfo[];
    optionalDependencies: PackageInfo[];
}

export interface BadgeData {
    package: PackageInfo;
    iconUrl?: string;
    badgeUrl: string;
    status: 'loading' | 'success' | 'error';
    error?: string;
}

export interface ExportOptions {
    format: 'markdown' | 'html' | 'json';
    includeVersions: boolean;
    includeIcons: boolean;
}