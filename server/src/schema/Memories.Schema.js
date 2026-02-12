import { z } from "zod";

const memoriesSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    image: z.string().url("Invalid image URL"),
    date: z.string().min(3, "Date must be at least 3 characters long"),
    tag: z.string().min(3, "Tag must be at least 3 characters long"),
});

export default memoriesSchema;