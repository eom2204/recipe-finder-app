import { Suspense, lazy } from 'react';

// Lazy-load the RecipeDetailsContent component
const RecipeDetailsContent = lazy(() => import('../../components/RecipeDetailsContent'));

export async function getServerSideProps(context: any) {
    const { id } = context.params;
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

export default function RecipeDetails({ recipe, error }: { recipe?: any; error?: string }) {
    if (error) {
        return <div className="container mx-auto p-4">Error: {error}</div>;
    }

    return (
        <Suspense fallback={<div className="container mx-auto p-4">Loading recipe details...</div>}>
            <RecipeDetailsContent recipe={recipe} />
        </Suspense>
    );
}