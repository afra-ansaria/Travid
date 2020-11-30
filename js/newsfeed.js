const NewsFeed = function() {
    async function populateNewsFeed() {
        clearNewsFeed();
        const countryDropdown = document.querySelector('#countryDrops');
        const countrySelection = countryDropdown.options[countryDropdown.selectedIndex];
        const country = countrySelection.text;
        const newsFeedTitle = document.querySelector('#news-feed-title');
        const news = await NewsAPI.getNewsForCountry(country);
        news.forEach(entry => {
            addToNewsFeed(entry);
        });
        newsFeedTitle.textContent = `Relevant News For ${country}`;

    }
    function addToNewsFeed({ author, link, media, published_date, title }) {
        const newsFeed = document.querySelector('#news-feed');
        const template = document.querySelector('#news-feed-template');
        const newsFeedElement = template.content.cloneNode(true);
        const newsFeedElementImage = newsFeedElement.querySelector('#news-image');
        const newsFeedElementLink = newsFeedElement.querySelector('#news-link');
        const newsFeedElementTitle = newsFeedElement.querySelector('#news-title');
        const newsFeedElementMeta = newsFeedElement.querySelector('#news-meta');
        newsFeedElementImage.src = media || "plugins/images/travidlogo.png";
        newsFeedElementLink.href = link;
        newsFeedElementTitle.textContent = title;
        newsFeedElementMeta.textContent = [author, moment(published_date).format(' Do MMMM, YYYY')].filter(meta => meta).join(' | ');
        newsFeed.appendChild(newsFeedElement);
    }
    function clearNewsFeed() {
        const newsFeedElement = document.querySelector('#news-feed');
        newsFeedElement.innerHTML = "";
    }
    return {
        populateNewsFeed
    }
}()