// COVIDAPI.getSupportedCountries
COVIDAPI.getSupportedCountries()
.then(data => {
    console.log("COVIDAPI.getSupportedCountries");
    console.log(data);
})
// COVIDAPI.getPastDataForCountry
COVIDAPI.getPastDataForCountry('US')
.then(data => {
    console.log("COVIDAPI.getPastDataForCountry");
    console.log(data);
});
// COVIDAPI.getPredictedDataForCountry
COVIDAPI.getPredictedDataForCountry('US')
.then(data => {
    console.log("COVIDAPI.getPredictedDataForCountry");
    console.log(data);
});