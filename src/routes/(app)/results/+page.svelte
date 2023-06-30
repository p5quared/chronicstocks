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

    const previousStock = () => {
        index = index === 0 ? 0 : index - 1
    }
    const nextStock = () => {
        index = index === 2 ? 2 : index + 1
    }
	// TODO: Redesign the viewing: 
	// 			on hover highlight chart so we don't have to click buttons
	//          click sends to yahoo stock chart of time period
	//          consider trying to display overall future in the chart...
</script>

<div class='mx-auto lg:p-8 lg:flex lg:gap-4'>
    {#key index}
        <div class='min-h-full lg:w-3/4 lg:border rounded lg:border-primary-500 bg-surface-900/50 grid content-center'>
            <ResultChart {p} {q} {index} />
        </div>
    {/key}
    <div class="bg-surface-900 lg:border border-primary-400 w-full xl:rounded p-4 lg:p-8 flex-1
                flex flex-col gap-4 min-h-full">
        {#if index === -1}
        <h3 class="">Matches for</h3>
		<h2 class="text-primary-400 mb-2">{p.name} {month_names[p.date.getMonth()]} {p.date.getDate()}, {p.date.getFullYear()} ({p.data.length} days)</h2>
        <div class='card'>
            <ul class='ml-4'>
                {#each q as match}
                    <li><p>{match.name} - {month_names[match.date.getMonth()]} {match.date.getDate()}, {match.date.getFullYear()}</p></li>
                {/each}
            </ul>
        </div>
            {:else}
                {#key index}
                    <div class='card'>
                        <div class='card-header'>{q[index].name}: {month_names[q[index].date.getMonth()]} {q[index].date.getDate()}, {q[index].date.getFullYear()}</div>
                    </div>
                {/key}
            {/if}
        {#if index === -1}
            <button class="btn variant-filled-primary" on:click={() => index = 1}>View Details</button>
        {:else}
            <div class='flex'>
            <button class='btn variant-ghost-error w-1/2' on:click={previousStock}>Previous</button>
            <button class='btn variant-ghost-primary w-1/2' on:click={nextStock}>Next</button>
            </div>
        {/if}
        <a class='self-center'
          href="/search">
            <button class="btn variant-filled-secondary">New Search</button>
        </a>
    </div>
</div>
