const CountryDropdown = function(){
    return {
        populate: async () => {
            var select1 = document.getElementById("countryDrops");
            var select2 = document.getElementById("countryDrops2");
            const countryData = await COVIDAPI.getSupportedCountries();
            for(var i = 0; i < countryData.length; i++) {
                var text = countryData[i].name
                var value = countryData[i].alpha2
                var el1 = document.createElement("option");
                el1.textContent = text;
                el1.value = value;
                select1.appendChild(el1);

                var el2 = document.createElement("option");
                el2.textContent = text;
                el2.value = value;
                select2.appendChild(el2);
            }
            select1.value = 'US';
            select2.value = 'US';
        }
    }
}();



