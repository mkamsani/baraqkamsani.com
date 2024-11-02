import { z } from 'astro:content';

const locationSchema = z.object({
	city: z.string().default(""),
	region: z.string().default(""),
	country: z.string().default(""),
	postalCode: z.number().default(0),
});

const profileSchema = z.object({
	network: z.string(),
	username: z.string(),
	url: z.string().url(),
});

const personalSchema = z.object({
	name: z.string().default(""),
	email: z.string().email().nullable().default(""),
	phone: z.string().nullable().default(""),
	url: z.string().url().nullable().default(""),
	titles: z.array(z.string()).default([]),
	location: locationSchema.nullable().default({}),
	profiles: z.array(profileSchema).default([]),
});

const positionSchema = z.object({
	position: z.string(),
	startDate: z.string().nullable().optional(),
	endDate: z.string().nullable().optional(),
	highlights: z.array(z.string()).nullable().optional(),
});

const workSchema = z.object({
	organization: z.string(),
	location: z.string(),
	url: z.string().url().nullable().optional(),
	positions: z.array(positionSchema),
});

const educationSchema = z.object({
	institution: z.string(),
	location: z.string(),
	url: z.string().url().nullable().optional(),
	area: z.string(),
	studyType: z.string(),
	honors: z.array(z.string()).nullable().optional(),
	courses: z.array(z.string()).nullable().optional(),
	startDate: z.string().nullable().optional(),
	endDate: z.string().nullable().optional(),
	highlights: z.array(z.string()).nullable().optional(),
});

const affiliationSchema = z.object({
	organization: z.string(),
	location: z.string(),
	url: z.string().url().nullable().optional(),
	position: z.string(),
	startDate: z.string().nullable().optional(),
	endDate: z.string().nullable().optional(),
	highlights: z.array(z.string()).nullable().optional(),
});

const awardSchema = z.object({
	title: z.string(),
	location: z.string().optional(),
	date: z.string(),
	issuer: z.string(),
	url: z.string().url().nullable().optional(),
	highlights: z.array(z.string()).nullable().optional(),
});

const certificateSchema = z.object({
	name: z.string().default(""),
	date: z.string().default(""),
	issuer: z.string().default(""),
	url: z.string().url().default(""),
	id: z.string().default(""),
});

const publicationSchema = z.object({
	name: z.string().default(""),
	publisher: z.string().default(""),
	releaseDate: z.string().default(""),
	url: z.string().url().default(""),
});

const projectSchema = z.object({
	name: z.string().default(""),
	url: z.string().url().nullable().default(""),
	affiliation: z.string().default(""),
	startDate: z.string().nullable().default(""),
	endDate: z.string().nullable().default(""),
	highlights: z.array(z.string()).default([]),
});

const skillCategorySchema = z.object({
	category: z.string(),
	skills: z.array(z.string()),
});

const languageSchema = z.object({
	language: z.string(),
	fluency: z.string(),
});

const referenceSchema = z.object({
	name: z.string().default(""),
	url: z.string().url().default(""),
	reference: z.string().default(""),
});

export const resumeSchema = z.object({
	personal: personalSchema,
	work: z.array(workSchema).default([]),
	education: z.array(educationSchema).default([]),
	affiliations: z.array(affiliationSchema).nullable().default([]),
	awards: z.array(awardSchema).nullable().default([]),
	certificates: z.array(certificateSchema).nullable().default([]),
	publications: z.array(publicationSchema).nullable().default([]),
	projects: z.array(projectSchema).nullable().default([]),
	skills: z.array(skillCategorySchema).default([]),
	languages: z.array(languageSchema).default([]),
	interests: z.array(z.string()).default([]),
	references: z.array(referenceSchema).nullable().default([]),
});

export default resumeSchema;
export type resumeType = z.infer<typeof resumeSchema>
