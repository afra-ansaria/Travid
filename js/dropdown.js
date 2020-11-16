function dropdown() {
    console.log("dropdown")
    var select = document.getElementById("countryDrops");
    COVIDAPI.getSupportedCountries()
    .then(data => {
    console.log("COVIDAPI.getSupportedCountries");
    console.log(data);
    for(var i = 0; i < data.length; i++) {
        console.log(data[i])
        var text = data[i].name
        var value = data[i].alpha2
        var el = document.createElement("option");
        el.textContent = text;
        el.value = value;
        select.appendChild(el);
    }
})


}

