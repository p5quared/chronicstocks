import {writable} from 'svelte/store';

const loadedData = writable({})

const getCSV = (name) => {
	if(loadedData[name]){
		return loadedData[name]
	}

	return fetch("/data/" + name + ".csv")
		.then(response => response.text())
		.then(data => {
			let _data = data
				.split("\n")
				.slice(1)
				.map(row => row.split(','))

			_data.map(row => {
				row.date = new Date(row.date)
				row.close = Math.round(+row.close * 100) / 100
			})

			return _data
		})
		.catch(err => console.log('Error loading CSV:',err))
}


export default getCSV


