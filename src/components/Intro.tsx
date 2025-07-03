import React from 'react'

const Intro = () => {
    return (
        <div className='flex flex-col items-center space-y-7'>
            <h1 className='text-3xl font-bold text-center'>Generate badges for your repository from your package.json</h1>
            <p className='text-lg text-gray-900 text-center'>Upload your package.json file or paste package.JSON data to automatically generate professional badges for all your dependencies. Perfect for documentation, README files, and project showcases.</p>
        </div>
    )
}

export default Intro