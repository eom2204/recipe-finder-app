import React from 'react';
import { Suspense, lazy } from 'react';
import { GetServerSidePropsContext } from 'next';
import ErrorMessage from '../../components/ErrorMessage';

// Lazy-load the RecipeDetailsContent component
const RecipeDetailsContent = lazy(
  () => import('../../components/RecipeDetailsContent')
);

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
      throw new Error(
        'Failed to fetch recipe details. Please try again later.'
      );
    }
    const data = await res.json();
    return { props: { recipe: data } };
  } catch (error) {
    return { props: { error: (error as Error).message } };
  }
}

export default function RecipeDetails({
  recipe,
  error,
}: {
  recipe?: RecipeDetails;
  error?: string;
}) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {error && (
        <div className="max-w-3xl mx-auto">
          <ErrorMessage message={error} />
        </div>
      )}
      {!error && (
        <Suspense
          fallback={
            <div className="max-w-3xl mx-auto text-center text-gray-600">
              <p className="text-lg">Loading recipe details...</p>
            </div>
          }
        >
          <RecipeDetailsContent recipe={recipe!} />
        </Suspense>
      )}
    </div>
  );
}
