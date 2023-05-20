<script>
    export let data
    import spy_data from "./data.js";

    const closes = spy_data.map(row => row.close)

    import searchForSimilar from "./searchForSimilar.js";
    console.time('searchForSimilar')
    const similar = searchForSimilar(closes, data.start, data.duration)
    console.timeEnd('searchForSimilar')

    import ResultChart from "./ResultChart.svelte";
    const p = similar.p
    const q = similar.kl.sort().slice(0, 3)
</script>

<h1>Results:</h1>
<ResultChart {p} {q}/>