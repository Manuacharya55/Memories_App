import { Schema, model } from "mongoose";

const memoriesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Memories = model("Memories", memoriesSchema);

export default Memories;