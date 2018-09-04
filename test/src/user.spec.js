const fs = require('../../src/helper/readfile');
const expect = require('chai').expect;

describe('user module', ()=>{
    describe('Read user module ', ()=>{
        it('should retrive no user when there is no regeisted user.', async ()=>{
            //1. Prepare the data
            fs.writeData('./src/data/users.json', []);
            const user = require('../../src/users');

            //2. Call the function under test
            var users = user.getUsersList();
            //3. Assertion or verification.
            expect(users.length).be.equal(0);
        });
        it('should retrive only one user if there is only one regeisted user.',async ()=>{
            //1. Prepare the data
            var newuser =
                {
                    "userName": "sewh",
                    "userLName": "Hunegnaw",
                    "address": {
                        "street": "1000 N 260 st",
                        "city": "shoreline",
                        "state": "WA",
                        "zipcode": "98133"
                    },
                };

            await fs.writeData('./src/data/users.json', []);
                const user = require('../../src/users');
                user.saveUser(newuser);
            //2. Call the function under test
            var listOne = user.getUsersList();
        //3. Assertion or verification.
        expect(listOne.length).to.equal(1);
        expect(listOne[0]).to.deep.equal(newuser);
        }); 
        it('should retrive all users when there is more than one users.',async ()=>{
            //1. prepare the data
            var newuser1 =
                {
                    "userName": "solo",
                    "userLName": "Hunegnaw",
                    "address": {
                        "street": "1000 N 260 st",
                        "city": "shoreline",
                        "state": "WA",
                        "zipcode": "98133"
                    },
                };
            var newuser2 =
                {
                    "userName": "Samson",
                    "userLName": "Hunegnaw",
                    "address": {
                        "street": "1000 N 260 st",
                        "city": "shoreline",
                        "state": "WA",
                        "zipcode": "98133"
                    },
                };
            await fs.writeData('./src/data/users.json', []);
            const user = require('../../src/users');
            user.saveUser(newuser1);   
            user.saveUser(newuser2);

            //2. call the function under test
            var listUsers = user.getUsersList();

            //3. Assertion or verification
            expect(listUsers.length).to.equal(2);

            expect(listUsers).to.deep.include(newuser1);
            expect(listUsers).to.deep.include(newuser2);  
        });
        it('should search by ID when there is not user', ()=>{
            //1. Prepare the data
            fs.writeData('./src/data/users.json', []);
            const user = require('../../src/users');
            //2. call the function under test
            const serarchUser = user.getUserByID('10');
            //3. Assertion or verification
            expect(serarchUser).to.be.undefined;
        });
        it('should search by ID when there is more than one user', ()=>{
            var newuser1 =
                {
                    "userName": "sol",
                    "userLName": "Hunegnaw",
                    "address": {
                        "street": "1000 N 260 st",
                        "city": "shoreline",
                        "state": "WA",
                        "zipcode": "98133"
                    },
                };
            var newuser2 =
                {
                    "userName": "Sam",
                    "userLName": "Hunegnaw",
                    "address": {
                        "street": "1000 N 260 st",
                        "city": "shoreline",
                        "state": "WA",
                        "zipcode": "98133"
                    },
                };
            //1. Prepare the data
            fs.writeData('./src/data/users.json', []);
            const user = require('../../src/users');
            //2. call the function under test
            const idobject1 = user.saveUser(newuser1);
            const idobject2 = user.saveUser(newuser2);
            const serarchUser = user.getUserByID(idobject1.id);
            const serarchUser1 = user.getUserByID(idobject2.id);
            newuser1.id = idobject1.id;
            newuser2.id = idobject2.id;
            //3. Assertion or verification
            expect(serarchUser).to.deep.equal(newuser1);
            expect(serarchUser1).to.deep.equal(newuser2);
        });
        it('should search by ID when there is one user', ()=>{
            //1. Prepare the data
            var UserinfInput =  {
                "userName": "Samson",
                "userLName": "Hunegnaw",
                "address": {
                    "street": "1000 N 260 st",
                    "city": "shoreline",
                    "state": "WA",
                    "zipcode": "98133"
                },
            };

            fs.writeData('./src/data/users.json', []);
            const user = require('../../src/users');
            let idObj = user.saveUser(UserinfInput);
            //2. call the function under test
            const actualUserInf = user.getUserByID(idObj.id);
            //3. Assertion or verification
            UserinfInput.id = idObj.id;
            expect(UserinfInput).to.deep.equal(actualUserInf);
        });
    });
    describe('Create user feature.', ()=>{
        it('should return error message if user value is null', ()=>{
            var userInfInpu = null;
            fs.writeData('./src/data/users.json', []);
            const user = require('../../src/users');
            let idObject = user.saveUser(userInfInpu);
            expect(idObject.message).to.equal('The data should be object and have the required fields.');
        });
        it('should return error message if user value is undefined', ()=>{
            var userInfInpu;
            fs.writeData('./src/data/users.json', []);
            const user = require('../../src/users');
            let idObject = user.saveUser(userInfInpu);
            expect(idObject.message).to.equal('The data should be object and have the required fields.');
        });

        it('should return error message if user last name value is null', ()=>{
            var UserinfInput =  {
                "userName": "Samson",
                "userLName": null,
                "address": {
                    "street": null,
                    "city": null,
                    "state": null,
                    "zipcode": null,
                },
            };
            fs.writeData('./src/data/users.json', []);
            const user = require('../../src/users');
            let idObject = user.saveUser(UserinfInput);
            expect(idObject.message).to.deep.equal('The data should be object and have the required fields.');
        }); 

        it('should add a new user if user first and last name has valid value', ()=>{
            var UserinfInput =  {
                "userName": "Samson",
                "userLName": "Hunegnaw",
                "address": {
                    "street": null,
                    "city": null,
                    "state": null,
                    "zipcode": null,
                },
            };
            fs.writeData('./src/data/users.json', []);
            const user = require('../../src/users');
            let idObject = user.saveUser(UserinfInput);
            let valueUser = user.getUsersList();
            UserinfInput.id = idObject.id; 
            expect(UserinfInput).to.deep.equal(valueUser[0]);
        });     
            
        it('should add a single new user with all user attributes has valid values.', ()=>{
            var UserinfInput =  {
                "userName": "Samson",
                "userLName": "Hunegnaw",
                "address": {
                    "street": "1000 N 260 st",
                    "city": "shoreline",
                    "state": "WA",
                    "zipcode": "98133"
                },
            };

            fs.writeData('./src/data/users.json', []);
            const user = require('../../src/users');
            let idObject = user.saveUser(UserinfInput);
            let listuser = user.getUsersList();
            UserinfInput.id = idObject.id;
            expect(UserinfInput).to.deep.equal(listuser[0]);
        });
        it('should add more that one new users', ()=>{
            var UserinfInput =  {
                "userName": "Samso",
                "userLName": "Hunegnaw",
                "address": {
                    "street": "1000 N 260 st",
                    "city": "shoreline",
                    "state": "WA",
                    "zipcode": "98133"
                },
            };
            var UserinfInput1 =  {
                "userName": "sol",
                "userLName": "Hunegnaw",
                "address": {
                    "street": "1000 N 260 st",
                    "city": "shoreline",
                    "state": "WA",
                    "zipcode": "98133"
                },
            };
            fs.writeData('./src/data/users.json', []);
            const user = require('../../src/users');
            let idobje = user.saveUser(UserinfInput);
            let listuser = user.getUsersList();
            let idobje1 = user.saveUser(UserinfInput1);
            let listuser1 = user.getUsersList();
            UserinfInput.id = idobje.id;
            UserinfInput1.id = idobje1.id;
            expect(UserinfInput).to.deep.equal(listuser[0]);
            expect(UserinfInput1).to.deep.equal(listuser1[1])
        });
    });
});