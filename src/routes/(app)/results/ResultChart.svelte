<script>
    // TODO: Add URLS to each line or use drawers
    // TODO: Animate Chart Drawing
    export let p;
    export let q;
		console.log("Q in chart", q)

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
                label: p.name + " " + p.date.toDateString() + " (Target)",
                data: p.data,
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
            label: q[i].name + " " + q[i].date.toDateString(),
            data: q[i].data,
            fill: false,
            borderWidth: 3,
            pointStyle: false,
            borderDash: [9, 3],
            tension: 0
        })
    }


    let data = {
        labels: Array(p.data.length).fill(''),
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