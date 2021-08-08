const e = require('express');

var express = require('express'),
    axios = require('axios'),
    app = express();
    bodyParser = require('body-parser')
require('dotenv').config()

const defaulturl = process.env.DEFAULT_TARGET;
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(urlencodedParser);
app.use(jsonParser);
// app.use(function frontControllerMiddlewareExecuted(req, res, next){
//     // console.log('(1) this frontControllerMiddlewareExecuted is executed');
//     console.log(req.body)
//     next();
//   });
  

app.all('*', function (req, res, next) {
    // Set CORS headers: allow all origins, methods, and headers:
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));
    if (req.method === 'OPTIONS') {
        // CORS Preflight
        res.send();
    } else {
        var targetURL = req.header('target')// Target-URL ie. https://example.com or http://example.com
        // console.log(targetURL);
        if (!targetURL) {
            targetURL = defaulturl;
        }
        const Host = targetURL.split("//").length > 1 ? targetURL.split("//")[1]:targetURL;
        const customHeaders = { ...req.headers, Host: Host}
        const config = {
            url: targetURL+req.url,
            method: req.method,
            data: req.body,
            // baseURL: targetURL,
            headers: customHeaders,
            // responseType: 'stream',
        }
        // console.log(config)
        // console.log("request called")
        axios(config)
            .then((response) => {
                // console.log(response)
                // response.data.pipe(res);
                res.status(200).send(response.data)
            })
            .catch((error) => {
                // console.error(error);
                if(error.response){
                    res.status(error.response.status
                        ).send(error.message);
                }
                else{
                    res.status(500).send(error.message);
                }
                // res.send(error.message)
            })
        // request({ url: targetURL + req.url, method: req.method, json: req.body, headers:req.headers},
        //     function (error, response, body) {
        //         if (error) {
        //             console.error('error: ' + response)
        //         }
        //     }).pipe(res);
    }
});

// app.configure(function(){

    // app.use(ur)
//   });

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
    console.log('Proxy server listening on port ' + app.get('port'));
});