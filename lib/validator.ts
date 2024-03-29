import * as z from "zod"

export const eventFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(3, {
    message: "Description must be at least 3 characters.",
  }).max(400, {
    message: "Description must be at less than 400 characters.",
  }),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters.",
  }).max(400, {
    message: "Location must be at less than 400 characters.",
  }),
  imageUrl: z.string().min(3, {
    message: "You must add an image",
  }),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string().min(1, {
    message: "You must select Category."
  }),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
})
