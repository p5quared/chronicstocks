import type { PageServerLoad } from "./$types"
export const load = ( ({ cookies }) => {
    cookies.set('visited', 'true', { path: '/' })
	const visited = cookies.get('visited')

    return { visited }
}) satisfies PageServerLoad;
