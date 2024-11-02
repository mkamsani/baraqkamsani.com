export const prerender = true;
import type { APIContext, APIRoute } from 'astro'
import { readFileSync } from "fs";
import path from "path";
import sharp from 'sharp'

// @ts-ignore: Use ES2020 import() as ico-endec is CommonJS (cjs) only.
const icoEndec = (await import('ico-endec')).default;

//
// This file generates the following at build time:
// - favicon.svg
// - favicon.ico
// - icon-192.png
// - icon-512.png
// - apple-touch-icon.png
//
// Packages required: `sharp` (.svg to .png) and `ico-endec` (.png to .ico).
// You can also use `sharp-ico` for .ico, but that package depends
// on `ico-endec`, and ES2020 lets us use ico-endec directly.
//
// Why have different favicons:
// https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs
//

const faviconSrc = path.resolve('src/assets/favicon.svg')

export const GET: APIRoute = async ({ params, site }: APIContext) => {
	const favicon = params.favicon;
	const filetype = params.filetype;

	if (favicon === "favicon" && filetype === "svg") {
		// Read the svg as a string
		let contentSVG = readFileSync(faviconSrc, 'utf-8');
		return new Response(contentSVG, {
			headers: { 'Content-Type': 'image/svg+xml' }
		});
	}

	// PNG icons
	let size = 32;                                  // Default to 32px favicon.ico
	if (favicon === "icon-192") size = 192;         // Web App
	if (favicon === "icon-512") size = 512;         // Web App
	if (favicon === "apple-touch-icon") size = 180; // Shortcut to home screen on iPhone/iPad

	const bufferPNG = await sharp(faviconSrc)
		.resize(size)
		.toFormat('png')
		.toBuffer();

	if (filetype === "png") {
		return new Response(bufferPNG, {
			headers: { 'Content-Type': 'image/png' }
		});
	}

	if (filetype === "ico") {
		const bufferICO = icoEndec.encode([bufferPNG]);
		return new Response(bufferICO, {
			headers: { 'Content-Type': 'image/x-icon' }
		});
	}

	if (favicon === "manifest" && filetype === "webmanifest") {
		const domainName = site?.toString().replace(/https:|\//g, "");
		const manifest = {
			name: domainName, // example.com
			short_name: domainName?.replace(/\..*/, ""), // example
			start_url: "/",
			display: "standalone",
			background_color: "#ffffff",
			theme_color: "#000000",
			icons: [
				{
					src: "/icon-192.png",
					sizes: "192x192",
					type: "image/png"
				},
				{
					src: "/icon-512.png",
					sizes: "512x512",
					type: "image/png"
				}
			]
		};

		return new Response(JSON.stringify(manifest), {
			headers: { 'Content-Type': 'application/manifest+json' }
		});
	}

	return new Response('Not Found', { status: 404 });
}

export function getStaticPaths() {
	return [
		{ params: { favicon: "favicon", filetype: "svg"} },
		{ params: { favicon: "favicon", filetype: "ico"} },
		{ params: { favicon: "icon-192", filetype: "png"} },
		{ params: { favicon: "icon-512", filetype: "png"} },
		{ params: { favicon: "apple-touch-icon", filetype: "png"} },
		{ params: { favicon: "manifest", filetype: "webmanifest"} },
	];
}
