const CountryDropdown = function(){
    return {
        populate: async () => {
            console.log("dropdown")
            var select = document.getElementById("countryDrops");
            const countryData = await COVIDAPI.getSupportedCountries();
            for(var i = 0; i < countryData.length; i++) {
                var text = countryData[i].name
                var value = countryData[i].alpha2
                var el = document.createElement("option");
                el.textContent = text;
                el.value = value;
                select.appendChild(el);
            }
            select.value = 'US';
        }
    }
}();


