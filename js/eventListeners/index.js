const EventListeners = function(){
    return {
        addDashboardEventListeners: () => {
            const countrySelect = document.querySelector('#countryDrops');
            const stockSearchButton = document.querySelector("#stock_search_button");
            const stockSearchInput = document.querySelector("#stock_search_input");
            const watchlistDrops = document.querySelector("#watchlistDrops");
            const modalStockTicker = document.querySelector('#ticker');
            const modalCountryDrops = document.querySelector('#countryDrops2');
            const saveWatchListButton = document.querySelector('#saveWatchListButton');
            window.addEventListener('resize', () => {
                Charts.drawCovidChart();
                Charts.drawCovidMap();
            });
            countrySelect.addEventListener('change', async (event) => {
                modalCountryDrops.value = event.target.value;
                Charts.drawCovidMap();
                await Charts.drawCovidChart();
                await NewsFeed.populateNewsFeed(); 
            });
            stockSearchButton.addEventListener('click', (event) => {
                Charts.drawStockChart();
            });
            stockSearchInput.addEventListener('keyup', (event) => {
                if (event.key === "Enter") {
                    Charts.drawStockChart();
                }
            });
            watchlistDrops.addEventListener('change', async (event) => {
                const name = event.target.value
                const { stockId, country } = await FirebaseAPI.getWatchlistFromName(name);
                stockSearchInput.value = stockId;
                stockSearchButton.dispatchEvent(new Event('click'));
                countrySelect.value = country;
                countrySelect.dispatchEvent(new Event('change')); 
            });
            stockSearchInput.addEventListener('change', (event) => {
                modalStockTicker.value = event.target.value;
            });  
            saveWatchListButton.addEventListener('click', async () => {
                const name = document.getElementById('watchlistName').value;
                const ticker = modalStockTicker.value;
                const country = modalCountryDrops.value;
                await FirebaseAPI.addToWatchList(name, country, ticker);
                await FirebaseAPI.getAllWatchLists(name);
                watchlistDrops.dispatchEvent(new Event('change'));
            });
        },
        addAuthEventListeners: () => {
            const authToggleButton = document.querySelector('.img__btn');
            const signUpButton = document.querySelector('#signupButton');
            const loginButton = document.querySelector('#loginButton');
            authToggleButton.addEventListener('click', () => {
                document.querySelector('.cont').classList.toggle('s--signup');
            });
            signUpButton.addEventListener('click', () => {
                const email = document.getElementById('signUpEmail').value;
                const password = document.getElementById('signUpPassword').value;
                FirebaseAPI.signUp(email, password);
            });
            loginButton.addEventListener('click', () => {
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                FirebaseAPI.login(email, password);
            });
        }
    }
}();

