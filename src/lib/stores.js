import {writable} from 'svelte/store';

// TODO: Use localStorageStore from @skeleton
export let searchSettings = writable({
			searchFrom: "SPY",
			start: Math.floor(Math.random() * 3000),
			startDate: null,
			duration: Math.floor(Math.random() * 100) + 10,
			searchIn: ["SPY"]
})