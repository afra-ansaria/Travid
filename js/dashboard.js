$(document).ready(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            FirebaseAPI.setUserName();
            await FirebaseAPI.createDefaultWatchList();
            await FirebaseAPI.getAllWatchLists();
            Charts.drawStockChart();
            await CountryDropdown.populate();
            await Charts.drawCovidChart();
            await Charts.drawCovidMap();
            await NewsFeed.populateNewsFeed();
            EventListeners.addDashboardEventListeners();
        } else {
            window.location = './';
        }
    });
});