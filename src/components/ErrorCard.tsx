import { AlertCircle } from 'lucide-react'

interface ErrorProps {
    error?: string
}

const ErrorCard = ({ error }: ErrorProps) => {
    return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                    <h3 className="font-medium text-red-900">Error</h3>
                    <p className="text-red-700 mt-1">{error}</p>
                </div>
            </div>
        </div>
    )
}

export default ErrorCard