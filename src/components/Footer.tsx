const Footer = () => {
    return (
        <footer className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center text-gray-500 text-sm">
                    <p>Built using React, TypeScript, Tailwind CSS and Vite</p>
                    <p className="mt-2">
                        Badges powered by{' '}
                        <a href="https://shields.io" className="text-indigo-600 hover:text-indigo-700">
                            Shields.io
                        </a>{' '}
                        and icons by{' '}
                        <a href="https://simpleicons.org" className="text-indigo-600 hover:text-indigo-700">
                            Simple Icons
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer