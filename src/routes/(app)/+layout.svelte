<script lang="ts">
import type { PageData } from './$types';
	// Your selected Skeleton theme:
import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

// This contains the bulk of Skeletons required styles:
import '@skeletonlabs/skeleton/styles/all.css';

// Finally, your application's global stylesheet (sometimes labeled 'app.css')
import '../../app.postcss';

import { AppShell } from '@skeletonlabs/skeleton';
import NavBar from './NavBar.svelte';

    export let data: PageData;

    console.log("First Visit?:", !data.visited)
</script>

<AppShell class='min-h-screen'>
    <svelte:fragment slot="header">
        <NavBar/>
    </svelte:fragment>
    <slot />
</AppShell>
