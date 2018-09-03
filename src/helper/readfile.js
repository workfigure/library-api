const fs = require('fs'); //The keyword require is used in Node.js to import modules.

const getData = (filePath)=>{
    //Read data from json file.
    let rawData = fs.readFileSync(filePath);
    
    if(rawData.length == 0){
        return [];
    }
  
    return JSON.parse(rawData);
}

const writeData = async (filePath, data)=>{
    await fs.writeFileSync(filePath, JSON.stringify(data));
}

const writeData = (filePath, data)=>{
    fs.writeFileSync(filePath, JSON.stringify(data));
}

module.exports = {
    getData: getData,
    writeData: writeData
}