<script lang='ts'>
import type { PageData } from './$types';
    export let data: PageData;

    import { blur } from 'svelte/transition';
    import { onMount } from 'svelte';

    console.log(data.visited);

    let animate = false;
    onMount( () => {
        animate = true;
    })
</script>

<div class="h-screen flex items-center" transition:blur={{intro: true}}>
    <div class="text-center mx-auto space-y-0.5">
        <h1 class="gradient-heading font-bold text-9xl">Chronic Stocks</h1>
        <p>Find what was and what will be... <br><span class="italic">tomorrow and tomorrow and tomorrow and.</span></p>
        <a href="/">
            <div class="btn variant-filled-tertiary mt-4 animate-pulse">
                <p>Enter</p>
            </div>
        </a>
    </div>
</div>
