import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";

// Get All Recipes
export const getRecipes = async (req, res) => {
  try {
    const response = await RecipeModel.find({}).sort({ timeStamp: -1 });
    res.json(response);
  } catch (err) {
    res.json(err);
  }
};

// Create a new Recipe
export const createRecipe = async (req, res) => {
  try {
    const recipe = new RecipeModel(req.body);
    await recipe.save();
    res.send({ status: true });
  } catch (err) {
    res.json(err);
  }
};

//Save Recipe
export const saveRecipe = async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (e) {
    res.json(e);
  }
};

// Remove Saved Recipe
export const removeSavedRecipe = async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    user.savedRecipes.pull(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (e) {
    res.json(e);
  }
};

// Get Saved Recipes
export const getSavedRecipe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });
    const savedRecipesID = user?.savedRecipes;
    res.json({ savedRecipes, savedRecipesID });
  } catch (e) {
    res.json(e);
  }
};
