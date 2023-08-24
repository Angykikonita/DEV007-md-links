const path = require('path');
const fs = require('fs');
const colors = require('colors');
const MarkdownIt = require('markdown-it');
const cheerio = require('cheerio');
const request = require('request');

const mdlinks = (pathUser) => {
 return new Promise((resolve, reject) => {

    let absolutePath;
    let mDFounds;
    let mdToHtml;
    let md;
    let url;
    let body;

    if(fs.existsSync(pathUser)){
        console.log("El archivo EXISTE!".bgGreen);
        if(path.isAbsolute(pathUser)){
            console.log("es Absoluta".bgGreen);
            absolutePath = pathUser
        } else{
            console.log ("es relativa, convertir a absoluta".bgYellow);
            console.log (path.resolve(pathUser));
            absolutePath = path.resolve(pathUser);
        }
        if(path.extname(absolutePath) === '.md'){
            console.log("se encontraron archivos .md".bgGreen);
            mDFounds = fs.readFileSync(absolutePath,{ encoding: 'utf8', flag: 'r' } );
            md = new MarkdownIt();
            mdToHtml = md.render(mDFounds);
            console.log(mdToHtml.blue);
            url = mdToHtml;
            const $ = cheerio.load(url);
                 $('a').each((index, element) => {
                    const link = $(element).attr('href');
                    console.log(link.green);
                  });
        }
        

        else{ 
            console.log("no contiene archivos .md" .bgRed);
        }
        }
        else{
        console.log("El archivo NO EXISTE!".bgRed);
        }
   
 })
 };

 mdlinks(process.argv[2]);


