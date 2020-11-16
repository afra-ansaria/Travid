function dropdown() {
    console.log("dropdown")
    var select = document.getElementById("countryDrops");
    COVIDAPI.getSupportedCountries()
    .then(data => {
    console.log("COVIDAPI.getSupportedCountries");
    console.log(data);
    for(var i = 0; i < data.length; i++) {
        console.log(data[i])
        var opt = data[i].name;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
})


}

