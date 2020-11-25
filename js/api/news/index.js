const NewsAPI = function(){
    async function getNewsForTicker(ticker) {
        const url = `${getNewsCatcherUrl()}/stocks`;
        const options = { 
            headers: getNewsCatcherHeaders() 
        };
        const query = getNewsCatcherQueryParameters({
            ticker
        });
        const result = await RESTService.get(url, options, query);
        return processNewsCatcherResult(result);
    }
    async function getNewsForCountry(country) {
        const url = `${getNewsCatcherUrl()}/search`;
        const options = { 
            headers: getNewsCatcherHeaders() 
        };
        const query = getNewsCatcherQueryParameters({ 
            q: `${country} covid`,
            page: "1"
        });
        const result = await RESTService.get(url, options, query);
        return processNewsCatcherResult(result);
    }
   
    function processNewsCatcherResult(result) {
        if (result.status === "ok" && result.articles.length) {
            const sorted = sortByDate(result.articles);
            const deduplicated = removeDuplicates(sorted);
            return deduplicated;
        }
        return [];
    }
    function sortByDate(news) {
        return news.sort((a, b) => {
            return moment(b.published_date).diff(moment(a.published_date));
        })
    }
    function removeDuplicates(news){
        const seen = new Set();
        const result = [];
        news.forEach(entry => {
            if (!seen.has(entry.title.toLowerCase())) {
                seen.add(entry.title.toLowerCase());
                result.push(entry);
            }
        });
        return result;
    }
    function getNewsCatcherUrl() {
        return 'https://newscatcher.p.rapidapi.com/v1';
    }
    function getNewsCatcherHeaders() {
        return {
            "x-rapidapi-key": "3b7ba16705msh2c469e5578dcf6dp132fe6jsnbdafc0ad9499",
            "x-rapidapi-host": "newscatcher.p.rapidapi.com",
            "useQueryString": true
        }
    }
    function getNewsCatcherQueryParameters(query) {
        return {
            sort_by: "relevancy",
            media: "True",
            lang: "en",
            ...query
        }
    }
    return {
        getNewsForTicker,
        getNewsForCountry
    }
}()