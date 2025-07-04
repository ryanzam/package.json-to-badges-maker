import { AlertCircle, Check, FileText, Upload } from 'lucide-react';
import React, { useCallback, useState, type FC } from 'react'
import { validateJSON } from '../utils/jsonParser';

interface JsonInputProps {
    onJsonChange: (jsonData: any) => void;
    onError: (error: string | null) => void;
}

const JsonInput: FC<JsonInputProps> = ({ onJsonChange, onError }: JsonInputProps) => {

    const [jsonText, setJsonText] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);
    const [isValid, setIsValid] = useState<boolean | null>(null);

    const getStatusIcon = () => {
        if (isValid === null) return <FileText className="w-5 h-5 text-gray-400" />;
        if (isValid) return <Check className="w-5 h-5 text-green-500" />;
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    };

    const getStatusColor = () => {
        if (isValid === null) return 'border-gray-300';
        if (isValid) return 'border-green-500 ring-2 ring-green-200';
        return 'border-red-500 ring-2 ring-red-200';
    };

    const handleJsonValidation = useCallback((text: string) => {
        if (!text.trim()) {
            setIsValid(null);
            onError(null);
            return;
        }

        const validation = validateJSON(text);
        setIsValid(validation.valid);

        if (validation.valid && validation.data) {
            onJsonChange(validation.data);
            onError(null);
        } else {
            onError(validation.error || 'Invalid JSON');
        }
    }, [onJsonChange, onError]);

    const handleFileUpload = useCallback((file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            setJsonText(text);
            handleJsonValidation(text);
        };
        reader.readAsText(file);
    }, [handleJsonValidation]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = Array.from(e.dataTransfer.files);
        const jsonFile = files.find(file =>
            file.type === 'application/json' || file.name.endsWith('.json')
        );

        if (jsonFile) {
            handleFileUpload(jsonFile);
        } else {
            onError('Please upload a valid JSON file');
        }
    }, [handleFileUpload, onError]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setJsonText(text);
        handleJsonValidation(text);
    };

    return (
        <div className="space-y-4 bg-white p-10 rounded-2xl">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Input JSON Data</h2>
                <div className="flex items-center space-x-2">
                    {getStatusIcon()}
                    <span className="text-sm text-gray-500">
                        {isValid === null ? 'Paste or upload package.json' : isValid ? 'Valid JSON' : 'Invalid JSON'}
                    </span>
                </div>
            </div>

            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`
          relative border-2 border-dashed rounded-lg transition-all duration-200
          ${isDragOver ? 'border-indigo-400 bg-indigo-50' : 'border-gray-300'}
          ${getStatusColor()}
        `}
            >
                <div className="p-6">
                    <div className="flex flex-col items-center justify-center space-y-4 mb-4">
                        <Upload className={`w-8 h-8 ${isDragOver ? 'text-indigo-500' : 'text-gray-400'}`} />
                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-900">
                                Drop your package.json file here, or{' '}
                                <label className="text-indigo-600 hover:text-indigo-500 cursor-pointer">
                                    browse
                                    <input
                                        type="file"
                                        accept=".json,application/json"
                                        onChange={handleFileSelect}
                                        className="hidden"
                                    />
                                </label>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                Or paste JSON content directly below
                            </p>
                        </div>
                    </div>

                    <textarea
                        value={jsonText}
                        onChange={handleTextChange}
                        placeholder='Paste your JSON here (e.g., {"dependencies": {"react": "^18.0.0"}})'
                        className={`
              w-full h-40 p-4 border rounded-lg resize-none font-mono text-sm
              focus:ring-2 focus:ring-indigo-500 focus:border-transparent
              ${getStatusColor()}
            `}
                    />
                </div>
            </div>
        </div>
    )
}

export default JsonInput