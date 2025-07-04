import { Blocks, FileDown, Package } from 'lucide-react'

const Features = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Package className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Smart Package Detection</h3>
                <p className="text-gray-600 text-sm">
                    Automatically extracts packages from package.json file
                </p>
            </div>

            <div className="text-center p-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Blocks className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Badges Generation</h3>
                <p className="text-gray-600 text-sm">
                    Generates badges for documentation
                </p>
            </div>

            <div className="text-center p-6">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <FileDown className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Export Options</h3>
                <p className="text-gray-600 text-sm">
                    Export badges in multiple formats: Markdown, HTML, and JSON
                </p>
            </div>
        </div>
    )
}

export default Features