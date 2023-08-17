import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  name: { type: String, require: true },
  ingredients: [{ type: String, require: true }],
  imageUrl: { type: String, require: true },
  instructions: { type: String, require: true },
  cookingTime: { type: String, require: true },
  userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  author: { type: mongoose.Schema.Types.String, ref: "users" },
  timeStamp: { type: Date, default: Date.now },
});

export const RecipeModel = mongoose.model("recipes", RecipeSchema);
