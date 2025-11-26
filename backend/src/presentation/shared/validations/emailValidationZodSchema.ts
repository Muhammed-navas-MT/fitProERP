import {z} from "zod";

export const emailVerificationShema = z.object({
    email:z.email({error:"Invalid Email"})
})