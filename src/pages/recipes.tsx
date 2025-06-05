import React from 'react';
import { Suspense, lazy } from 'react';
import { GetServerSidePropsContext } from 'next';

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
      throw new Error('Failed to fetch recipes');
    }
    const data = await res.json();
    cache.set(cacheKey, { data: data.results, timestamp: now });
    return { props: { recipes: data.results || [] } };
  } catch (error) {
    return { props: { error: (error as Error).message } };
  }
}

export default function Recipes({ recipes, error }: { recipes: Recipe[]; error?: string }) {
  if (error) {
    return <div className="container mx-auto p-4">Error: {error}</div>;
  }

  if (recipes.length === 0) {
    return <div className="container mx-auto p-4">No recipes found.</div>;
  }

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Recipes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Suspense fallback={<div className="text-center">Loading recipes...</div>}>
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </Suspense>
        </div>
      </div>
  );
}