<script>
    import {AppBar, LightSwitch} from "@skeletonlabs/skeleton";
</script>

<AppBar>
    <svelte:fragment slot="lead"><a href="/">Deja-View</a></svelte:fragment>
    <svelte:fragment slot="trail">
        <LightSwitch/>
    </svelte:fragment>
</AppBar>
