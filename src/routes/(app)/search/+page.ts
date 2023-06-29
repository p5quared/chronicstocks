import type { PageLoad } from './$types';
import {searchSettings} from 'lib/stores.js';
import { get } from 'svelte/store';

export const load = ( async  ({fetch}) => {
	const stock = get(searchSettings).searchFrom
	const searchData = await fetch(`/data/${stock}.csv`).then(r => r.text())
		.then(data => {
			const formatted =  data.split("\n")
				.slice(1)
				.map(row => {
					const [date, open, high, low, close, volume] = row.split(',')
					return {date, close}
				})
			return formatted
		})

	return {searchData}
}) satisfies PageLoad;
