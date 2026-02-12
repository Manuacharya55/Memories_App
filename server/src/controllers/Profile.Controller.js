import { ApiSuccess } from "../utils/ApiSuccess.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/User.Model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { validation } from "../utils/validation.js";
import memoriesSchema from "../schema/Memories.Schema.js";
import { ValidationError } from "../errors/ValidationError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { comparePassword, hashPassword } from "../utils/Auth.js";

export const UpdatePassword = asyncHandler(
    async (req, res) => {
        const { currentpassword, newpassword, confirmpassword } = req.body;
        const id = req?.user?._id;

        const existingUser = await User.findById(id);
        if (!existingUser) {
            throw new NotFoundError("User not found");
        }

        const isPasswordValid = await comparePassword(currentpassword, existingUser.password);
        if (!isPasswordValid) {
            throw new ApiError(400, "Invalid password");
        }

        if (newpassword !== confirmpassword) {
            throw new ApiError(400, "Passwords do not match");
        }

        if (newpassword === currentpassword) {
            throw new ApiError(400, "New password cannot be same as current password");
        }

        const newPassword = await hashPassword(newpassword);

        const user = await User.findByIdAndUpdate(id, { $set: { password: newPassword } }, { new: true });

        if (!user) {
            return res.status(400).json(new NotFoundError("User not found"));
        }

        return res.status(200).json(new ApiSuccess(200, user, "Password updated successfully"));
    }
)

export const UpdateProfile = asyncHandler(
    async (req, res) => {
        const { fullname, email, image } = req.body;
        const id = req?.user?._id

        const user = await User.findByIdAndUpdate(id, { $set: { fullname, email, image } }, { new: true });

        if (!user) {
            return res.status(400).json(new NotFoundError("User not found"));
        }
        return res.status(200).json(new ApiSuccess(200, user, "Profile updated successfully"));
    }
)

export const getProfile = asyncHandler(
    async (req, res) => {
        const id = req?.user?._id

        const user = await User.findById(id).select("-password -__v");

        if (!user) {
            throw new NotFoundError("User not found");
        }

        return res.status(200).json(new ApiSuccess(200, user, "Profile fetched successfully"));
    }
)