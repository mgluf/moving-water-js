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

return parsed
}