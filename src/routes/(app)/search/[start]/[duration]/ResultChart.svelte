<script>
    // TODO: Add URLS to each line or use drawers
    // TODO: Animate Chart Drawing
    export let p;
    export let q;

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

    let chartData = [
            {
                label: 'Sample',
                data: p,
                fill: false,
                borderWidth: 5,
                pointStyle: false,
                borderColor: '#0FBA81',
                tension: 0
            }
        ]
    // TODO: Dynamic coloring so we don't have to forceOverride
    for(let i=0; i<q.length; i++){
        chartData.push({
            label: 'Q'+(i+1).toString(),
            data: q[i],
            fill: false,
            borderWidth: 3,
            pointStyle: false,
            borderDash: [9, 3],
            tension: 0
        })
    }


    let data = {
        labels: Array(p.length).fill(''),
        datasets: chartData

    }

    const options = {
        plugins: {
            colors: {
                forceOverride: true,
            }
        }
    }
</script>

<Line {data} {options}  />