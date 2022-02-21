export default function parse(data){
  let items = data.items
  let parsed = [];
  items.map(obj => {

    if (obj.measures.length > 1) {
      parsed.push(
        {
          label: obj.label,
          notation: obj.notation,
          river: obj.riverName,
          // It appears the "Qualified daily mean flow timeseries..." measure is always the second one if there are more than one.
          // If the wrong label and unit shows up at some point may need to figure out how to isolate daily mean a different way.
          measure: obj.measures[1].label,
          unit: obj.measures[1].unitName,
        }
      ) 
    } 

    else {
      parsed.push(
          {
          label: obj.label,
          notation: obj.notation,
          river: obj.riverName,
          measure: obj.measures.label,
          unit: obj.measures.unitName,
        }
      ) 
    }
  });
  return parsed
}