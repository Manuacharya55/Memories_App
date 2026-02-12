import { ApiSuccess } from "../utils/ApiSuccess.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/User.Model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import Memories from "../models/Memories.Model.js";
import { validation } from "../utils/validation.js";
import memoriesSchema from "../schema/Memories.Schema.js";
import { ValidationError } from "../errors/ValidationError.js";
import { NotFoundError } from "../errors/NotFoundError.js";

export const createMemory = asyncHandler(
    async (req, res) => {
        const { title, image, date, tag } = req.body;
        const {_id} = req.user;


        const result = validation(memoriesSchema, { title, image, date, tag });

        if (!result.success) {
            throw new ValidationError("Validation failed", result);
        }

        const memory = await Memories.create({ title, image, user:_id, date, tag });

        return res.status(201).json(new ApiSuccess(201, memory, "Memory created successfully"));
    }
)

export const getAllMemories = asyncHandler(
    async (req, res) => {
        const {_id} = req.user;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 12;
        const tag = req.query.tag;
        const search = req.query.search;

        const query = {
            user: _id
        };
        
        if (tag) {
            query.tag = tag;
        }
        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        const count = await Memories.countDocuments(query);
        const memories = await Memories.find(query).skip((page - 1) * limit).limit(limit);

        const data = {
            data: memories,
            pagination: {
                totalPage: Math.ceil(count / limit),
                currentPage: page,
                hasNextPage: page < Math.ceil(count / limit),
                hasPreviousPage: page > 1
            }
        }
        return res.status(200).json(new ApiSuccess(200, data, "Memories fetched successfully"));
    }
)

export const getSingleMemory = asyncHandler(
    async (req, res) => {
        const { id } = req.params;
        const memory = await Memories.findById(id);
        if(!memory){
            throw new NotFoundError("Memory not found");
        }
        return res.status(200).json(new ApiSuccess(200, memory, "Memory fetched successfully"));
    }
)
export const updateMemory = asyncHandler(
    async (req, res) => {
        const { id } = req.params;
        const { title, image, date, tag } = req.body;
        const user = req?.user?._id ||"698c59ae3e16a9fa1b162f36";
        const result = validation(memoriesSchema, { title, image, date, tag ,user });

        if (!result.success) {
            throw new ValidationError("Validation failed", result);
        }
        const memory = await Memories.findByIdAndUpdate(id, { $set: { title, image, date, tag } }, { new: true });
        if(!memory){
            throw new NotFoundError("Memory not found");
        }

        return res.status(200).json(new ApiSuccess(200, memory, "Memory updated successfully"));
    }
)

export const deleteMemory = asyncHandler(
    async (req, res) => {
        const { id } = req.params;
        const memory = await Memories.findByIdAndDelete(id);
        if(!memory){
            return res.status(400).json(new NotFoundError("Memory not found"));
        }
        return res.status(200).json(new ApiSuccess(200, memory, "Memory deleted successfully"));
    }
)
