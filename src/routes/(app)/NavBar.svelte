<script>
    import {AppBar, LightSwitch} from "@skeletonlabs/skeleton";
</script>

<AppBar>
    <svelte:fragment slot="lead"><a href="/" class="h1 font-bold gradient-heading">Deja-View</a></svelte:fragment>
    <svelte:fragment slot="trail">
        <LightSwitch/>
    </svelte:fragment>
</AppBar>
