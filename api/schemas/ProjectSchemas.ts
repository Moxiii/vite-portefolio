import { z } from 'zod'

export const presentationBlockSchema = z.discriminatedUnion('type', [
  z.object({
    id: z.string(),
    type: z.literal('title'),
    content: z.string(),
  }),

  z.object({
    id: z.string(),
    type: z.literal('paragraph'),
    content: z.string(),
  }),

  z.object({
    id: z.string(),
    type: z.literal('list'),
    content: z.array(z.string()),
  }),
])

export const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),

  presentation: z.array(presentationBlockSchema).default([]),

  technologies: z
    .array(
      z.object({
        name: z.string().min(1),
        icon: z.string().min(1),
      })
    )
    .default([]),

  links: z
    .array(
      z.object({
        name: z.string().min(1),
        url: z.url(),
      })
    )
    .default([]),

  images: z
    .array(
      z.object({
        isMock: z.boolean(),
        src: z.string().min(1),
        title: z.string().optional(),
      })
    )
    .default([]),

  category: z.array(z.string()).default([]),

  visible: z.boolean().default(true),
})
export const updateProjectSchema = projectSchema.partial()
