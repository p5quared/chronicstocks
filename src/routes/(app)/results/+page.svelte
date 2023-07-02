<script lang='ts'>
import type { PageData } from "../$types";
export let data: PageData
const {p, q, avg_trend, periods_measured, time} = data
import ResultChart from "./ResultChart.svelte";

    let index = -1

    const month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	function classifyTrend(trend: number){
		const magnitude = Math.abs(trend)
		let trend_string: string
		if(magnitude > 10){
			trend_string = "Strong"
		}
		else if(magnitude > 5){
			trend_string = "Weak"
		}
		else{
			return "Neutral"
		}
		if(trend > 0){
			return `${trend_string}+`
		}
		else{
			return `${trend_string}-`
		}
	}

	function classifyAvgTrend(trend: number){
		const magnitude = Math.abs(trend)
		let trend_string: string
		if(magnitude > 3){
			trend_string = "very"
		}
		else if(magnitude > 0.25){
			trend_string = "slightly"
		}
		else{
			return "neutral"
		}
		if(trend > 0){
			return `${trend_string} positive`
		}
		else{
			return `${trend_string} negative`
		}
	}
</script>

<div class='mx-auto lg:p-8 lg:flex lg:gap-4 lg:h-full'>
    {#key index}
        <div class='min-h-full w-full lg:border rounded lg:border-primary-500 bg-surface-900/50 grid content-center'>
            <ResultChart {p} {q} {index} />
        </div>
    {/key}
    <div class="bg-surface-900 lg:border border-primary-400 xl:rounded p-4 lg:p-8 flex-1
                flex flex-col gap-4 min-w-fit">
		<div class="text-primary-400 mb-2 break-words">
			<h2>{p.name} {month_names[p.date.getMonth()]} {p.date.getDate()}, {p.date.getFullYear()}</h2>
			<h2 class="italic">({p.data.length} days):</h2>
		</div>
		<p>Analyzed {periods_measured} periods in {time}ms. </p>
		<p>We found an average trend that was {classifyAvgTrend(avg_trend)}.</p>
		<p>The actual trend of {p.name} (in the next period was) {p.trend} ({classifyTrend(p.trend)}).</p>
        <div class='table-container lg:max-h-80'>
			<table class='table table-hover table-comfortable min-w-fit'>
			<thead>
				<tr>
					<th>Stock</th>
					<th>Date</th>
					<th>Trend*</th>
					<th>Detail</th>
				</tr>
			</thead>
			<tbody>
				{#each q as row, i}
					<tr on:mouseenter={() => index = i}>
						<td>{row.name}</td>
						<td>{month_names[row.date.getMonth()]} {row.date.getDate()}, {row.date.getFullYear()}</td>
						<td>{row.trend !== null ? classifyTrend(row.trend) : "N/a" }</td>
						<td><a href="http://finance.yahoo.com/chart/{row.name}" target="_blank">Full Chart</a></td>
					</tr>
				{/each}
			</tbody>
			<caption class='italic caption-bottom'>*Trend of stock in the <span class='font-bold'>following</span> period.</caption>
			</table>
        </div>
		<p class='italic ml-1 font-light text-center'>(Hover or press a row to highlight data)</p>
		<a class='btn variant-filled-secondary font-bold' href="/search">New Search</a>
    </div>
</div>
