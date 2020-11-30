const EventListners = function(){
    const countrySelect = document.querySelector('#countryDrops');
    const stockSearchButton = document.querySelector("#stock_search_button");
    const stockSearchInput = document.querySelector("#stock_search_input");
    const watchlistDrops = document.querySelector("#watchlistDrops");
    const modalStockTicker = document.querySelector('#ticker')
    const modalCountryDrops = document.querySelector('#countryDrops2')
    return {
        addListeners: () => {
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
                var name = event.target.value
                getWatchlistFromName(name, ({stockId, country})=>{
                    stockSearchInput.value = stockId;
                    stockSearchButton.dispatchEvent(new Event('click'));
                    countrySelect.value = country;
                    countrySelect.dispatchEvent(new Event('change')); 
                })

            });
            stockSearchInput.addEventListener('change', (event) => {
                var stockId = event.target.value
                modalStockTicker.value = stockId
            });
            countrySelect.addEventListener('change',  (event) => {
                var country = event.target.value
                modalCountryDrops.value = country 
            });

            
        }
    }
}();

