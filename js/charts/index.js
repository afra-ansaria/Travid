
const Charts = function(){
    async function drawCovidChart() {
        const countryDropdown = document.querySelector('#countryDrops');
        const countrySelection = countryDropdown.options[countryDropdown.selectedIndex];
        const countryAlpha2 = countrySelection.value;
        const covidPastData = await COVIDAPI.getPastDataForCountry(countryAlpha2);
        const covidPredictedData = await COVIDAPI.getPredictedDataForCountry(countryAlpha2);

        const chart_data = new google.visualization.DataTable();
        chart_data.addColumn('string', 'Day');
        chart_data.addColumn('number', 'Confirmed Cases');
        chart_data.addColumn('number', 'Confirmed Deaths');
        chart_data.addColumn('number', 'Predicted Cases');
        chart_data.addRows([...covidPastData, ...covidPredictedData]);

        const options = {
            chart: {
                title: `Total COVID-19 Cases, Deaths & Predictions for ${countrySelection.text}`,
                // subtitle: 'in thousands of people',
                tooltip: {isHtml: true},
            },
            vAxes: {
                    // Adds titles to each axis.
                    0: { title: 'Total Cases, Deaths and Predictions'},
            },
            crosshair: { 
                trigger: 'both',
                orientation: 'vertical'
            }
        };
        const chart = new google.charts.Line(document.getElementById('chart_div'));
        chart.draw(chart_data, google.charts.Line.convertOptions(options));
    }
    function drawStockChart() {
        const stockSearchInput = document.querySelector("#stock_search_input");
        const { value } = stockSearchInput;
        const symbol = value && value.trim();
        if (symbol) {
            new TradingView.widget({
                "autosize": true,
                "symbol": symbol,
                "interval": "W",
                "timezone": "Etc/UTC",
                "theme": "light",
                "style": "3",
                "locale": "en",
                "toolbar_bg": "#f1f3f6",
                "enable_publishing": false,
                "allow_symbol_change": false,
                "container_id": "tradingview_cbc98",
                "details": true,
                "hide_top_toolbar": true
                }
            );
        } else {
            alert("Please enter a stock symbol!");
        }
    }
    google.charts.load('current', { packages: ['corechart', 'line'] });
    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(drawCovidChart);
    return {
        drawCovidChart,
        drawStockChart
    }
}()
