$(document).ready(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            await FirebaseAPI.createDefaultWatchList();
            await FirebaseAPI.getAllWatchLists();
            Charts.drawStockChart();
            await CountryDropdown.populate();
            await Charts.drawCovidChart();
            Charts.drawCovidMap();
            await NewsFeed.populateNewsFeed();
            EventListners.addDashboardEventListeners();
        } else {
            window.location = './';
        }
    });
});