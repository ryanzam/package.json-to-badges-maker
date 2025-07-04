import type { PackageInfo, ParsedPackages } from "../types";

export const parsePackagesFromJSON = (jsonData: any): ParsedPackages => {
    const result: ParsedPackages = {
        dependencies: [],
        devDependencies: [],
        peerDependencies: [],
        optionalDependencies: []
    };

    const extractPackages = (deps: Record<string, string> | undefined, source: keyof ParsedPackages): PackageInfo[] => {
        if (!deps || typeof deps !== 'object') return [];

        return Object.entries(deps).map(([name, version]) => ({
            name: name.replace(/^@/, ''),
            version,
            source
        }));
    };

    if (jsonData.dependencies) {
        result.dependencies = extractPackages(jsonData.dependencies, 'dependencies');
    }

    if (jsonData.devDependencies) {
        result.devDependencies = extractPackages(jsonData.devDependencies, 'devDependencies');
    }

    if (jsonData.peerDependencies) {
        result.peerDependencies = extractPackages(jsonData.peerDependencies, 'peerDependencies');
    }

    if (jsonData.optionalDependencies) {
        result.optionalDependencies = extractPackages(jsonData.optionalDependencies, 'optionalDependencies');
    }

    return result;
};

export const getAllPackages = (parsedPackages: ParsedPackages): PackageInfo[] => {
    return [
        ...parsedPackages.dependencies,
        ...parsedPackages.devDependencies,
        ...parsedPackages.peerDependencies,
        ...parsedPackages.optionalDependencies
    ];
};

export const validateJSON = (jsonString: string): { valid: boolean; error?: string; data?: any } => {
    try {
        const data = JSON.parse(jsonString);
        return { valid: true, data };
    } catch (error) {
        return {
            valid: false,
            error: error instanceof Error ? error.message : 'Invalid JSON format'
        };
    }
};