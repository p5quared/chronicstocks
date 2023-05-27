/**
 * Data Loader Module
 * @returns loadedData = {{NAME: [[date, open, high, low, close, volume]]}}
 */
const dataLoader = () => {
	let loadedData = {}
	const loadCSV = (filename) =>{
		if(loadedData[filename]){
		} else {
			fetch("/" + filename + ".csv")
				.then(response => response.text())
				.then(data => {
					console.log(data)
					loadedData[filename] = data
						.split("\n")
						.slice(1)
						.map(row => row.split(','))
				})
				.catch(err => console.log('Error loading CSV:',err))
		}
	}

	const data = (name = null) => name ? loadedData[name] : loadedData

	return {
		loadCSV,
		data
	}
}

export default dataLoader