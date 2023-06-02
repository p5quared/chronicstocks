<script>
	// TODO: Since the state is now in the store, we should be able to refactor out the settings from the chart
	import { searchSettings } from 'lib/stores.js';
	export let data
	let {visited, searchData} = data
	import { Autocomplete, InputChip, RangeSlider, popup } from '@skeletonlabs/skeleton';

	import { Line } from "svelte-chartjs";

	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		Filler,
		LinearScale,
		PointElement,
		CategoryScale,
	} from 'chart.js';
	import { get } from 'svelte/store';

	ChartJS.register(
		Title,
		Tooltip,
		Legend,
		LineElement,
		Filler,
		LinearScale,
		PointElement,
		CategoryScale
	);

	let slice_start = $searchSettings.start;
	let slice_size = $searchSettings.duration;
	console.log("Slice Start and Size: ")
	console.table([slice_start, slice_size])

	$: { // synchronize store
		$searchSettings.start = slice_start
		$searchSettings.startDate = searchData[slice_start].date
		$searchSettings.duration = slice_size
		console.log("searchSettings Updated:")
		console.log($searchSettings)
	}

	let chartData = {
		labels: Array(slice_size).fill(''),
		datasets: [
			{
				label: 'SPY',
				fill: true,
				pointStyle: false,
				borderColor: '#0FBA81',
				tension: 0,
				data: searchData.map(p => p.close).slice(slice_start, slice_start+ slice_size),
			},
		],
	};

	const options = {
		responsive: true,
		scales: {
			x: {
				grid: {
					display: false,
				}
			},
			y: {
				grid: {
					display: false
				}
			},
		}
	}
	const update_pause = 100
	let update_timeout = null
	// Update Data
	$: {
		console.log("New chart slice requested...")
		clearTimeout(update_timeout);
		update_timeout = setTimeout(() => {
			console.log("Updating chart...")
			chartData.labels = Array(slice_size).fill('')
			chartData.datasets[0].data = searchData.map(p=> p.close).slice(slice_start, slice_start+ slice_size)
		}, update_pause)
	}

	// This is the compare from string
	let searchFrom = $searchSettings.searchFrom
	// This corresponds to the chip list
	let searchWithinInput = ""

	function onSearchFromSelect(event){
		$searchSettings.searchFrom = event.detail.value
		searchFrom = event.detail.value
	}

	function onSearchWithinChipSelect(event){
		searchWithinChipList = [...searchWithinChipList, event.detail.value]
		$searchSettings.searchIn = searchWithinChipList
		searchWithinInput = ""
	}

	const searchFromOptions = [
		{label: "SPY - S&P 500 Index", value: "SPY", keywords: 'spy, sp500, s&p500 spx'},
		{label: "QQQ - Dow Jones Index", value: "QQQ", keywords: 'qqq, nasdaq, nasdaq100'},
		{label: "AAPL - Apple", value: "AAPL", keywords: 'aapl, apple, iphone, macbook, mac'},
		{label: "AMZN - Amazon", value: "AMZN", keywords: 'amzn, amazon, kindle, alexa'},
		{label: "MSFT - Microsoft", value: "MSFT", keywords: 'msft, microsoft, windows, xbox'},
		{label: "GOOG - Google", value: "GOOG", keywords: 'goog, google, android, pixel'},
		{label: "FB - Facebook", value: "FB", keywords: 'fb, facebook, instagram, whatsapp'},
		{label: "TSLA - Tesla", value: "TSLA", keywords: 'tsla, tesla, model s, model 3, model x, model y, cybertruck'},
		{label: "NVDA - Nvidia", value: "NVDA", keywords: 'nvda, nvidia, geforce, rtx, quadro'},
		{label: "PYPL - PayPal", value: "PYPL", keywords: 'pypl, paypal, venmo'},
	]

	let searchWithinChipList = ["SPY"]
	const searchWithinOptions = searchFromOptions.map(o => o.value)


	let searchInParam = searchSettings.searchIn
	console.log("Search In Param: " + searchInParam)
</script>


<div class="w-screen max-h-full mx-auto xl:mx-0 xl:flex my-auto">
	<Line data={chartData} {options} class="container"/>
	<!--Settings-->
	<div class="bg-surface-900 xl:border border-primary-400 rounded xl:m-2 p-8  w-full h-fit max-h-full flex-1">
		<h2 class="text-primary-400 mb-2">Settings</h2>
		<div class='mb-2'> <!--FROM Chart Select-->
			<h4 class='mb-0.5'>Compare From:</h4>
			<input class='input' type='search' name='from' bind:value={searchFrom} />
			<div class='card w-full max-h-40 overflow-y-auto'>
				<Autocomplete bind:input={searchFrom}
											options={searchFromOptions}
											on:selection={onSearchFromSelect} />
			</div>
		</div>
		<div class="mt-2"> <!--Time-Slicer-->
			<h4>Start: {searchData[slice_start].date}</h4>
			<RangeSlider name="PeriodStart"
									 accent="accent-primary-900"
									 bind:value={slice_start}
									 min={0}
									 max={searchData.length - slice_size}
									 step={10} />
		</div>
		<div class="inline">
			<h4>Duration:</h4>
			<input class="input w-4rem" type="number" bind:value={slice_size} />
			<RangeSlider name="PeriodSize"
									 bind:value={slice_size}
									 min={10}
									 max={365}
									 step={1} />
		</div>
		<div>
			<h4>Search Within</h4>
			<InputChip name="SearchWithin"
								 bind:input={searchWithinInput}
								 bind:value={searchWithinChipList}
								 whitelist={searchFromOptions}
								 allowUpperCase />
			<div class='card w-full max-w-sm max-h-40 overflow-y-auto'>
				<Autocomplete bind:input={searchWithinInput}
											options={searchFromOptions}
											denylist={searchWithinChipList}
											on:selection={onSearchWithinChipSelect}/>
			</div>
		</div>
		<a href="/results?start={$searchSettings.start}
		&duration={$searchSettings.duration}
		&from={$searchSettings.searchFrom}
		&in={$searchSettings.searchIn.join('&in=')}" class="justify-self-center">
			<button class="btn variant-filled-primary font-bold my-4">Search</button>
		</a>
	</div>
</div>
