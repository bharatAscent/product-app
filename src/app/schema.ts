import z from "zod"

// ** Login schema
export const loginSchema = z.object({
    username: z.string({
        required_error: "Username is required",
    }),
    password: z.string({
        required_error: "Password is required",
    }),
})

// ** Login type
export type LoginType = z.infer<typeof loginSchema>

// ** Product Type
export interface Product {
    id: number
    title: string
    description: string
    category: string
    price: number
    discountPercentage?: string
    rating: number
    stock: number
    tags: string[]
    brand: string
}
