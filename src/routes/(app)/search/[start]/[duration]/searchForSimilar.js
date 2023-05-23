function searchForSimilar(all_data, start, duration){
    // Get the target period, and comparable periods of equal duration, and normalize n/sum
    let target_period = all_data.slice(start, start + duration)
    target_period = target_period.map((value) => value / target_period.reduce((a, b) => a + b, 0))
    console.log("Target period: ", target_period)
    const before = chunkify(all_data.slice(0, start), duration)
    const after = chunkify(all_data.slice(start+duration), duration)
    let comparable_periods = before.concat(after)
    comparable_periods= comparable_periods.map((period) => {
        return period.map((value) => (value / period.reduce((a, b) => a + b, 0)))
    })


    // {score: n, data: [n1, n2, n3, ...]}
    let kl_compare = comparable_periods.map((period) => {
        return {score: kl_divergence(target_period, period), data: period}
    })
    kl_compare = kl_compare.sort((a, b) => a.score - b.score)
    kl_compare = kl_compare.map((period) => period.data) // don't really care about the score anymore
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
    return divergence * 10000
}

export default searchForSimilar