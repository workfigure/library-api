const fs = require('fs');

let userrawdata = fs.readFileSync('./src/data/users.json');  
let users = JSON.parse(userrawdata);

function getUsersList(){
    return users
}

function getUserByID(userID){
    var user;
    for(var i=0; i< users.length; i++){
        if(users[i].id == userID){
            user = users[i];
        }
    }
    return user;
}

module.exports = {
    getUsersList: getUsersList,
    getUserByID: getUserByID
};
