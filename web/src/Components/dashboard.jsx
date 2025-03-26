import React, { useState, useEffect,useRef } from "react";
import useApi from "../hook/useApi";
import useRecipeStore from "../store/recipeStore.";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { apiCall, loading, error } = useApi();
    const [search, setSearch] = useState("");
    const [recipes, setRecipes] = useState([]);
    const { setRecipeId, recipeId } = useRecipeStore();
    const navigate = useNavigate();
    const ref = useRef(false);

    useEffect(() => {
        if(ref.current){
            fetchRecipes();
        }
    }, []);
    console.log('receiptId', recipeId)

    const fetchRecipes = async () => {
        const params = {
            query: search.trim(),
            number: 12,
        };
        const response = await apiCall("GET", "/recipe/search", {}, params);
        if (response.success && response.data) {
            setRecipes(response.data?.data?.results);
        } else {
            setRecipes([]);
        }
    };

    const handleNavigate = ((id) => {
        setRecipeId(id)
        navigate(`/recipeDetails`);
    })

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="p-4 max-w-5xl mx-auto">
                <div className="flex items-center gap-2 mb-6">
                    <input
                        type="text"
                        placeholder="Search recipes..."
                        className="border p-2 w-1/2 rounded"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        onClick={() => fetchRecipes()}
                        className="cursor-pointer bg-blue-500 px-4 py-2 text-white rounded"
                        disabled={loading}
                    >
                        Search
                    </button>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                    </div>
                ) : recipes.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer">
                            {recipes.map((recipe) => (
                                <div key={recipe?.id} className="bg-white shadow-md rounded" onClick={() => handleNavigate(recipe.id)}>
                                    <img
                                        src={recipe?.image}
                                        alt={recipe?.title}
                                        className="w-full h-40 object-cover rounded-t"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold">{recipe?.title}</h3>
                                    </div>
                                </div>
                            ))}


                        </div>
                    </>
                ) : (
                    <p className="text-center text-gray-600">No recipes found.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
