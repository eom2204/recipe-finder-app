import React from 'react';
import Link from 'next/link';

interface RecipeCardProps {
  recipe: { id: number; title: string; image: string };
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-105 hover:shadow-lg">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <Link
          href={`/recipes/${recipe.id}`}
          className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200"
        >
          {recipe.title}
        </Link>
      </div>
    </div>
  );
}
