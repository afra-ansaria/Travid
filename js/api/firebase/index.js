const FirebaseAPI = function(){
    const firebaseConfig = {
        apiKey: "AIzaSyAhAjwI_yeZ-QCc9rWBM9mBExoctiXuEss",
        authDomain: "travid-1125.firebaseapp.com",
        databaseURL: "https://travid-1125.firebaseio.com",
        projectId: "travid-1125",
        storageBucket: "travid-1125.appspot.com",
        messagingSenderId: "574775587743",
        appId: "1:574775587743:web:ebcf90eb48d9fd1c2943aa",
        measurementId: "G-1X5BR5F2WH"
    };
      
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
      
    function signUp(email, password) {
        if (!email){
          alert("Please enter an email!");
          return;
        }
        if (!password){
          alert("Please enter a password!");
          return;
        }
        firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            console.log("Sign-up successful")
            window.location ='dashboard.html'
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
              } else {
                alert(errorMessage);
              }
              console.log(error);
        });  
    }
      
    function login(email, password) {
        if (!email){
          alert("Please enter the email!");
          return
        }
        if (!password){
          alert("Please enter the password!");
          return
        }
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log("Login successful")
            window.location ='dashboard.html'
         }).catch(function(error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
              } else {
                alert(errorMessage);
              }
              console.log(error);
          });
    }
      
    function createDefaultWatchList(){
        console.log("Creating default watchlist")
        const default_watchlist = {
          'name': 'default',
          'country': 'US',
          'stockId': 'SPY',
          'country_alpha': 'US'
        }
        const userId = firebase.auth().currentUser.uid;
        const watchlistsRef = db.collection("watchlists").doc(String(userId))
        return watchlistsRef
        .get()
        .then((doc) => {
          if (doc.exists) {
              console.log("Watchlist exists for the user. Do nothing");
          } else {
            console.log("Creating new watchlist for user ", userId);
            watchlistsRef.set({ 'watchlists': [default_watchlist] })
            .then(() => {
                console.log("Default Watchlist successfully created!");
            }).catch(function(error) {
                console.error("Error writing document: ", error);
            })
          }
        }).catch(function(error) {
          console.log("Error getting document:", error);
        });
    }
      
    function addToWatchList() {
        const userId = firebase.auth().currentUser.uid;
        console.log("Adding new document to watchlist for user", userId)
        const country    = document.getElementById('countryDrops').value
        const ticker = document.getElementById('ticker').value;
        const watchlistName = document.getElementById('watchlistName').value;
        if (!country) {
          alert("Please enter the country!");
          return;
        }
        if (!ticker) {
          alert("Please enter the ticker!");
          return;
        }
        if (!watchlistName) {
          alert("Please enter the watch list name!");
          return
        }  
        const watchlistObject = {
          'country': country,
          'stockId': ticker,
          'name': watchlistName
        }
        const watchlistRef = db.collection("watchlists").doc(userId);
        return watchlistRef
        .update({
          watchlists: firebase.firestore.FieldValue.arrayUnion(watchlistObject)
        }).then(() => {
            alert("Watch list saved!")
        }).catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
      
    function getAllWatchLists(){
        const userId = firebase.auth().currentUser.uid;
        console.log("Get all watchlists for the user ", userId)
        const watchlistRef = db.collection("watchlists").doc(userId);
        watchlistRef
        .get()
        .then((doc) => {
            if (doc.exists) {
                populatewatchlists(doc.data()['watchlists']);
            } else {
                console.log("No watchlists for the user");
            }
        });
    }

    function populatewatchlists(data){
        const select = document.getElementById("watchlistDrops");
        const oldoptions = document.querySelectorAll('#watchlistDrops option')
        oldoptions.forEach(o=>o.remove());
        for(var i = 0; i < data.length; i++) {
            const opt = data[i].name;
            const el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
        }
        select.value= 'default';
    }
      
    function getWatchlistFromName(name, callback){
        const userId = firebase.auth().currentUser.uid
        console.log("Getting watchlist with name ", name, " for user", userId);    
        const watchlistRef = db.collection("watchlists").doc(userId);
        const watchlistData = [];
        watchlistRef.get().then((doc) => {
          if (doc.exists) {
              watchlistsArr = doc.data()['watchlists'];
              watchlistData = watchlistsArr.find(item => item.name===name)
              console.log("watchlist is ", watchlistData)
              console.log("Setting tickers")
              callback({stockId: watchlistData['stockId'], country: watchlistData['country']})
          } else {
              console.log("No watchlist for the user");
              callback()
          }
        }).catch(function(error) {
            console.log("Error getting document:", error);
            callback()
        });
    }

    return {
        signUp,
        login,
        createDefaultWatchList,
        getAllWatchLists,
        getWatchlistFromName,
        addToWatchList
    }
}();
