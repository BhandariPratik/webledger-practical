const express = require("express");
const router = express.Router();
const recipeRoute = require("../routes/recipe.routes");

router.use("/recipe", recipeRoute);

module.exports = router;
