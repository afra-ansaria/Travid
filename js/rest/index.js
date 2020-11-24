const RESTService = function(){
    function addQueryParameters(url, query) {
        let _url = url;
        const queryKeys = Object.keys(query);
        if (queryKeys.length !== 0) {
            _url += '?';
            queryKeys.forEach((queryKey, index) => {
                _url += `${index !== 0 ? '&' : ''}${queryKey}=${query[queryKey]}`;
            });
        }
        return _url;
    }
    return {
        get: (url, options = {}, query = {}) => {
            const _url = addQueryParameters(url, query);
            return fetch(_url, options)
                .then(response => response.json());
        }
    }
}()