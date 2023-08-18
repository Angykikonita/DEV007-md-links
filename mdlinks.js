const path = require('path');
const fs = require('fs');
const colors = require("colors");

const mdlinks = (pathUser) => {
 return new Promise((resolve, reject) => {
    if(fs.existsSync(pathUser)){
        console.log("El archivo EXISTE!");
        if(path.isAbsolute(pathUser)){
            console.log("es Absoluta".bgGreen);
        } else{
            console.log ("es relativa, convertir a absoluta".bgYellow);
            console.log (path.resolve(pathUser));
        }
        }
        else{
        console.log("El archivo NO EXISTE!".bgRed);
        }
 })
 };

 mdlinks(process.argv[2])