$(document).ready(async function () {
    Charts.drawStockChart();
    await CountryDropdown.populate();
    await Charts.drawCovidChart();
    await NewsFeed.populateNewsFeed();
    EventListners.addListeners();
});