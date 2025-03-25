import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useApi from "../hook/useApi";
import useRecipeStore from '../store/recipeStore.';

const Recipedetails = () => {
    const { recipeId } = useRecipeStore();
    const [recipeDetail, setRecipedetails] = useState(null);
    const { apiCall, loading, error } = useApi();
    const [isSaved, setIsSaved] = useState(false);
    const ref = useRef(false);

    useEffect(() => {
        if(ref.current){
            fetchRecipeDetails();
        }
    }, [recipeId]);

    const fetchRecipeDetails = async () => {
        try {
            const params = {
                id: recipeId,
            };
            const response = await apiCall("GET", `/recipe/details`, {}, params);
            if (response.success && response.data) {
                setRecipedetails(response.data?.data);
            }

        } catch (error) {
            console.error('Error fetching recipe details:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (!recipeDetail) {
        return (
            <div className="text-center mt-10">
                <h2 className="text-2xl font-bold text-red-500">Recipe not found!</h2>
                <Link to="/" className="text-blue-500 underline mt-4 block">Back to Dashboard</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <Link to="/" className="text-blue-500 underline mb-4 inline-block">← Back to Dashboard</Link>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                    src={recipeDetail.image}
                    alt={recipeDetail.title}
                    className="w-full h-64 object-cover"
                />

                <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                        <h1 className="text-4xl font-bold">{recipeDetail.title}</h1>
                        
                        {/* Save/Unsave Button */}
                        <button
                            // onClick={handleSaveToggle}
                            className={`px-4 py-2 rounded-lg text-white transition ${
                                isSaved ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                            }`}
                        >
                            {isSaved ? 'Unsave' : 'Save'}
                        </button>
                    </div>

                     {/* Summary Section */}
                     {recipeDetail?.summary && (
                        <div className="mb-6 text-gray-700" dangerouslySetInnerHTML={{ __html: recipeDetail.summary }} />
                    )}

                    <div className="flex items-center justify-between mb-6">
                        <p className="text-gray-600"><strong>Time:</strong> {recipeDetail.readyInMinutes} mins</p>
                        <p className="text-gray-600"><strong>Servings:</strong> {recipeDetail.servings}</p>
                    </div>

                    <div className="flex gap-4 mb-6">
                        <span className={`px-3 py-1 text-sm rounded-full ${recipeDetail.vegetarian ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {recipeDetail.vegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
                        </span>
                        <span className={`px-3 py-1 text-sm rounded-full ${recipeDetail.glutenFree ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {recipeDetail.glutenFree ? 'Gluten-Free' : 'Contains Gluten'}
                        </span>
                    </div>

                    {/* Ingredients Section */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">Ingredients</h2>
                        <ul className="list-disc list-inside text-gray-700">
                            {recipeDetail?.extendedIngredients?.map((ingredient) => (
                                <li key={ingredient.id}>
                                    {ingredient.original}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Instructions Section */}
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Instructions</h2>
                        <div className="text-gray-700">
                            {recipeDetail?.analyzedInstructions?.length > 0 ? (
                                <ol className="list-decimal list-inside">
                                    {recipeDetail?.analyzedInstructions[0]?.steps.map((step) => (
                                        <li key={step.number} className="mb-2">
                                            {step.step}
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                <p>No instructions available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recipedetails;
