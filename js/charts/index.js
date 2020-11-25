
const Charts = function(){
    async function drawCovidChart() {
        const countryDropdown = document.querySelector('#countryDrops');
        const countrySelection = countryDropdown.options[countryDropdown.selectedIndex];
        const countryAlpha2 = countrySelection.value;
        const covidData = await COVIDAPI.getPastDataForCountry(countryAlpha2);
        const covidPredictedData = await COVIDAPI.getPredictedDataForCountry(countryAlpha2);

        const chart_data = new google.visualization.DataTable();
        chart_data.addColumn('string', 'Day');
        chart_data.addColumn('number', 'Cases');
        chart_data.addColumn('number', 'Deaths');
        chart_data.addColumn('number', 'Predictions');
        console.log(covidPredictedData);
        chart_data.addRows(covidData);
        chart_data.addRows(covidPredictedData);

        const options = {
            chart: {
                title: `Total Confirmed COVID-19 Cases & Deaths for ${countrySelection.text}`,
                // subtitle: 'in thousands of people',
                tooltip: {isHtml: true},
            },
            vAxes: {
                    // Adds titles to each axis.
                    0: { title: 'Total Confirmed & Deaths Cases'},
            },
            crosshair: { 
                trigger: 'both',
                orientation: 'vertical'
            }
        };
        const chart = new google.charts.Line(document.getElementById('chart_div'));
        chart.draw(chart_data, google.charts.Line.convertOptions(options));
    }
    google.charts.load('current', { packages: ['corechart', 'line'] });
    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(drawCovidChart);
    return {
        drawCovidChart
    }
}()
