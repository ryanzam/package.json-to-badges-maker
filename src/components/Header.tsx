import { BadgeInfo } from 'lucide-react'

const Header = () => {
    return (
        <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
            <div className="container">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <BadgeInfo className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Badge Generator</h1>
                            <p className="text-sm text-gray-500">Generate badges for your repository from package.json</p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header