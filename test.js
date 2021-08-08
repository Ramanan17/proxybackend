var axios = require('axios');
var data = JSON.stringify({
  "access_token": "00D3K0000008jZs!AREAQHg6OzonB9vpWNR6xS3giALkwtAAt9b6NWVrcbVZLqVnuQ7wHBEGD6yA0x96XdWhut_.uZ7TgQ4Tho6FfXIouYCw3BEU",
  "instance_url": "https://isfcl--supportbox.my.salesforce.com",
  "id": "https://test.salesforce.com/id/00D3K0000008jZsUAI/0051N000006mtwsQAA",
  "token_type": "Bearer",
  "issued_at": "1614690818676",
  "signature": "aUxqHXO0rdaOWyrxAprDd+EykLXIpD5InXaBftYvH7o="
});

var config = {
  method: 'post',
  url: 'https://test.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9zZht._ZaMullAXCQOH.XHW8VAu6f0AUwLSxRBIR262KzrCx6kiojwlcstrnf9yr7MZClVEwm48eoVh5I&client_secret=E2DC0BF608D51D151BB3A11F3F6FB20F4722632179F4CF68DDB8ED861C66C562&username=prodcopy@indiashelter.in&password=Isfc@1122',
  headers: { 
    'Content-Type': 'application/json', 
    'Cookie': 'BrowserId=TD3QMNrkEeuwNrsvUf_XCA; CookieConsentPolicy=0:0'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
