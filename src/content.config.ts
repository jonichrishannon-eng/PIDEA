import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const baseSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.date(),
  important: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
});

export const collections = {
  'memories': defineCollection({ loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/memories" }), schema: baseSchema }),
  'motivation': defineCollection({ loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/motivation" }), schema: baseSchema }),
  'accomplishments': defineCollection({ loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/accomplishments" }), schema: baseSchema }),
  'awards': defineCollection({ loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/awards" }), schema: baseSchema }),
  'about': defineCollection({ loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/about" }), schema: baseSchema }),
  'innovations': defineCollection({ loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/innovations" }), schema: baseSchema }),
  'future': defineCollection({ loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/future" }), schema: baseSchema }),
};
