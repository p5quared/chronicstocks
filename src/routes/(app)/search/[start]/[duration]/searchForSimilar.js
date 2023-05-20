function searchForSimilar(all_data, start, duration){
    // Get the target period, and comparable periods of equal duration, and normalize n/sum
    let target_period = all_data.slice(start, start + duration)
    target_period.map((value) => value / target_period.reduce((a, b) => a + b, 0))
    const before = chunkify(all_data.slice(0, start), duration)
    const after = chunkify(all_data.slice(start+duration), duration)
    let comparable_periods = before.concat(after)
    comparable_periods.map((period) => {
        period.map((value) => value / period.reduce((a, b) => a + b, 0))
    })


    const kl_compare = comparable_periods.map((period) => kl_divergence(target_period, period))
    return {p: target_period,
        kl: kl_compare}
}

function chunkify(data, chunkSize){
    let chunked = Array(Math.ceil(data.length / chunkSize)).fill().map((_, index) => {
        return data.slice(index * chunkSize, (index + 1) * chunkSize)
    })
    if (chunked[chunked.length - 1].length < chunkSize){
        chunked.pop()
    }

    return chunked
}

function kl_divergence(p, q){
    let divergence = 0
    for (let i = 0; i < p.length; i++){
        divergence += p[i] * Math.log(p[i] / q[i])
    }
    return divergence
}

export default searchForSimilar