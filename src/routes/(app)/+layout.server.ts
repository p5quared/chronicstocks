import {redirect} from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load =( ({ cookies }) => {
    const visited = cookies.get('visited')
    if(!visited){
        throw redirect(302, '/hero')
    }

    return { visited }
}) satisfies LayoutServerLoad;
