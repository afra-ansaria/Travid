const COVIDAPI = function(){
    return {
        /**
         * Returns the past COVID data for the country corresponding
         * to the passed in alpha2 code. Each entry in the response has the following
         * fields:
         * {
         *  country,
         *  last_update,
         *  cases,
         *  deaths,
         *  recovered
         * }
        */
        getPastDataForCountry: (alpha2Code) => {
            return RESTService.get(`https://covid19-api.org/api/timeline/${alpha2Code}`);
        },
        /**
         * Returns the predicted COVID data for the country corresponding
         * to the passed in alpha2 code. Each entry in the response has the following
         * fields:
         * {
         *  country,
         *  date,
         *  cases
         * }
        */
        getPredictedDataForCountry: (alpha2Code) => {
            return RESTService.get(`https://covid19-api.org/api/prediction/${alpha2Code}`);
        },
        /**
         * Returns the countries for which data is available. Each entry in the response 
         * has the following fields (we'll use the alpha2 field to fetch the data for the
         * given country):
         * {
         *  name, 
         *  alpha2,
         *  alpha3,
         *  numeric,
         *  latitude,
         *  longitude
         * }
        */
        getSupportedCountries: () => {
            return RESTService.get('https://covid19-api.org/api/countries');
        }
    }
}()