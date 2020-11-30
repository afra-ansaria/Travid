$(document).ready(() => {
    let loaded = false;
    firebase.auth().onAuthStateChanged(async (user) => {
        if (user && !loaded) {
            FirebaseAPI.setUserName();
            await FirebaseAPI.createDefaultWatchList();
            await FirebaseAPI.getAllWatchLists();
            Charts.drawStockChart();
            await CountryDropdown.populate();
            await Charts.drawCovidChart();
            await Charts.drawCovidMap();
            await NewsFeed.populateNewsFeed();
            EventListeners.addDashboardEventListeners();
            loaded = true;
        } else {
            window.location = './';
        }
    });
});