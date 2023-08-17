import express from "express";
import cors from "cors";
import {userRouter} from "./routes/auth.js";
import {recipesRouter} from "./routes/recipes.js";
import {profileRouter} from "./routes/profile.js";
import dbConnection from "./config/db.js";

dbConnection()
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", "https://virtual-bite.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
}));

app.use("/auth", userRouter);
app.use("/profile", profileRouter);
app.use("/recipes", recipesRouter);

// const server = async () => {
//     try {
//         await dbConnection();
//         const PORT = process.env.PORT || 4000;
//         await app.listen(PORT);
//         console.log(`Server started on Port ${PORT}`);
//     } catch (e) {
//         console.log(e);
//     }
// };
// server();

app.listen(PORT, () => {
    console.log(`Server started on Port ${PORT}`);
})