<script>
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
        Colors
    } from 'chart.js';
    import { onDestroy } from 'svelte';
    ChartJS.register(
      Title,
      Tooltip,
      Legend,
      LineElement,
      Filler,
      LinearScale,
      PointElement,
      CategoryScale,
      Colors
    );

    function* tripleTickGenerator(){
        let main_ticker = 1;
        let secondary1 = main_ticker + 0.001
        let secondary2 = main_ticker - 0.001
        while(true){
            main_ticker += Math.random() * 0.2
            main_ticker -= Math.random() * 0.2
            secondary1 = main_ticker
            secondary1 += Math.random() * 0.2
            secondary1 -= Math.random() * 0.2
            secondary2 = main_ticker
            secondary2 -= Math.random() * 0.2
            yield [main_ticker, secondary1, secondary2];
        }
    }
    let ticker = tripleTickGenerator()

    const DRAWN_TICKS = 100
    const BLANK_TICKS = DRAWN_TICKS * .25
    const TICK_RATE = 200

    let generatedTicks = []
    for(let i = 0; i < DRAWN_TICKS; i++){
        generatedTicks.push(ticker.next().value)
    }
    for(let i = 0; i < BLANK_TICKS; i++){
        generatedTicks.push(0)
    }
    let data

    $: data = {
        labels: generatedTicks.map(() => ""),
        datasets: [
            {
                label: 'P',
                data: generatedTicks.map((tick) => tick[0]),
                fill: false,
                borderColor:'#0FBA81',
                tension: 0,
                pointStyle: false,
            },
            {
                label: 'Q1',
                data: generatedTicks.map((tick) => tick[1]),
                fill: false,
                borderColor: 'rgba(85,195,255,0.2)',
                tension: 0.4,
                pointStyle: false,
            },
            {
                label: 'Q2',
                data: generatedTicks.map((tick) => tick[2]),
                fill: false,
                borderColor: 'rgba(245,0,0,0.2)',
                tension: 0.4,
                pointStyle: false,
            }
        ]
    };

    const options = {
        spanGaps: false,
        animations: false,
        scales:{
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false,
                    },
                    ticks: {
                        display: false
                    }
                }
        },
        plugins: {
            legend: {
                display: false
            }
        },
    }
    const updateChartData = () => {
        generatedTicks = generatedTicks.slice(1, DRAWN_TICKS)
        generatedTicks.push(ticker.next().value)
        for(let i = 0; i < BLANK_TICKS; i++){
            generatedTicks.push(0)
        }
        console.log("Updating...")
    }

    const updateChartInterval = setInterval(updateChartData, TICK_RATE)
    onDestroy(() => {
        clearInterval(updateChartInterval)
    })


</script>
<div class='bg-primary-500/10 shadow-2xl py-10'>
        <div class="container mx-auto flex flex-wrap p-5">
            <div class='my-auto lg:w-1/3'>
                <h1 class='my-auto'>Search for stock trends and correlation via data science.</h1>
                <a href="/search">
                    <button class='btn variant-filled-primary font-semibold text-3xl mt-8 shadow-xl'> Get Searching </button>
                </a>
            </div>
            <div class='border-2 border-surface-500 bg-primary-800/10 rounded-lg flex-grow m-10 shadow-xl'>
                <Line {data} {options} />
            </div>
        </div>
</div>
<div class='bg-surface-900/80 shadow-xl py-10'>
    <div class='container mx-auto lg:flex items-center justify-evenly'>
        <img class='w-2/3 mx-auto'
             src='/code.png' alt='Screenshot of code'>
        <a class='content-center' href='https://github.com/p5quared/dejavu'>
            <button class='btn variant-filled-tertiary font-semibold text-2xl my-5 lg:m-0 mx-auto'>
                How It Works
            </button>
        </a>
    </div>
</div>
<div class='bg-primary-500/10 py-10'>
    <div class='container mx-auto flex flex-col items-center'>
        <a href='https://github.com/p5quared'>
            <h3> made by Peter V. '23</h3>
        </a>
    </div>
</div>