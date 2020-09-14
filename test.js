var express = require("express");
var path = require ("path");
var app = express();
var port = process.env.PORT || 3000;
const jsdom = require ('jsdom');
const {JSDOM} = jsdom;
var util = require('util')

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
        console.log ("Connected successfully!"); 

        app.post ('/find', function (req, res, next) {
        var promoOuChercher = req.body.promotion;

        /*console.log (req.body);
        console.log (req.body.firstname);*/

        var firstname = req.body.firstname;
        firstname.charAt(0).toUpperCase();

        var lastname = req.body.lastname;
        lastname.charAt(0).toUpperCase();

        var db = client.db ("Students").collection("IR3");

        if (firstname.includes("$") || lastname.includes("$")) {
                res.send ("error, your entries contains some unauthorized caracter");
            }
            else {
                    var resultBDD;
                    db.find({promotion : req.body.promotion, firstname : firstname, lastname : lastname}).toArray (function (err, result) {
                        if (err)
                            throw err;
                        else {
                            //parse_answer (result);
                            res.send (result);
                        }
                    });
                }


                /*if (lastname == "" && firstname == "") {
                    db.find({promotion : req.body.promotion}).toArray (function (err, result) {
                        if (err)
                            throw err;
                        else {
                            //parse_answer (result);
                            resultBDD = result;
                            //.send (result);
                        }
                    });
                }

                else if (lastname == "") {
                    resultBDD = db.find({promotion : req.body.promotion, firstname : firstname});
                }

                else if (firstname == "") {
                    resultBDD = db.find({promotion : req.body.promotion, lastname : lastname});
                }
                
                else {

                    resultBDD = db.find({promotion : req.body.promotion, firstname : firstname, lastname : lastname});
                }
                res.send(resultBDD);

            }*/

        
                     

    });//app.post()
    }

   
});//client.connect()
//Access to the files (css and html) in 'public' folder
app.use (express.static (path.join (__dirname, 'public')));

//Get home page
app.get("/", (req, res) => {
    res.sendFile (__dirname + "/public/index.html");
});

/*app.listen(port, process.env.IP, () => {
    console.log("Server listening on port " + port);

});*/

app.listen (process.env.ALWAYSDATA_HTTPD_PORT, process.env.ALWAYSDATA_HTTPD_IP, function(){
    console.log('Server listing at https://alwaysdata.net:%s', port);
});

function parse_answer(json_document) {

    const dom = new JSDOM(``, {
      url: "./public/index.html",
      //url: "http://example.org/",
      //referrer: "https://example.com/",
      contentType: "text/html",
      includeNodeLocations: true,
      storageQuota: 10000000
    });

    var document = dom.document;

    var myDiv = document.getElementById('tab-table');

    var myTable = document.createElement("table");

    var headerTable = document.createElement("tr");

    var thLastname = document.createElement("th");
    thLastname.innerHTML = "Lastname";
    headerTable.appendChild(thLastname);

    var thFirstname = document.createElement("th");
    thFirstname.innerHTML = "Fisrtname";
    headerTable.appendChild(thFirstname);

    var thBirthdate = document.createElement("th");
    thBirthdate.innerHTML = "Birthdate";
    headerTable.appendChild(thBirthdate);

    myTable.appendChild(headerTable);

    json_document.forEach(element => {
        var student = document.createElement("tr");
        
        var tdLastname = document.createElement("td");
        tdLastname.innerHTML = element.lastname;
        student.appendChild(tdLastname);
    
        var tdFirstname = document.createElement("td");
        tdFirstname.innerHTML = element.firstname;
        student.appendChild(tdFirstname);
    
        var tdBirthdate = document.createElement("td");
        tdBirthdate.innerHTML = element.birthdate;
        student.appendChild(tdBirthdate);

        myTable.appendChild(student)
    });

    myDiv.appendChild(myTable)
}

    

    

