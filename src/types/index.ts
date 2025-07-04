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
