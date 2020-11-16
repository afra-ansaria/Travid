const countrySelect = document.querySelector('#countryDrops');

countrySelect.addEventListener('change', (event) => {
    const alpha2Code = event.target.value;
    COVIDAPI
        .getPastDataForCountry(alpha2Code)
        .then(data => {
            console.log(data);
        });
})