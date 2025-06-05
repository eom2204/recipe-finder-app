import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
    const [query, setQuery] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [maxReadyTime, setMaxReadyTime] = useState('');
    const router = useRouter();

    const handleNext = () => {
        const params: { [key: string]: string } = {};
        if (query) params.query = query;
        if (cuisine) params.cuisine = cuisine;
        if (maxReadyTime) params.maxReadyTime = maxReadyTime;
        router.push({ pathname: '/recipes', query: params });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Recipe Finder</h1>
            <div className="mb-4">
                <label htmlFor="query" className="block text-gray-700 mb-1">
                    Search for recipes
                </label>
                <input
                    type="text"
                    id="query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                    placeholder="e.g., pasta"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="cuisine" className="block text-gray-700 mb-1">
                    Cuisine
                </label>
                <select
                    id="cuisine"
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                >
                    <option value="">Select cuisine</option>
                    <option value="Italian">Italian</option>
                    <option value="Mexican">Mexican</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Indian">Indian</option>
                    <option value="American">American</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="maxReadyTime" className="block text-gray-700 mb-1">
                    Max preparation time (minutes)
                </label>
                <input
                    type="number"
                    id="maxReadyTime"
                    value={maxReadyTime}
                    onChange={(e) => setMaxReadyTime(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                    placeholder="e.g., 30"
                />
            </div>
            <button
                type="button"
                onClick={handleNext}
                disabled={query === '' && cuisine === '' && maxReadyTime === ''}
                className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
            >
                Next
            </button>
        </div>
    );
}