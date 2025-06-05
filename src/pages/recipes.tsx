import React from 'react';
import { Suspense, lazy } from 'react';
import { GetServerSidePropsContext } from 'next';
import ErrorMessage from '../components/ErrorMessage';

// Lazy-load the RecipeCard component
const RecipeCard = lazy(() => import('../components/RecipeCard'));

interface Recipe {
  id: number;
  title: string;
  image: string;
}

// Simple in-memory cache
const cache = new Map<string, { data: Recipe[]; timestamp: number }>();

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query, cuisine, maxReadyTime } = context.query as {
    query?: string;
    cuisine?: string;
    maxReadyTime?: string;
  };
  const cacheKey = `${query || ''}-${cuisine || ''}-${maxReadyTime || ''}`;
  const now = Date.now();

  // Check cache
  if (cache.has(cacheKey) && now - cache.get(cacheKey)!.timestamp < 60000) {
    return { props: { recipes: cache.get(cacheKey)!.data } };
  }

  const apiKey = process.env.API_KEY;
  const baseUrl = 'https://api.spoonacular.com/recipes/complexSearch';
  const params = new URLSearchParams();

  if (query) params.append('query', query);
  if (cuisine) params.append('cuisine', cuisine);
  if (maxReadyTime) params.append('maxReadyTime', maxReadyTime);
  params.append('apiKey', apiKey || '');

  const url = `${baseUrl}?${params.toString()}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch recipes. Please try again later.');
    }
    const data = await res.json();
    cache.set(cacheKey, { data: data.results, timestamp: now });
    return { props: { recipes: data.results || [] } };
  } catch (error) {
    return { props: { error: (error as Error).message } };
  }
}

export default function Recipes({
  recipes,
  error,
}: {
  recipes: Recipe[];
  error?: string;
}) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Recipes
        </h1>
        {error && <ErrorMessage message={error} />}
        {!error && recipes.length === 0 && (
          <div className="text-center text-gray-600">
            <p className="text-lg">
              No recipes found. Try adjusting your search!
            </p>
          </div>
        )}
        {!error && recipes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Suspense
              fallback={
                <div className="col-span-full text-center text-gray-600">
                  <p className="text-lg">Loading recipes...</p>
                </div>
              }
            >
              {recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}
