$(document).ready(async function () {
    const user = firebase.auth().currentUser;
    if (user) {
        window.location = 'dashboard.html';  
    } else {
        EventListeners.addAuthEventListeners();
    }
});