export function load({ cookies }) {
    cookies.set('visited', true, { path: '/' })
    const visited = cookies.get('visited')

    return { visited }
}
