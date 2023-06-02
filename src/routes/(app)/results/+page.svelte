<script>
    export let data
    const {p, q} = data
    import ResultChart from "./ResultChart.svelte";

</script>

<ResultChart {p} {q}/>
<a href="/search">
    <button class="btn variant-filled-primary">New Search</button>
</a>
