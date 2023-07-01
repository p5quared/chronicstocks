<script lang='ts'>
import type { PageData } from "../$types";
export let data: PageData
const {p, q} = data
import ResultChart from "./ResultChart.svelte";

    let index = -1

    console.log("Q: ", q)
    console.log("P: ", p)

    const month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	// TODO: Redesign the viewing: 
	// 			on hover highlight chart so we don't have to click buttons
	//          click sends to yahoo stock chart of time period
	//          consider trying to display overall future in the chart...
</script>

<div class='mx-auto lg:p-8 lg:flex lg:gap-4 lg:h-full'>
    {#key index}
        <div class='min-h-full w-full lg:border rounded lg:border-primary-500 bg-surface-900/50 grid content-center'>
            <ResultChart {p} {q} {index} />
        </div>
    {/key}
    <div class="bg-surface-900 lg:border border-primary-400 xl:rounded p-4 lg:p-8 flex-1
                flex flex-col gap-4 min-w-fit">
        <h3>Closest matches found for</h3>
		<div class="text-primary-400 mb-2 break-words">
			<h2>{p.name} {month_names[p.date.getMonth()]} {p.date.getDate()}, {p.date.getFullYear()}</h2>
			<h2 class="italic">({p.data.length} days):</h2>
		</div>
        <div class='table-container w-full lg:max-h-96 lg:overflow-y-auto'>
			<table class='table table-hover table-comfortable'>
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
						<td>Up</td>
						<td><a href="http://finance.yahoo.com/chart/{row.name}" target="_blank">Full Chart</a></td>
					</tr>
				{/each}
			</tbody>
			</table>
        </div>
		<p class='italic mt-2 ml-1'>(Hover or press a row to highlight data)</p>
		<p class='italic ml-1'>*Approximate trend of stock <span class='font-bold'>following</span> the given period.</p>
        <a class='btn variant-filled-secondary font-bold' href="/search">New Search</a>
    </div>
</div>
