import React from 'react';
import { Suspense, lazy } from 'react';
import { GetServerSidePropsContext } from 'next';

// Lazy-load the RecipeDetailsContent component
const RecipeDetailsContent = lazy(() => import('../../components/RecipeDetailsContent'));

interface RecipeDetails {
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  extendedIngredients: { id: number; original: string }[];
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.params as { id: string };
  const apiKey = process.env.API_KEY;
  const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch recipe');
    }
    const data = await res.json();
    return { props: { recipe: data } };
  } catch (error) {
    return { props: { error: (error as Error).message } };
  }
}

export default function RecipeDetails({ recipe, error }: { recipe?: RecipeDetails; error?: string }) {
  if (error) {
    return <div className="container mx-auto p-4">Error: {error}</div>;
  }

  return (
      <Suspense fallback={<div className="container mx-auto p-4">Loading recipe details...</div>}>
        <RecipeDetailsContent recipe={recipe!} />
      </Suspense>
  );
}