const EventListners = function(){
    const countrySelect = document.querySelector('#countryDrops');
    const stockSearchButton = document.querySelector("#stock_search_button");
    const stockSearchInput = document.querySelector("#stock_search_input");
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
            
        }
    }
}();

