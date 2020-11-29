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
var db = firebase.firestore();

function create() {
  // var name     = document.getElementById('name').value
  var email    = document.getElementById('email').value
  var password = document.getElementById('password').value 
  // var create  = document.getElementById('create'); 

  // var url = '/account/create/'+ name + '/' + email + '/' + password
  if (!email){
    alert("Please enter the email")
    return
  }
  if (!password){
    alert("Please enter the password")
    return
  }

  firebase.auth()
  .createUserWithEmailAndPassword(email, password)
  .then(user => {
        console.log("Create Success")
        console.log(user)
        console.log(user.user.uid)
        const userid = user.user.uid
        // alert("Create Success");

      //   db.collection("watchlists").doc(String(userId)).set({'watchlists':[default_watchlist]})
      //   .then(function() {
      //     console.log("Default Watchlist successfully created!");
      //   }).catch(function(error) {
      //     console.error("Error writing document: ", error);
      // })

        window.location ='dashboard.html'+ '?'+'user='+userid
        console.log(user.user.uid)
        // create.innerHTML = "Create Success"
      }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
    });
   
  // creatDefaultWatchList()

}

function login() {
  var email    = document.getElementById('loginEmail').value;
  var password = document.getElementById('loginPassword').value;
  // var login  = document.getElementById('login'); 
  if (!email){
    alert("Please enter the email")
    return
  }
  if (!password){
    alert("Please enter the password")
    return
  }
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(user => {
      console.log("Login Success")
        console.log(user)
        console.log(user.user.uid)
        var userid = user.user.uid
        window.location ='dashboard.html'+ '?'+'user='+userid
        console.log(user)
        console.log(user.user.uid)
        // login.innerHTML = "Login Success"
      })
  .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
    });
}

function creatDefaultWatchList(){
  console.log("create default watchlist")
  var default_watchlist = {
    'name': 'default',
    'country': 'India',
    'stockId': 'GOOG'
  }
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('user');
  var watchlistsRef = db.collection("watchlists").doc(String(userId))
  watchlistsRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Watchlist exists for the user. Do Nothing");
    } else {
        // doc.data() will be undefined in this case
        // console.log("No such document!");
        console.log("creating new watchlist for the user ", userId)
    watchlistsRef.set({'watchlists':[default_watchlist]})
        .then(function() {
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
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('user');
  console.log("Adding new document to watchlist for user", userId)
  

  var country    = document.getElementById('countryDrops').value
  var ticker = document.getElementById('ticker').value 
  var watchlistName = document.getElementById('watchlistName').value 

    if (!country){
    alert("Please enter the country")
    return
  }
  if (!ticker){
    alert("Please enter the ticker")
    return
  }
  if (!watchlistName){
    alert("Please enter the watchlistName")
    return
  }  
  
  var watchlistObject = {
    'country': country,
    'stockId': ticker,
    'name': watchlistName
  }
  var watchlistRef = db.collection("watchlists").doc(userId);
  console.log("watchlist is ", watchlistRef)
  watchlistRef.update({
    watchlists: firebase.firestore.FieldValue.arrayUnion(watchlistObject)
})
.then(function() {
    console.log("Document is updated");
    alert("Watchlist saved")
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
}

function getAllWatchLists(){
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('user');
  console.log("Get all watchlists for the user ", userId)
  var watchlistRef = db.collection("watchlists").doc(userId);
  var watchlistsData = []
  watchlistRef.onSnapshot(function(doc) {
    if (doc.exists) {
        watchlistsData = doc.data()['watchlists'];
        populatewatchlists(watchlistsData)
    } else {
        // doc.data() will be undefined in this case
        console.log("No watchlists for the user");
    }
})
// .catch(function(error) {
//     console.log("Error getting document:", error);
// });
console.log("Returning watchlist data ", watchlistsData)
return watchlistsData
}

function populatewatchlists(data){
  var select = document.getElementById("watchlistDrops");
  var oldoptions = document.querySelectorAll('#watchlistDrops option')
  oldoptions.forEach(o=>o.remove());
  for(var i = 0; i < data.length; i++) {
            console.log(data[i])
            var opt = data[i].name;
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
        }
        select.value= 'default'
}

function getWatchlistFromName(name){
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('user');
  console.log("getting watchlist for name is ", name)
  var watchlistRef = db.collection("watchlists").doc(userId);
  var watchlistData = []
  watchlistRef.get().then(function(doc) {
    if (doc.exists) {
        watchlistsArr = doc.data()['watchlists'];
        watchlistData = watchlistsArr.find(item => item.name===name)
        console.log("watchlist is ", watchlistData)
    } else {
        console.log("No watchlist for the user");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
  return watchlistData

}

