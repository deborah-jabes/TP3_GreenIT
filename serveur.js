let http =require('http') //Appel d'un module particulier de node JS
let fs =require('fs') 
let url = require('url')

let server = http.createServer()

server.on('request',function(request, response){ //requete serveur pour écouter sur un port
    var promo = fs.readFileSync('script/IR4.json', 'utf8'); //récupère le json et  le met en string
    var site = fs.readFileSync('index.html','utf-8')
    console.log(promo[0].name);
    });
server.listen(8080);
    /*
    fs.readFileSync('index.html', 'utf8', function(err, data){ // quand le serveur reçoit une requete il lit le fichier index
        if (err) {
            response.writeHead(404)
            response.end("ce fichier n'éxiste pas")
        } else{
            response.writeHead(200,{
            'content-type': 'text/html; charset=utf-8' //type de réponse

            })
            let query = url.parse(request.url, true).query // réqupère dans l'url les infos! et let met dans query 
            if (query.name === undefined){
                response.write('Bonjour anonyme')
            }
            console.log(query.name)
            response.end(data)
        }
    })*/
