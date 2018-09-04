const fs = require('fs'); //The keyword require is used in Node.js to import modules.
const readfile = require('./helper/readfile');

const uuidv1 = require('uuid/v1');
const userDataPath = './src/data/users.json';

   //1. Read data from json file (contains array type)
let users = readfile.getData(userDataPath);

function getUsersList(){
    let users = readfile.getData(userDataPath);
    return users;
}
function getUserByID(userID){
    let users = readfile.getData(userDataPath);
    var user;
    for(var i=0; i< users.length; i++){
        if(users[i].id == userID){
            user = users[i];
        }
    }
    return user;
}

function saveUser(user){
    let users = readfile.getData(userDataPath);
    let exist = false; // flage
    if (!user || typeof user !== 'object' || !user.userName || !user.userLName){
        return {
            message: 'The data should be object and have the required fields.'
        };
    }

    //Validate the user is already exist or not.
    for(let i=0; i< users.length; i++){
        if(users[i].userName == user.userName 
            && users[i].address.street == user.address.street
            && users[i].address.zipcode == user.address.zipcode){
            exist = true;
        }
    }
 
    if(exist == true){
        return {
            message: 'The user is already exist.'
        };
    }
    
    user.id = uuidv1();
    users.push(user);
    fs.writeFileSync(userDataPath, JSON.stringify(users))

    return {
        id: user.id
    }; 
}

//publicly available methods
module.exports = {
    getUsersList: getUsersList,
    getUserByID: getUserByID,
    saveUser: saveUser
};