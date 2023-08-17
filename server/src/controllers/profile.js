import { UserModel } from "../models/Users.js";
import { RecipeModel } from "../models/Recipes.js";

// Get UserID
export const getUserID = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID, {
      _id: false,
      password: false,
      __v: false,
    });
    const recipes = await RecipeModel.find({ userOwner: req.params.userID });
    res.send({ user, recipes });
  } catch (e) {
    console.log(e);
  }
};

//Delete  Created Recipe
export const deleteRecipe = async (req, res) => {
  try {
    const recipeID = req.params.recipeID;
    await RecipeModel.findByIdAndDelete({ _id: recipeID });
    res.send({ status: true });
  } catch (e) {
    console.log(e);
  }
};
