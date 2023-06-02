import { json } from '@sveltejs/kit'

export async function GET({ params }){
	const {stock} = params
	let data = fetch(`data/{stock}.csv`)
	console.log(data)

}