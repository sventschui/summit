'use strict';

var os = require('os');
var request = require('superagent');

setInterval(function() {
  var ip = os.networkInterfaces().en0[1].address;

  console.log(ip);

  request
    .get('http://10.0.35.69/sellers')
    .

  request
    .post('http://10.0.35.69/seller')
    .send({ name: 'Boba Fett', url: `http://${ip}:3000` })
}, 2000);

console.log();
