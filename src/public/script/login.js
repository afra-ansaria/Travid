// const superagent = require('superagent');

function create() {
    var name     = document.getElementById('name').value
    var email    = document.getElementById('email').value
    var password = document.getElementById('password').value 
    var create  = document.getElementById('create'); 

    var url = '/account/create/'+ name + '/' + email + '/' + password

    superagent.get(url)
        .end(function(err, res){
            if(err){
                console.log(err)
                create.innerHTML = 'Invalid Format. Please provide valid data';
            }else{
                console.log(res)
                create.innerHTML = 'Created Successful!';
            }
            setTimeout(function(){ create.innerHTML = '';},3000);
        })

}

function login() {
    var email    = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;  
    var url = '/account/login/' + email + '/' + password;
    var login  = document.getElementById('login'); 
    
    superagent
    .get(url)
    .end(function(err, res){
        if (err) {
            console.log(err);
            login.innerHTML = 'Invalid credentials';
        } else {
            if (res.body){
                console.log(res.body);
                login.innerHTML = 'Login Successful!';
            }
            else{
                console.log('Invalid credentials');
            }
        }
    });
}

