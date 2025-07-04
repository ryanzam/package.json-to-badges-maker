import { useState, type FC } from "react";
import type { BadgeData } from "../types";
import { Check, Copy, ExternalLink } from "lucide-react";

interface BadgeCardProps {
    badge: BadgeData;
    onCopy: (text: string) => void;
}

const BadgeCard: FC<BadgeCardProps> = ({ badge, onCopy }: BadgeCardProps) => {

    const [copied, setCopied] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
        setImageError(false);
    };

    const handleImageError = () => {
        setImageLoaded(false);
        setImageError(true);
    };

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            onCopy(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };


    return (
        <div className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-200 hover:border-indigo-300">
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-medium text-gray-900">{badge.package.name}</h3>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                            {badge.package.version && (
                                <span className="bg-gray-100 px-2 py-1 rounded">v{badge.package.version}</span>
                            )}
                            <span className="capitalize">{badge.package.source}</span>
                        </div>
                    </div>
                    {badge.iconUrl && (
                        <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                            <img
                                src={badge.iconUrl}
                                alt={`${badge.package.name} icon`}
                                className="w-6 h-6"
                                onError={() => { }}
                            />
                        </div>
                    )}
                </div>

                {/* Badge Preview */}
                <div className="relative">
                    {!imageLoaded && !imageError && (
                        <div className="w-full h-8 bg-gray-200 animate-pulse rounded"></div>
                    )}

                    <img
                        src={badge.badgeUrl}
                        alt={`${badge.package.name} badge`}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        className={`transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0 absolute top-0'
                            }`}
                    />

                    {imageError && (
                        <div className="w-full h-8 bg-gray-100 border border-gray-300 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-500">Badge unavailable</span>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                        onClick={() => handleCopy(badge.badgeUrl)}
                        className="flex items-center space-x-1 px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition-colors"
                    >
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copied ? 'Copied!' : 'Copy URL'}</span>
                    </button>

                    <button
                        onClick={() => handleCopy(`![${badge.package.name}](${badge.badgeUrl})`)}
                        className="flex items-center space-x-1 px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                    >
                        <Copy className="w-3 h-3" />
                        <span>Markdown</span>
                    </button>

                    <a
                        href={badge.badgeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                    >
                        <ExternalLink className="w-3 h-3" />
                        <span>Open</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default BadgeCard