import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(3, "password must be 3 characters long").max(10, "password not more than 10 character long"),


})

