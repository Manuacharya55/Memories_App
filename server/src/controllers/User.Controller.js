import { ApiSuccess } from "../utils/ApiSuccess.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/User.Model.js";
import { registerSchema, loginSchema } from "../Schema/User.Schema.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { comparePassword, generateToken, hashPassword } from "../utils/Auth.js";
import { validation } from "../utils/validation.js";
import { ValidationError } from "../errors/ValidationError.js";



export const registerUser = asyncHandler(
    async (req, res) => {
        const { fullname, email, password,image } = req.body;
        const result = validation(registerSchema, { fullname, email, password });

        if (!result.success) {
            throw new ValidationError("Validation failed", result);
        }

        const existUser = await User.findOne({ email });
        if (existUser) {
            throw new ApiError(400, "User already exists");
        }

        const hashedPassword = await hashPassword(password);
        const user = await User.create({ fullname, email, password: hashedPassword,image });

        const token = await generateToken(user);

        return res.status(201).json(new ApiSuccess(201, token, "User registered successfully"));
    }
)

export const loginUser = asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;

        const result = validation(loginSchema, { email, password });
        if (!result.success) {
            throw new ValidationError("Validation failed", result);
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError(400, "User not found");
        }
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            throw new ApiError(400, "Invalid credentials");
        }
        const token = await generateToken(user);
        return res.status(200).json(new ApiSuccess(200, token , "User logged in successfully"));
    }
)