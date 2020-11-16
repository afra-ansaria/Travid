const COVIDAPI = function(){
    function formatDate(date) {
        return moment(new Date(date)).format('MMMM Do')
    }
    function formatPastData(entry) {
        return [
            formatDate(entry.last_update),
            entry.cases,
            // entry.deaths
        ]
    }
    function formatPredictedData(entry) {
        return [
            formatDate(entry.date),
            entry.cases
        ]
    }
    function formatCountriesData(entry) {
        return {
            name: entry.name,
            alpha2: entry.alpha2
        }
    }
    return {
        /**
         * Returns the past COVID data for the country corresponding
         * to the passed in alpha2 code. Each entry in the response has the following
         * fields: The return type is [[date, cases]]
        */
        getPastDataForCountry: (alpha2Code) => {
            return RESTService
            .get(`https://covid19-api.org/api/timeline/${alpha2Code}`)
            .then(data => {
                return data
                .slice(0, 7)
                .map(formatPastData)
                .reverse();
            });
        },
        /**
         * Returns the predicted COVID data for the country corresponding
         * to the passed in alpha2 code. The return type is [[date, cases]]
        */
        getPredictedDataForCountry: (alpha2Code) => {
            return RESTService
                .get(`https://covid19-api.org/api/prediction/${alpha2Code}`)
                .then(data => {
                    return data
                    .slice(1, 8)
                    .map(formatPredictedData);
                });
        },
        /**
         * Returns the countries for which data is available. Each entry in the response 
         * has the following fields (we'll use the alpha2 field to fetch the data for the
         * given country). The return type is [{ name, alpha2 }]
        */
        getSupportedCountries: () => {
            return RESTService
            .get('https://covid19-api.org/api/countries')
            .then(data => {
                return data.map(formatCountriesData)
            });
        }
    }
}()