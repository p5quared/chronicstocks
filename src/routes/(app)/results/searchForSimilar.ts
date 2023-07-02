// Server side version; updated
interface Tick {
	date: Date;
	close: number;
}

interface Period {
	name: string;
	data: Tick[];
}

interface SearchData {
	p: Period;
	q: Period[];
}
export function searchForSimilar(searchData: SearchData, start: number, duration: number){
    // Get the target period, and comparable periods of equal duration, and normalize n/sum
	const start_time = new Date().getTime()
    const {p, q} = searchData
    const target_slice = p.data.slice(start, start + duration)
	const target_slice_following = p.data.slice(start + duration, start + duration * 2)
	let p_trend = 0
	if(target_slice_following.length === duration){
		p_trend = trend(target_slice_following.map((value) => value.close))
	}
    const target_period = target_slice.map((value) => value.close / target_slice.reduce((a, b) => a + b.close, 0))
    const target_p_returnable = {
		name: p.name,
		date: p.data[0].date,
		data: target_period,
		trend: p_trend
	}

	let periods_measured = 0
    const periods_scored = []
    for(let i=0; i < q.length; i++){
        let close_periods
        if(q[i].name === p.name){
            const before = chunkify(p.data.slice(0, start-1), duration)
            const after = chunkify(p.data.slice(start + duration), duration)

            let combined = before.concat(after)
            combined = combined.map((period) => {
                return period.map((value) => (value.close / period.reduce((a, b) => a + b.close, 0)))
            })
            close_periods = combined
        }else {
            close_periods = q[i].data.map((value) => value.close)
            close_periods = chunkify(close_periods, duration)
            close_periods = close_periods.map((period) => {
                return period.map((value) => (value / period.reduce((a, b) => a + b, 0)))
            })
        }
		for(let j=0; j < close_periods.length; j++){
			periods_measured += 1
			periods_scored.push({
				name: q[i].name,
				date: q[i].data[duration * j].date,
				score: kl_divergence(target_period, close_periods[j]),
				data: close_periods[j],
				trend: j < (close_periods.length - 1) ? trend(close_periods[j+1]) : 0
			})
		}
	}


    const compared = periods_scored.sort((a, b) => a.score - b.score)
	const total_trend = compared.slice(0,5).reduce((a, b) => a + b.trend, 0) 
    return {
		p: target_p_returnable,
        q: compared.slice(0,10),
		avg_trend: Math.round(total_trend / 5 * 100) / 100,
		periods_measured: periods_measured,
		time: new Date().getTime() - start_time
	}
}

function chunkify(data: Tick[], chunkSize: number){
    const chunked = Array(Math.ceil(data.length / chunkSize)).fill().map((_, index) => {
        return data.slice(index * chunkSize, (index + 1) * chunkSize)
    })
    if (chunked[chunked.length - 1].length < chunkSize){
        chunked.pop()
    }

    return chunked
}

function kl_divergence(p: number[], q: number[]){
    let divergence = 0
    for (let i = 0; i < p.length; i++){
        divergence += p[i] * Math.log(p[i] / q[i])
    }
    return divergence * 10000
}

// Trend Percentage = ((Current Period Value - Base Period Value) / Base Period Value) * 100
function trend(data: number[]){
	const base = data[0]
	const current = data[data.length - 1]
	return Math.round( ((current - base) / base) * 10000) / 100
}
