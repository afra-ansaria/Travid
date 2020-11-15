const RESTService = function(){
    return {
        get: (url) => {
            return fetch(url)
                .then(response => response.json())
        }
    }
}()