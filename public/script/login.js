const firebase = require("firebase");

var firebaseConfig = {
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

function create() {
    // var name     = document.getElementById('name').value
    var email    = document.getElementById('email').value
    var password = document.getElementById('password').value 
    // var create  = document.getElementById('create'); 

    // var url = '/account/create/'+ name + '/' + email + '/' + password

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
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

}

function login() {
    var email    = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;
    var login  = document.getElementById('login'); 
    
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
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

