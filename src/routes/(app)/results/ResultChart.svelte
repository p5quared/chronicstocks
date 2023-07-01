<script>
    // TODO: Animate Chart Drawing
    export let p;
    export let q;
		export let index;
		console.log("Index: " + index)

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
    for(let i=0; i<q.length; i++){
        chartData.push({
            label: q[i].name + " " + q[i].date.toDateString(),
            data: q[i].data,
            fill: false,
            borderWidth: 3,
            pointStyle: false,
					borderColor: 'gray',
            borderDash: [9, 3],
            tension: 0
        })
    }

		if(index !== -1){
			chartData[index + 1].borderColor = '#FF0000'
		}


    let data = {
        labels: Array(p.data.length).fill(''),
        datasets: chartData

    }

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
</script>

<Line {data} {options} class='min-h-0 min-w-0'  />
