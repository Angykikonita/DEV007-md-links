const path = require('path');
const fs = require('fs');
const colors = require('colors');
const MarkdownIt = require('markdown-it');
const cheerio = require('cheerio');
const axios = require('axios');

const mdlinks = (pathUser,validate) => {
 return new Promise((resolve, reject) => {

    let absolutePath;
    let mDFounds;
    let mdToHtml;
    let md;
    let url; 
    const links = []
    let objeto;

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
            //console.log(mdToHtml.blue);
            url = mdToHtml;

           
            const $ = cheerio.load(url);
                 $('a').each((index, element) => {
                    const link = $(element).attr('href');
                    if (link[0] !== '#') {
                        const text = $(element).text();
                        objeto = {
                            link:link,
                            text:text,
                            file: absolutePath,
                        };
                    links.push(objeto);    
                    }; 
                   
                });              
            
        }
    
        else{ 
            console.log("no contiene archivos .md" .bgRed);
        }
        }
        else{
        console.log("El archivo NO EXISTE!".bgRed);
        }
      //  console.log(links);

    //const newArray= links[0].link;
    //sololinks.push(newArray);
    //console.log(sololinks);

    links.forEach( function(objeto) {
        
         axios.get(objeto.link)
         .then(function (response) {
           // console.log(response.status)
            if( response.status === 200){
                objeto.status = response.status
                objeto.ok = 'ok'
                //console.log(objeto)

            }
             else if (response.status === 404){
                 objeto.status = response.status
                 objeto.ok = 'fail'
                // console.log(objeto)
                }
            console.log(objeto);
          });
          
    // res ={
    //     status,  ==> 2xx -> OK / 3xx-> OK / 4XX -> ERROR (client) / 5XX -> ERROR (server)
    //     data,
    //     request,
    //      method,
    //    }
    });
 })

 
 };

 mdlinks(process.argv[2]);


