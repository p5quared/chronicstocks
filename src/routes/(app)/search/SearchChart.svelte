<script>
   console.time('load spy')
   import closes from './data.js'
   console.timeEnd('load spy')

   import {RangeSlider} from "@skeletonlabs/skeleton";

   import { Line } from "svelte-chartjs";

   import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
      Filler,
    LinearScale,
    PointElement,
    CategoryScale,
  } from 'chart.js';

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    Filler,
    LinearScale,
    PointElement,
    CategoryScale
  );

  // TODO: Store state so that we can go back to the same chart
  let slice_start = 3000;
  let slice_size = 300;

  let data = {
    labels: Array(slice_size).fill(''),
    datasets: [
      {
        label: 'SPY',
        fill: true,
        pointStyle: false,
        borderColor: '#0FBA81',
        tension: 0,
        data: closes.map(p => p.close).slice(slice_start, slice_start+ slice_size),
      },
    ],
  };

   const options = {
       responsive: true,
       scales: {
           x: {
               grid: {
                   display: false,
               }
           },
           y: {
               grid: {
                   display: false
               }
           },
       }
   }
   const update_pause = 100
   let update_timeout = null
   $: {
       console.log("New Data Requested...")
       clearTimeout(update_timeout);
       update_timeout = setTimeout(() => {
           console.log("Updating chart...")
           data.labels = Array(slice_size).fill('')
           data.datasets[0].data = closes.map(p=> p.close).slice(slice_start, slice_start+ slice_size)
       }, update_pause)
   }

</script>


<div class="w-screen max-h-full mx-auto xl:mx-0 xl:flex my-auto">
    <Line {data} {options} class="container"/>
    <div class="bg-surface-900 border border-primary-400 rounded p-8  w-full h-fit flex-1">  <!--Settings-->
        <h2 class="text-primary-400">Settings</h2>
        <div class="mt-2"> <!--Selectors-->
            <h4>Start: {closes[slice_start].date}</h4>
            <RangeSlider name="PeriodStart" accent="accent-primary-900" bind:value={slice_start} min={0} max={closes.length - slice_size} step={10} />
        </div>
        <div class="block">
            <h4>Duration (days): </h4>
            <input class="input lg:w-[40%] w-[50%]" type="number" bind:value={slice_size} />
            <RangeSlider name="PeriodSize" bind:value={slice_size} min={10} max={365} step={1} />
        </div>
        <a href="/search/{slice_start}/{slice_size}" class="justify-self-center">
            <button class="btn variant-filled-primary font-bold my-4">Search</button>
        </a>
    </div>
</div>
