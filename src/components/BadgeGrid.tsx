import React, { useMemo, useState } from 'react'
import type { BadgeData } from '../types'
import { BadgeX, Check, Copy, Download, Search } from 'lucide-react'
import Loading from './Loading'

interface BadgeGridProps {
    loading: boolean
    badges: BadgeData[]
}

const BadgeGrid: React.FC<BadgeGridProps> = ({ loading, badges }: BadgeGridProps) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSource, setSelectedSource] = useState<string>('all');
    const [showExportMenu, setShowExportMenu] = useState(false);
    const [copiedAll, setCopiedAll] = useState(false);

    if (loading) {
        return (
            <Loading />
        )
    }

    if (badges.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center gap-3 bg-white my-5 py-10 rounded-2xl'>
                <div className='bg-gray-100 h-16 w-16 rounded-full flex items-center justify-center'>
                    <BadgeX size={40} className='text-gray-400' />
                </div>
                <h3 className='font-bold text-xl'>No Badges</h3>
                <p className='text-gray-400'>Upload or paste your repo's package.json to generate badges</p>
            </div>
        )
    }

    const filteredBadges = useMemo(() => {
        return badges.filter(badge => {
            const matchesSearch = badge.package.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSource = selectedSource === 'all' || badge.package.source === selectedSource;
            return matchesSearch && matchesSource;
        });
    }, [badges, searchTerm, selectedSource]);

    const sources = useMemo(() => {
        const uniqueSources = [...new Set(badges.map(badge => badge.package.source))];
        return uniqueSources.filter(Boolean);
    }, [badges]);

    const successCount = filteredBadges.filter(badge => badge.status === 'success').length;
    const errorCount = filteredBadges.filter(badge => badge.status === 'error').length;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Generated Badges</h2>
                    <p className="text-sm text-gray-500">
                        {successCount} successful • {errorCount} errors • {filteredBadges.length} total
                    </p>
                </div>

                <div className="flex items-center space-x-3">
                    <button
                        //onClick={handleCopyAll}
                        disabled={successCount === 0}
                        className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {copiedAll ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedAll ? 'Copied!' : 'Copy All'}</span>
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setShowExportMenu(!showExportMenu)}
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            <span>Export</span>
                        </button>

                        {showExportMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                <button
                                    //onClick={() => handleExport('markdown')}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                                >
                                    Export as Markdown
                                </button>
                                <button
                                    //onClick={() => handleExport('html')}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                                >
                                    Export as HTML
                                </button>
                                <button
                                    //onClick={() => handleExport('json')}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                                >
                                    Export as JSON
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search packages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <select
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                    <option value="all">All Sources</option>
                    {sources.map(source => (
                        <option key={source} value={source}>
                            {source?.replace(/([A-Z])/g, ' $1').toLowerCase().replace(/^./, str => str.toUpperCase())}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBadges.map((badge, index) => (
                   /*  <BadgeCard
                        key={`${badge.package.name}-${index}`}
                        badge={badge}
                        onCopy={() => { }}
                    /> */ <></>
                ))}
            </div>

            {filteredBadges.length === 0 && (searchTerm || selectedSource !== 'all') && (
                <div className="text-center py-8">
                    <p className="text-gray-500">No badges match your current filters</p>
                </div>
            )}
        </div>
    )
}

export default BadgeGrid