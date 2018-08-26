const fs = require('fs'); //The keyword require is used in Node.js to import modules.

const getData = (filePath)=>{
    //Read data from json file.
    let rawData =fs.readFileSync(filePath);
    let dataJson = JSON.parse(rawData);

    return dataJson;
}

module.exports = {
    getData: getData
}