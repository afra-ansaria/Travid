const EventListners = function(){
    const countrySelect = document.querySelector('#countryDrops');
    const stockSearchButton = document.querySelector("#stock_search_button");
    const stockSearchInput = document.querySelector("#stock_search_input");
    return {
        addListeners: () => {
            window.addEventListener('resize', () => {
                Charts.drawCovidChart();
            });
            countrySelect.addEventListener('change', async () => {
                await Charts.drawCovidChart();
                await NewsFeed.populateNewsFeed();
            })
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

