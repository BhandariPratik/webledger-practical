const axios = require("axios");
require("dotenv").config();
const SavedRecipe = require("../model/recipe.model");

const getRecipeList = async (filter) => {
  try {
    const options = {
      method: "GET",
      params: {
        query: filter.query,
        offset: filter.offset || 0,
        number: filter.number || 10,
        apiKey: process.env.SPOONACULAR_APIKEY,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${process.env.SPOONACULAR_BASEURL}recipes/complexSearch`,
      options
    );

    return { res: data, message: "Sucess" };
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return { res: [], message: "Error fetching recipes", error };
  }
};

const recipeDetails = async (id) => {
  try {
    const options = {
      method: "GET",
      params: {
        apiKey: process.env.SPOONACULAR_APIKEY,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${process.env.SPOONACULAR_BASEURL}/recipes/${id}/information`,
      options
    );
    return { res: data, message: "Sucess" };
  } catch (error) {
    console.error("Error fetching recipeDetails:", error);
    return { res: [], message: "Error fetching recipeDetails", error };
  }
};

const saveRecipe = async (recipeId) => {
  try {
    // Check if recipe is already saved
    const existing = await SavedRecipe.findOne({
      where: { user_id: userId, recipe_id: recipeId },
    });

    if (existing) {
      return res.status(400).json({ message: "Recipe already saved." });
    }

    // Save recipe
    const savedRecipe = await SavedRecipe.create({
      user_id: userId,
      recipe_id: recipeId,
    });

    return savedRecipe;
  } catch (error) {
    console.error("Error Save Recipe :", error);
    return { res: [], message: "Error Save Recipe", error };
  }
};

const unsavedRecipe = async (recipeId) => {
  try {
    // Remove the recipe
    const deleted = await SavedRecipe.destroy({
      where: { user_id: userId, recipe_id: recipeId },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Recipe not found." });
    }

    return;
  } catch (error) {
    console.error("Error Save Recipe :", error);
    return { res: [], message: "Error Save Recipe", error };
  }
};

module.exports = { getRecipeList, saveRecipe, unsavedRecipe,recipeDetails };
