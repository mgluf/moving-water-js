export default function parseReadings(readings){
let parsed = []
let items = readings.items

items.map(reading =>{
  parsed.push(
    {
      value: reading.value,
      date: reading.date
    }
  )
})

let removeUndefined = parsed.filter( parsedReading => parsedReading.value != undefined);
let latest = removeUndefined[removeUndefined.length - 1]

if(latest === undefined){
  // set defaults if no values are found within date range
  latest = {value: 0, date: 0}
}

return latest
}