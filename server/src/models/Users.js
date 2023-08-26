import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    savedRecipes: [{type: mongoose.Schema.Types.ObjectId, ref: "recipes"}],
    timeStamp: {type: Date, default: Date.now},
});

export const UserModel = mongoose.model("users", UserSchema);
