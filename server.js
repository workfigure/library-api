var express = require('express');
 
let users = [{
    "id": 100,
    "userName": "Alex",
    "userLName": "sol"
    
},
{ 
    "id": 200,
    "userName": "Han",
    "userLName": "Meles"
}];  

var app = express();


//3. // API Path for user
app.get('/users', function (req, res) {
    res.send(users);
});

app.get('/users/:id', function (req, res) {
    var user;
    //console.log(req.params);
    for(var i=0; i< users.length; i++){
        if(users[i].id == req.params.id){
            user = users[i];
            
        }
    }

    if(!user){
        res.send({message: 'The user is not existing in our system.'});
    }
    res.send(user);
});


//Listen at port 3000
const listen = function () {

    var host = server.address().address
    var port = server.address().port
  
    console.log("Example app listening at http://%s:%s", host, port)
  
  };

var server = app.listen(3000, listen);