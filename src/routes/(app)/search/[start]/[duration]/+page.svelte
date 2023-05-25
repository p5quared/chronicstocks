<script>
    export let data
    import spy_data from "./data.js";

    const closes = spy_data.map(row => row.close)

    // TODO: Fix so we can access date/time info
    import searchForSimilar from "./searchForSimilar.js";
    console.time('searchForSimilar')
    const similar = searchForSimilar(closes, data.start, data.duration)
    console.timeEnd('searchForSimilar')

    import ResultChart from "./ResultChart.svelte";
    const p = similar.p
    const q = similar.kl.slice(0, 3)
    console.log('p', p)
    console.log('q', q)
</script>

<ResultChart {p} {q}/>
<a href="/search">
    <button class="btn variant-filled-primary">New Search</button>
</a>
