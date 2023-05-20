export function load({ params }){
    let {start, duration} = params
    start = +start
    duration = +duration

    return {
       start,
       duration
    }
}
