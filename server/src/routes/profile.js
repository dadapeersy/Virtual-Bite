import express from "express";
import { deleteRecipe, getUserID } from "../controllers/profile.js";

const router = express.Router();

router.get("/:userID", getUserID);

router.delete("/:recipeID", deleteRecipe);

export { router as profileRouter };
