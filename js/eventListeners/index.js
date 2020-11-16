const EventListners = function(){
    const countrySelect = document.querySelector('#countryDrops');
    return {
        addListeners: () => {
            window.addEventListener('resize', () => {
                Charts.drawCovidChart();
            });
            countrySelect.addEventListener('change', () => {
                Charts.drawCovidChart();
            })
        }
    }
}()

