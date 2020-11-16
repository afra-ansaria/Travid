const countrySelect = document.querySelector('#countrySelect');

countrySelect.addEventListener('change', (event) => {
    const alpha2Code = event.target.value;
    COVIDAPI
        .getPastDataForCountry(alpha2Code)
        .then(data => {
            console.log(data);
        })
})