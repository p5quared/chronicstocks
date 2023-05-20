<script>
   console.time('load spy')
   import closes from './data.js'
   console.log(closes)
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

  let slice_start = 3000;
  let slice_size = 300;

  let data = {
    labels: Array(slice_size).fill(''),
    datasets: [
      {
        label: 'SPY',
        fill: true,
        pointStyle: false,
        borderColor: 'rgb(256, 100, 100)',
        tension: 0.05,
        data: closes.slice(slice_start, slice_start+ slice_size),
      },
    ],
  };

   const update_pause = 500
   let update_timeout = null
   $: {
       console.log("New Data Requested...")
       clearTimeout(update_timeout);
       update_timeout = setTimeout(() => {
           console.log("Updating chart...")
           data.labels = Array(slice_size).fill('')
           data.datasets[0].data = closes.slice(slice_start, slice_start+ slice_size)
       }, update_pause)
   }

</script>

<div class="container">
    <Line {data} options={{responsive: true}}/>
    <div>  <!--Settings-->
        <div class="">
            <h3>Start</h3>
            <RangeSlider name="PeriodStart" bind:value={slice_start} min={0} max={closes.length - slice_size} step={10} />
        </div>
        <div class="">
            <h3>Duration: {slice_size} Days</h3>
            <RangeSlider name="PeriodSize" bind:value={slice_size} min={10} max={365} step={1} />
        </div>
    </div>
    <div>
        <a href="/search/{slice_start}/{slice_size}" class="justify-self-center">
            <button class="btn variant-filled-surface">Search</button>
        </a>
    </div>
</div>
