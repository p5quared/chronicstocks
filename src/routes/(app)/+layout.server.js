import {redirect} from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export function load({ cookies }) {
    const visited = cookies.get('visited')
    if(!visited){
        throw redirect(302, '/hero')
    }

    return { visited }
}