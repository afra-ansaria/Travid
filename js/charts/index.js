
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
        chart_data.addRows(covidPastData);
        chart_data.addRows([[covidPastData[covidPastData.length - 1][0],undefined, undefined, covidPastData[covidPastData.length - 1][1]]]);
        chart_data.addRows(covidPredictedData);
       // chart_data.addRows([...covidPastData, ...covidPredictedData]);

        const options = {
            chart: {
                title: `Total COVID-19 Cases, Deaths & Predictions for ${countrySelection.text}`,
                // subtitle: 'in thousands of people',
                tooltip: {isHtml: true},
            },
            vAxes: {
                    // Adds titles to each axis.
                    0: { 
                    title: 'Total Cases, Deaths and Predictions',
                    format: '#,###,###'                
                    },
            },
            crosshair: { 
                trigger: 'both',
                orientation: 'vertical'
            }
        };
        const chart = new google.charts.Line(document.getElementById('chart_div'));
        chart.draw(chart_data, google.charts.Line.convertOptions(options));
    }
    function drawCovidMap() {
        const chart = new google.visualization.GeoChart(document.getElementById('map_div'));
        chart.clearChart();
        const countryDropdown = document.querySelector('#countryDrops');
        const countrySelection = countryDropdown.options[countryDropdown.selectedIndex];
        const dataTable = [
            ["Country"],
            [countrySelection.text]
        ];
        const data = google.visualization.arrayToDataTable(dataTable);
        const options = {
            displayMode: 'region',
            datalessRegionColor: 'white',
            defaultColor: 'grey'
        };
       
        chart.draw(data, options);
        google.visualization.events.addListener(chart, 'regionClick', (event) => {
            const countryDropdown = document.querySelector('#countryDrops');
            countryDropdown.value = event.region;
            countryDropdown.dispatchEvent(new Event('change'));
        });
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
    google.charts.load('current', {
        'packages': ['corechart', 'line', 'geochart'],
        'mapsApiKey': 'AIzaSyBPjqMqmYf8a_BmuufiYYl63rIv2obqSV0'
    });
    return {
        drawCovidChart,
        drawCovidMap,
        drawStockChart
    }
}()
