$(document).ready(async function () {
    await CountryDropdown.populate();
    EventListners.addListeners();
    await Charts.drawCovidChart();
});