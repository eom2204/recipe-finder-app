import React from 'react';
import Link from 'next/link';

interface RecipeCardProps {
    recipe: { id: number; title: string; image: string };
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    return (
        <div className="border p-4 rounded">
            <Link href={`/recipes/${recipe.id}`} className="text-blue-500 hover:underline">
                {recipe.title}
            </Link>
            <img src={recipe.image} alt={recipe.title} className="mt-2 w-full h-48 object-cover" />
        </div>
    );
}