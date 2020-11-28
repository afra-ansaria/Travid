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
        var userid = user.user.uid
        alert("Create Success");
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

