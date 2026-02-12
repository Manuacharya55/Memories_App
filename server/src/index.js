import express from "express"
import { connectDB } from "./db/index.js";
import dotenv from "dotenv";
import cors from "cors"
import userRouter from "./routes/User.Router.js";
import memoriesRouter from "./routes/Memories.Router.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();
const PORT = process.env.PORT || 4000;
dotenv.config();

connectDB()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/memories", memoriesRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});