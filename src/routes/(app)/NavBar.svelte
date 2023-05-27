<script>
    import {AppBar, LightSwitch} from "@skeletonlabs/skeleton";
</script>

<AppBar class="shadow">
    <svelte:fragment slot="lead"><a href="/" class="font-bold gradient-heading"><h2>Chronic Stocks</h2></a></svelte:fragment>
    <svelte:fragment slot="trail">
        <LightSwitch/>
    </svelte:fragment>
</AppBar>
