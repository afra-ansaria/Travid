// setup server
// YOUR CODE
var express = require('express')
var app = express()

var cors    = require('cors');
app.use(cors());

app.use(express.static('/'))

app.get('/', function(req, res){
    res.send('Hello World!')
})

app.listen(3000, function(){
    console.log("Running on port 3000")
})

