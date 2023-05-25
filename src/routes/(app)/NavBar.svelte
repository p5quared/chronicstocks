<script>
    import {AppBar, LightSwitch} from "@skeletonlabs/skeleton";
</script>

<AppBar class="shadow">
    <svelte:fragment slot="lead"><a href="/" class="h1 font-bold gradient-heading">Chronic Stocks</a></svelte:fragment>
    <svelte:fragment slot="trail">
        <LightSwitch/>
    </svelte:fragment>
</AppBar>
