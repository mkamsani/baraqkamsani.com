import { z } from 'astro:content';
import { rssSchema } from '@astrojs/rss';

export const blogSchema = rssSchema.extend({
	type: z.literal('blog'),
	updatedDate: z.coerce.date().optional(),
	draft: z.boolean().default(false),
}).strict();

export default blogSchema;
export type blogType = z.infer<typeof blogSchema>
