/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// export default {
// 	async fetch(request, env, ctx) {
// 		return new Response('Hello World!');
// 	},
// };

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const key = url.pathname.slice(1); // "/uploadhw/sample.jpg" → "uploadhw/sample.jpg"

		const object = await env.MY_BUCKET.get(key);
		if (!object) {
			return new Response('File not found', { status: 404 });
		}

		const headers = new Headers();
		object.writeHttpMetadata(headers); // Content-Type, Cache-Control 등 복사
		headers.set('etag', object.httpEtag);

		return new Response(object.body, { headers });
	},
};
