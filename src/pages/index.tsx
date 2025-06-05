import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [maxReadyTime, setMaxReadyTime] = useState('');
  const [errors, setErrors] = useState<{
    query?: string;
    maxReadyTime?: string;
  }>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { query?: string; maxReadyTime?: string } = {};
    if (!query && !cuisine && !maxReadyTime) {
      newErrors.query = 'Please enter a search term or select a cuisine.';
    }
    if (
      maxReadyTime &&
      (isNaN(Number(maxReadyTime)) || Number(maxReadyTime) <= 0)
    ) {
      newErrors.maxReadyTime =
        'Please enter a valid number of minutes (e.g., 30).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const params: { [key: string]: string } = {};
    if (query) params.query = query;
    if (cuisine) params.cuisine = cuisine;
    if (maxReadyTime) params.maxReadyTime = maxReadyTime;
    router.push({ pathname: '/recipes', query: params });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Recipe Finder
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="query"
              className="block text-sm font-medium text-gray-700"
            >
              Search for Recipes
            </label>
            <input
              type="text"
              id="query"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g., pasta"
              aria-describedby={errors.query ? 'query-error' : undefined}
            />
            {errors.query && (
              <p id="query-error" className="mt-2 text-sm text-red-600">
                {errors.query}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="cuisine"
              className="block text-sm font-medium text-gray-700"
            >
              Cuisine
            </label>
            <select
              id="cuisine"
              value={cuisine}
              onChange={e => setCuisine(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select cuisine</option>
              <option value="Italian">Italian</option>
              <option value="Mexican">Mexican</option>
              <option value="Chinese">Chinese</option>
              <option value="Indian">Indian</option>
              <option value="American">American</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="maxReadyTime"
              className="block text-sm font-medium text-gray-700"
            >
              Max Preparation Time (minutes)
            </label>
            <input
              type="number"
              id="maxReadyTime"
              value={maxReadyTime}
              onChange={e => setMaxReadyTime(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g., 30"
              aria-describedby={
                errors.maxReadyTime ? 'maxReadyTime-error' : undefined
              }
            />
            {errors.maxReadyTime && (
              <p id="maxReadyTime-error" className="mt-2 text-sm text-red-600">
                {errors.maxReadyTime}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Find Recipes
          </button>
        </form>
      </div>
    </div>
  );
}
