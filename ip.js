'use strict';

import os from 'os';
import request from 'superagent';

setInterval(function() {
  var ip = os.networkInterfaces().en0[1].address;

  console.log(ip);

  request
    .get('http://10.0.35.69/sellers')
    .end((err, res) => {
     if (!err && res.ok) {
       let boba = res.body.find((item) => {
         return item.name == "Boba Fett";
       });

       let remoteIp = boba.hostname;

       if(remoteIp != ip) {
           request
             .post('http://10.0.35.69/seller')
             .send({ name: 'Boba Fett', url: `http://${ip}:3000` });
       }
     }
   });

}, 2000);

console.log();
