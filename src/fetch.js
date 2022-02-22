export default function fetchReadings(notation, days){

let today = new Date();
// define the number of days before today to look for readings
let priorDate = new Date(new Date().setDate(today.getDate() - days));
let formatted;
//format date for environment.data.gov.uk API
let month = priorDate.getUTCMonth() + 1;
let day = priorDate.getUTCDate();
let year = priorDate.getUTCFullYear();
formatted =  year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2);

// make API call with provided notation and date
let fetched
const prefix = "https://environment.data.gov.uk/hydrology"

fetch(prefix + "/id/measures/" + notation + "-flow-m-86400-m3s-qualified/readings?mineq-date="+ formatted)
		.then(response => response.json())
		.then(data => {
			console.log("[Station 0] Readings from " + days + " days ago to today", "\n" , data);

		}).catch(error => {
			console.log(error);
			return [];
		});

return fetched
}