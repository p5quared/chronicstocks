import {searchForSimilarSS} from './searchForSimilar.js';

export async function load({fetch, params, url}){
  const searchIn = url.searchParams.getAll('in')
  const searchFrom = url.searchParams.get('from')
  const start= +url.searchParams.get('start')
  const duration = +url.searchParams.get('duration')

  let q_periods = []
  for(let i = 0; i < searchIn.length; i++){
    const stock = searchIn[i]
    console.log("Fetching", stock)
    const loadedData = await fetch(`/data/${stock}.csv`)
      .then(r => r.text())
      .then(data => {
        return data.split("\n")
          .slice(1)
          .map(row => {
            const [date, open, high, low, close, volume] = row.split(',')
            return {date: new Date(date),
                    close: +close}
          })
      }).catch(err => {
        console.log("Error fetching searchIn")
        console.log(err)
      })
    q_periods.push({name: stock, data: loadedData})
  }

  const p_period = await fetch(`/data/${searchFrom}.csv`)
    .then(r => r.text())
    .then(data => {
      data = data.split("\n")
        .slice(1)
        .map(row => {
          const [date, open, high, low, close, volume] = row.split(',')
          return {date: new Date(date), close: +close}
        })
      return {name: searchFrom, data}
    }).catch(err => {
      console.log("Error fetching searchFrom")
      console.log(err)
    })

  const allData = {p: p_period, q: q_periods}
  const results = searchForSimilarSS({p: p_period, q: q_periods}, start, duration)
  console.log("results on server:", results)

  return results
}
