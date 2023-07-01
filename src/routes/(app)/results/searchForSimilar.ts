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
    /*
searchData = {
    p: {name: "stock", data: [{date, c1}, ...]},
    q: [{name: "stock", data: [{date, c1, ...]}, {name: "stock", data: [{date, c1} ...]}, ...]
     */
    // Get the target period, and comparable periods of equal duration, and normalize n/sum
    const {p, q} = searchData
    const target_slice = p.data.slice(start, start + duration)
    const target_period = target_slice.map((value) => value.close / target_slice.reduce((a, b) => a + b.close, 0))
    const target_p_returnable = {name: p.name,
      date: p.data[0].date,
      data: target_period}

    const periods_scored = []
    for(let i=0; i < q.length; i++){
        let close_periods
        if(q[i].name === p.name){
            const before = chunkify(p.data.slice(0, start-1), duration)
            const after = chunkify(p.data.slice(start + duration), duration)

            let combined = before.concat(after)
            // console.log("COMBINED", combined)
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
                periods_scored.push({
                    name: q[i].name,
                    date: q[i].data[duration * j].date,
                    score: kl_divergence(target_period, close_periods[j]),
                    data: close_periods[j]
                })
            }
        }


    // {score: n, data: [n1, n2, n3, ...]}
    const compared = periods_scored.sort((a, b) => a.score - b.score)
    console.log(compared[0])
    return {p: target_p_returnable,
        q: compared.slice(0,10)}
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
