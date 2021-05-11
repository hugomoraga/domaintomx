const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const dns = require('dns');
var path = require('path');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//setup public folder
app.use(express.static('./public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
  }));


    app.get('/consulta', function (req, res) {
 
        res.render('get');
     
    });  
 



app.post('/consulta', async (req, res, next) => {

    var expression = /[-a-zA-Z0-9()]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    var dominio = req.body.dominio 

    async function runAsync () {
        if (dominio.match(regex)) {
            dns.resolveMx(dominio, (err, addresses) => {
                if (err) { 
                    res.render('error');
                } else {

                let jadd = (addresses)
                servermx = jadd[0].exchange
                res.render('post', {
                   servermx: servermx
                });
            
                }
        });
            
        } else {
            res.render('error');
        }
    }

    runAsync()
    .catch(next)

});


var server = app.listen(8200, function () {
    console.log('Servidor ejecutandose en localhost:8200');
});