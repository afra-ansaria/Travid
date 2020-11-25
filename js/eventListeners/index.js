const EventListners = function(){
    const countrySelect = document.querySelector('#countryDrops');
    const stock_search_button = document.getElementById("stock_search_button");
    const stock_search_input = document.getElementById("stock_search");


    return {
        addListeners: () => {
            window.addEventListener('resize', () => {
                Charts.drawCovidChart();
            });
            countrySelect.addEventListener('change', async () => {
                await Charts.drawCovidChart();
                await NewsFeed.populateNewsFeed();
            })
            stock_search_button.addEventListener('click', async (event) => {
                        event.preventDefault();
                       const stock_symbol = stock_search_input.value;
                       new TradingView.widget(
                        {
                        "autosize": true,
                        "symbol": stock_symbol,
                        "interval": "W",
                        "timezone": "Etc/UTC",
                        "theme": "light",
                        "style": "3",
                        "locale": "en",
                        "toolbar_bg": "#f1f3f6",
                        "enable_publishing": false,
                        "allow_symbol_change": true,
                        "container_id": "tradingview_cbc98",
                        "details": true,
                        "hide_top_toolbar": true
                       }
                        );
                return false;
            })
        }
    }
}();

