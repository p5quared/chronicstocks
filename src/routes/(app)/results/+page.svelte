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
</script>

<div class='container mx-auto h-full py-8 lg:flex'>
    {#key index}
        <div class='w-4/5 min-w-0 border rounded border-primary-500 bg-surface-900/50'>
            <ResultChart {p} {q} {index} />
        </div>
    {/key}
    <div class="bg-surface-900 border border-primary-400 w-1/4 xl:rounded p-8 xl:mx-4 flex-1
                flex flex-col gap-4">
        {#if index === -1}
        <h2 class="text-primary-400 mb-2">Results</h2>
        <div class='card'>
            <h3 class='card-header mb-2'>Search Info </h3>
            <ul class='mx-4'>
                <li>{p.name}</li>
                <li>{month_names[p.date.getMonth()]} {p.date.getDate()}, {p.date.getFullYear()}</li>
                <li>{p.data.length} days</li>
            </ul>
            <h4 class='card-header my-2'>Top Matches:</h4>
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
