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

// export default {
// 	async fetch(request, env) {
// 		const url = new URL(request.url);
// 		const key = url.pathname.slice(1); // "/uploadhw/sample.jpg" → "uploadhw/sample.jpg"

// 		const object = await env.MY_BUCKET.get(key);
// 		if (!object) {
// 			return new Response('File not found', { status: 404 });
// 		}

// 		const headers = new Headers();
// 		object.writeHttpMetadata(headers); // Content-Type, Cache-Control 등 복사
// 		headers.set('etag', object.httpEtag);

// 		return new Response(object.body, { headers });
// 	},
// };
export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		// 1. GET: R2에서 파일 읽기
		if (request.method === 'GET') {
			const key = url.pathname.slice(1); // "/uploadhw/sample.mp3" → "uploadhw/sample.mp3"
			const object = await env.MY_BUCKET.get(key);
			if (!object) {
				return new Response('File not found', { status: 404 });
			}

			const headers = new Headers();
			object.writeHttpMetadata(headers);
			headers.set('etag', object.httpEtag);

			return new Response(object.body, { headers });
		}

		// 2. POST: presigned URL 생성 요청 처리
		if (request.method === 'POST' && url.pathname === '/sign-url') {
			const body = await request.json();
			const fileName = body.fileName || 'sample.mp3';
			const contentType = body.fileType || 'audio/mp3';

			const objectKey = `uploadrecording/${fileName}`;

			const signedUrl = new URL(request.url);
			signedUrl.pathname = `/${objectKey}`;

			return new Response(
				JSON.stringify({
					uploadURL: signedUrl.href,
					objectKey,
					message: 'presigned URL generated',
				}),
				{
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
					},
				}
			);
		}

		return new Response('Not found', { status: 404 });
	},
};
