var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://d2cimtu834sz2x.cloudfront.net/getauthtoken/prod/api.integrator@indiashelter.in/Isfc@2019',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});