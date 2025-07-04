import { colorData } from "../data";
import type { BadgeData, PackageInfo } from "../types";

const SIMPLE_ICONS_API = 'https://cdn.jsdelivr.net/npm/simple-icons@v15.4.0/icons';
const SHIELDS_IO_BASE = 'https://img.shields.io/badge';

export const generateBadgeUrl = (packageInfo: PackageInfo, color: string = '4F46E5'): string => {
    const { name, version } = packageInfo;
    const packageName = encodeURIComponent(name);
    const versionText = version ? encodeURIComponent(version) : 'latest';

    return `${SHIELDS_IO_BASE}/${packageName}-${versionText}-${color}?style=flat-square&logo=${packageName}`;
}

export const getSimpleIconUrl = (packageName: string): string => {
    const iconSlug = packageName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .replace(/^@/, '');

    return `${SIMPLE_ICONS_API}/${iconSlug}.svg`;
};

export const checkIconExists = async (iconUrl: string): Promise<boolean> => {
    try {
        const response = await fetch(iconUrl, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
};

export const getBadgeColor = (title: string, idx: any) => {

    const badgeColor = colorData.filter((val) => val.title.toLowerCase() === title)

    if (badgeColor.length === 0) {
        const colors = ['4F46E5', '10B981', 'F59E0B', 'EF4444', '8B5CF6', 'F97316'];

        return colors[idx % colors.length]
    }

    return badgeColor[0].hex
}

export const generateBadgeData = async (packages: PackageInfo[]): Promise<BadgeData[]> => {

    return Promise.all(
        packages.map(async (pkg, index): Promise<BadgeData> => {

            const iconUrl = getSimpleIconUrl(pkg.name);
            const badgeUrl = generateBadgeUrl(pkg, getBadgeColor(pkg.name, index));

            try {
                const iconExists = await checkIconExists(iconUrl);

                return {
                    package: pkg,
                    iconUrl: iconExists ? iconUrl : undefined,
                    badgeUrl,
                    status: 'success'
                };
            } catch (error) {
                return {
                    package: pkg,
                    badgeUrl,
                    status: 'error',
                    error: error instanceof Error ? error.message : 'Failed to generate badge'
                };
            }
        })
    );
};