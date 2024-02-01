import type { Handle } from '@sveltejs/kit';
import { getBindingsProxy } from 'wrangler';

export const handle = (async ({ event, resolve }) => {
	const proxy = await getBindingsProxy({ experimentalJsonConfig: true });
	event.platform = {
		// @ts-expect-error TODO
		env: proxy.bindings
	};

	console.log({ value: await event.platform?.env.KV_TEST.get(event.platform.env.KEY_TEST) });
	console.log({ platform: event.platform });
	return resolve(event);
}) satisfies Handle;
