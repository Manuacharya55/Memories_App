import { z } from "zod";

export const MemorySchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long").max(100, "Title must be at most 100 characters long"),
    image: z.string().url("Invalid image URL").max(1000, "Image URL must be at most 1000 characters long"),
    date: z.coerce.date("Invalid date"),
    tag: z.string().min(3, "Invalid tag").max(100, "Invalid tag"),
})
