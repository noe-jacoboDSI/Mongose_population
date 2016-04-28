"use strict";

var express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');


//var db = pmongo(connectionString, [collections]);

var port = process.env.PORT || 8080;
var ip = process.env.IP || '0.0.0.0';
var addr = `${ip}:${port}`;



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

//calculate o hace falta llamarlo con el .js .
const calculate = require('./models/calculate');

app.get('/', (request, response) => {
  response.render('index',{title : 'Comma Separated Value Analyze (CSV) myApp with Ajax', error:"" })
});

app.get('/csv', (request, response) => {
    response.send({ "rows": calculate(request.query.input) });
});

const Entrada = require('./models/dbMongo');
console.log("JUSTO DESPUES DEL REQUIRE ENTRADA");
    
    
app.get('/entrada', function(request, response) {
       
        Entrada.find({}, function(err, entradas) {
             if (err)
                return err;
            if (entradas.length >= 4) {
                Entrada.find({ name: entradas[3].name }).remove().exec();
            }
        });
       
        let input = new Entrada({
        "name": request.query.name,//"name": "jijio",
        "content": request.query.content//"content":"eii"
        });
        
        console.log(`${input}`);
   
        Entrada.create(input, function (err, x) {
            if (err) {
                console.log(`Hubieron errores:\n${err}`);
                return err;
                }else{
                console.log(`Saved promesa3: ${x}`);
                }
        });
   
        input.save(function(err) {
            if (err) {
                console.log(`Hubieron errores:\n${err}`);
                return err;
            }else{
                console.log(`Guardado: ${input}`);
            }
            
        });
     
     
});
    
    app.listen(port,ip,function(){
    console.log(`chat server listening at ${addr,ip}`);
});