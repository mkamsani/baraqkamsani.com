import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import blogSchema from "~/schema/blog";
import portfolioSchema from "~/schema/portfolio";
// @ts-ignore
import resumeSchema from "~/schema/resume";

const blog = defineCollection({
	loader: glob({ pattern: "**\/*.mdx", base: "./src/data/blog" }),
	schema: blogSchema,
});

const resume = defineCollection({
	loader: file("./src/data/resume/resume.yaml"),
	// schema: resumeSchema,
});

const portfolio = defineCollection({
	loader: glob({ pattern: "**\/*.yaml", base: "./src/data/portfolio" }),
	schema: portfolioSchema,
});

export const collections = { blog, resume, portfolio };
