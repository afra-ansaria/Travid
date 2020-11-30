const COVIDAPI = function(){
    function formatDate(date) {
        return moment(new Date(date)).format('MMMM Do')
    }
    function formatPastData(entry) {
        return [
            formatDate(entry.last_update),
            entry.cases,
            entry.deaths,
            null,
        ];
    }
    function formatPredictedData(entry) {
        return [
            formatDate(entry.date),
            null, 
            null,
            entry.cases
        ];
    }
    function formatCountriesData(entry) {
        return {
            name: entry.name,
            alpha2: entry.alpha2
        }
    }
    return {
        getPastDataForCountry: (alpha2Code) => {
            return RESTService
            .get(`https://covid19-api.org/api/timeline/${alpha2Code}`)
            .then(data => {
                return data
                .map(formatPastData)
                .reverse();
            });
        },
        getPredictedDataForCountry: (alpha2Code) => {
            return RESTService
                .get(`https://covid19-api.org/api/prediction/${alpha2Code}`)
                .then(data => {
                    return data
                    .map(formatPredictedData);
                });
        },
        getSupportedCountries: () => {
            return RESTService
            .get('https://covid19-api.org/api/countries')
            .then(data => {
                return data.map(formatCountriesData)
            });
        },
        getPastDataForAllCountries: () => {
            return RESTService
            .get(`https://covid19-api.org/api/status`)
            .then(data => {
                return data
                .map(entry => {
                    return [
                        entry.country,
                        entry.cases
                    ]
                })
            });
        }
    }
}()
