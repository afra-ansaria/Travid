var ui = {};

ui.navigation = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#" onclick="defaultModule()">Travid</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#" onclick="loadCreateAccount()">Create Account</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onclick="loadLogin()">Login</a>
          </li>         
        </ul>
      </div>
    </nav>
`;

ui.createAccount = `
    <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
        <div class="card-header">Create Account</div>
        <div class="card-body">
            Email address<br>
            <input type="input" class="form-control" id="email" placeholder="Enter email"><br>
            Password<br>
            <input type="password" class="form-control" id="password" placeholder="Enter password"><br>
            <button type="submit" class="btn" onclick="create()">Create Account</button>
            <div id='create'></div>
        </div>
    </div>
`;

ui.login = `
    <div class="card text-white bg-warning mb-3" style="max-width: 18rem;">
        <div class="card-header">Login</div>
        <div class="card-body">
            Email<br>
            <input type="input" class="form-control" id="loginEmail" placeholder="Enter email"><br>
            Password<br>
            <input type="password" class="form-control" id="loginPassword" placeholder="Enter password"><br>
            <button type="submit" class="btn" onclick="login()">Login</button>
            <div id='login'></div>
        </div>
    </div>
`;

ui.default = `
    <div class="card bg-light mb-3" style="max-width: 18rem;">
      <div class="card-header">BadBank </div>
      <div class="card-body">
        <h5 class="card-title">Travid Dashboard</h5>
        <p class="card-text">Travid Alpha Testing</p>
        <img src="bank.png" class="img-fluid" alt="Responsive image">
      </div>
    </div>
`;


var target     = document.getElementById('target');
var navigation = document.getElementById('navigation');
navigation.innerHTML += ui.navigation;



var loadCreateAccount = function(){
    target.innerHTML = ui.createAccount;
};

var loadLogin = function(){
    target.innerHTML = ui.login;
};

defaultModule();
