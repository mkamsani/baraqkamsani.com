import { getEntry } from 'astro:content';

export const { data: { profiles, email } } = await getEntry('resume', 'personal');
export const linkedin = profiles[0].url;
export const github = profiles[1].url;
export const rss = '/rss.xml';

export default {
	email,
	linkedin,
	github,
	rss
}
