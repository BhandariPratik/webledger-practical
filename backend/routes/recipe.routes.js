const express = require("express");
const router = express.Router();

// middleware
const { checkJwt } = require("../middleware/auth0-middleware");

//recipe Controller
const {
  getRecipeList,
  saveOrUnsaveRecipe,
  recipeDetails,
} = require("../controller/recipe.controller");

//recipe Routes
router.get("/search", checkJwt, getRecipeList);
router.get("/details", checkJwt, recipeDetails);

router.post("/saveOrUnsaveRecipe", checkJwt, saveOrUnsaveRecipe);

module.exports = router;
