const Loading = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Generated Badges</h2>
                <div className="animate-pulse bg-gray-200 h-6 w-32 rounded"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-gray-100 animate-pulse rounded-lg h-32"></div>
                ))}
            </div>
        </div>
    )
}

export default Loading