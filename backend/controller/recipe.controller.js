const { getUserIdFromToken } = require("../middleware/auth0-middleware");
const recipeService = require("../services/recipe.service");

const getRecipeList = async (req, res) => {
  try {
    const filter = req?.query;
    const response = await recipeService.getRecipeList(filter);
    return res
      .status(200)
      .json({ message: "Success", data: response?.res || [] });
  } catch (error) {
    console.error("Error in getRecipeList:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const recipeDetails = async (req, res) => {
  try {
    const id = req?.query?.id;
    const response = await recipeService.recipeDetails(id);
    return res
      .status(200)
      .json({ message: "Success", data: response?.res || [] });
  } catch (error) {
    console.error("Error in recipeDetails:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const saveOrUnsaveRecipe = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { recipeId, action } = req.body;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!recipeId || !action) {
      return res.status(400).json({ message: "Missing recipeId or action" });
    }
    if (action === "save") {
      // Save Recipe
      const saveRecipe = await recipeService.saveRecipe(recipeId, userId);
      return res
        .status(200)
        .json({ message: "Recipe saved successfully", saveRecipe });
    } else if (action === "unsave") {
      // Unsave Recipe
      await recipeService.unsaveRecipe(recipeId, userId);
      return res.status(200).json({ message: "Recipe unsaved successfully" });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid action. Use 'save' or 'unsave'." });
    }
  } catch (error) {
    console.error("Error in saveOrUnsaveRecipe:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { getRecipeList, saveOrUnsaveRecipe ,recipeDetails };
