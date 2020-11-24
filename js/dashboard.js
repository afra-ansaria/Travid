$(document).ready(async function () {
    await CountryDropdown.populate();
    await Charts.drawCovidChart();
    await NewsFeed.populateNewsFeed();
    EventListners.addListeners();
});