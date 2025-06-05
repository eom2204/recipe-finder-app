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

export default function RecipeDetailsContent({ recipe }: RecipeDetailsContentProps) {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
            <p className="mb-2">Preparation time: {recipe.readyInMinutes} minutes</p>
            <p className="mb-4">Servings: {recipe.servings}</p>
            <h2 className="text-2xl mb-2">Ingredients</h2>
            <ul className="list-disc pl-5">
                {recipe.extendedIngredients.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.original}</li>
                ))}
            </ul>
        </div>
    );
}