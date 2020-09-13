var express = require("express");
var path = require ("path");
var app = express();
var port = process.env.PORT || 3000;
const jsdom = require ('jsdom');
const {JSDOM} = jsdom;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://MONGOADM:MONGOADM@students.fvntv.mongodb.net/students?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true});

client.connect (function (err) {

    if (err) {
        console.log ("Didn't achieve connection...");
    }

    else {
        console.log ("Connected successfully !"); 

        app.post ('/find', function (req, res, next) {
        var promoOuChercher = req.body.promotion;
        client.db ("Students").collection ("IR3").find({}).toArray (function (err, result) {
            if (err)
                throw err;  
            // var divTab = document.createElement ("div");
            /*const dom = new JSDOM ('', 
                {runScripts : "dangerously"})
            .window;

            document = window.document;
            html = document.firstChild;
            content = document.body.appendChild(document.createElement("div"));
            content.id = "divTab";
            content.innerHTML = ``;            

            dom.window.document.body.children.length === 2;*/
            //console.log (result);
            var firstname = req.body.firstname;
            firstname = firstname.charAt(0).toUpperCase();

            var lastname = req.body.lastname;
            lastname = lastname.charAt(0).toUpperCase();

            if (firstname.contains("$") || lastname.contains("$")) {
                app.send ("error, your entries contains some unauthorized caracter");
            }
            else {

                if (lastname == "" && firstname == "") {
                    db.Students().find({promotion : "promotion"});
                }

                else if (lastname == "") {
                    db.Students().find({promotion : req.body.promotion, firstname : firstname});
                }

                else if (firstname == "") {
                    db.Students().find({promotion : req.body.promotion, lastname : lastname});
                }
                
                else {
                    db.Students().find({promotion : req.body.promotion, firstname : firstname, lastname : lastname});
                }

            }
        });

    });//app.post()
    }

   
});
//Access to the files (css and html) in 'public' folder
app.use (express.static (path.join (__dirname, 'public')));

//Get home page
app.get("/", (req, res) => {
    res.sendFile (__dirname + "/public/index.html");
});

app.listen(port, () => {
    console.log("Server listening on port " + port);

});