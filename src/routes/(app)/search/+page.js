import {searchSettings} from 'lib/stores.js';
import { get } from 'svelte/store';

export async function load({fetch}) {
	const stock = get(searchSettings).searchFrom
	const searchData = await fetch(`/data/${stock}.csv`).then(r => r.text())
		.then(data => {
			data = data.split("\n")
				.slice(1)
				.map(row => {
					const [date, open, high, low, close, volume] = row.split(',')
					return {date, close}
				})
			return data
		})

	return {searchData}
}