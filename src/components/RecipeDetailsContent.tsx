import React from 'react';

interface RecipeDetailsContentProps {
  recipe: {
    id: number;
    title: string;
    readyInMinutes: number;
    servings: number;
    extendedIngredients: { id: number; original: string }[];
  };
}

export default function RecipeDetailsContent({
  recipe,
}: RecipeDetailsContentProps) {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {recipe.title}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <p className="text-gray-600">
            <span className="font-medium">Preparation Time:</span>{' '}
            {recipe.readyInMinutes} minutes
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Servings:</span> {recipe.servings}
          </p>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Ingredients
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          {recipe.extendedIngredients.map(ingredient => (
            <li key={ingredient.id} className="text-gray-700">
              {ingredient.original}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
