const path = require('path');
const fs = require('fs');
const colors = require('colors');

const mdlinks = (pathUser) => {
 return new Promise((resolve, reject) => {
    let absolutePath;
    if(fs.existsSync(pathUser)){
        console.log("El archivo EXISTE!");
        if(path.isAbsolute(pathUser)){
            console.log("es Absoluta".bgGreen);
            absolutePath = pathUser
        } else{
            console.log ("es relativa, convertir a absoluta".bgYellow);
            console.log (path.resolve(pathUser));
            absolutePath = path.resolve(pathUser);
        }
        if(path.extname(absolutePath) === '.md'){
         console.log("se encontraron archivos .md".bgMagenta)
        }
        else{ 
            console.log("no es un archivo .md" .bgCyan)
        }
        }
        else{
        console.log("El archivo NO EXISTE!".bgRed);
        }
   
 })
 };

 mdlinks(process.argv[2])