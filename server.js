var express = require('express'),
    axios = require('axios'),
    app = express();
require('dotenv').config()
const defaulturl = process.env.DEFAULT_TARGET;

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
        const customHeaders = { ...req.headers, host: "test.my.salesforce.com" }
        const config = {
            url: req.url,
            method: req.method,
            data: req.body,
            headers: req.headers,
            baseURL: targetURL,
            headers: req.headers,
            responseType: 'stream',
        }
        axios(config)
            .then((response) => {
                response.data.pipe(res);
            })
            .catch((error) => {
                console.error(error);
            })
        // request({ url: targetURL + req.url, method: req.method, json: req.body, headers:req.headers},
        //     function (error, response, body) {
        //         if (error) {
        //             console.error('error: ' + response)
        //         }
        //     }).pipe(res);
    }
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
    console.log('Proxy server listening on port ' + app.get('port'));
});