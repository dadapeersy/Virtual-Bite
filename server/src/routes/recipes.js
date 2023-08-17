import express from "express";
import { verifyToken } from "../middlewares/jwtVerify.js";
import {
  createRecipe,
  getRecipes,
  getSavedRecipe,
  removeSavedRecipe,
  saveRecipe,
} from "../controllers/recipes.js";

const router = express.Router();

router.get("/", getRecipes);

router.post("/", verifyToken, createRecipe);

router.put("/", verifyToken, saveRecipe);

router.put("/removeSavedRecipe", removeSavedRecipe);

router.get("/savedRecipes/:userID", getSavedRecipe);

export { router as recipesRouter };
