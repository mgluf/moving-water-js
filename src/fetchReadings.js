import parseReadings from "./parseReadings";

export default async function fetchReadings(notation, days){

let today = new Date();
// define the number of days before today to look for readings
let priorDate = new Date(new Date().setDate(today.getDate() - days));
let formatted;
//format date for environment.data.gov.uk API
let month = priorDate.getUTCMonth() + 1;
let day = priorDate.getUTCDate();
let year = priorDate.getUTCFullYear();
formatted =  year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2);



// make API call with provided notation and days back to look for readings
let fetched
// let post
const prefix = "https://environment.data.gov.uk/hydrology"

return await fetch(prefix + "/id/measures/" + notation + "-flow-m-86400-m3s-qualified/readings?mineq-date="+ formatted)
		.then(response => response.json())
		.then(data => {
			
			fetched = parseReadings(data);
      // console.log("fetched", fetched)
			return fetched;

		}).catch(error => {
			console.log(error);
			return [];
		});


// console.log(post);

// return fetched;
}


