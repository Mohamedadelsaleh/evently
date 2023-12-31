import * as z from "zod"

export const eventFormSchema: any = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters.",
    }),
    description: z.string().min(3, {
        message: "Description must be at least 3 characters.",
    }).max(400, {
        message: "Description must be at less than 400 characters."
    }),
    location: z.string().min(3, {
        message: "Location must be at least 3 characters.",
    }).max(400, {
        message: "Location must be at less than 400 characters."
    }),
    imageUrl: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date().refine(() => {
            return eventFormSchema.endDateTime >= eventFormSchema.startDateTime;
        }, {
        message: "End date must be after or equal to start date",
    }),
    categoryId: z.string(),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url()
})