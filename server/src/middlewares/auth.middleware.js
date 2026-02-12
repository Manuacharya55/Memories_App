import { NotAuthenticatedError } from "../errors/NotAuthenticatedError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import User from "../models/User.Model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { verifyToken } from "../utils/Auth.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {
        const token = req.header("auth-token")
        if(!token){
            throw new NotAuthenticatedError("Unauthorized")
        }
        const decodedToken = await verifyToken(token)
        const existingUser = await User.findById(decodedToken.id)
        if(!existingUser){
            throw new NotFoundError("User not found")
        }

        req.user = existingUser
        next()
})