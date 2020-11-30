const EventListners = function(){
    return {
        addDashboardEventListeners: () => {
            const countrySelect = document.querySelector('#countryDrops');
            const stockSearchButton = document.querySelector("#stock_search_button");
            const stockSearchInput = document.querySelector("#stock_search_input");
            const watchlistDrops = document.querySelector("#watchlistDrops");
            window.addEventListener('resize', () => {
                Charts.drawCovidChart();
                Charts.drawCovidMap();
            });
            countrySelect.addEventListener('change', async () => {
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
            watchlistDrops.addEventListener('change', (event) => {
                const name = event.target.value
                getWatchlistFromName(name, ({stockId, country})=>{
                    stockSearchInput.value = stockId;
                    stockSearchButton.dispatchEvent(new Event('click'));
                    countrySelect.value = country;
                    countrySelect.dispatchEvent(new Event('change')); 
                })

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

