import { z } from 'astro:content';

const portfolio = z.object({
	name: z.string(),
	url: z.union([
		z.string().url().nullish(),
		z.literal("")
	]),
	affiliation: z.string(),
	startDate: z.coerce.date(),
	endDate: z.union([
		z.coerce.date().nullish(),
		z.string()
	]).optional(),
	summary: z.string(),
	technologies: z.array(
		z.string()
	),
	// An array of images.
	showcase: z.array(z.object({
		src: z.string(),
		alt: z.string(),
	})).nullable(),
});

export const portfolioSchema = z.object({
	type: z.union([
		z.literal("experience"),
		z.literal("projects"),
	]),
	list: z.array(portfolio),
});
export default portfolioSchema;
export type portfolioType = z.infer<typeof portfolio>;
