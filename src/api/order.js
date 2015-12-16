import express from 'express';
import notifier from 'node-notifier';

const order = express();

const taxes = {
  "DE": 0.20,
  "UK": 0.21,
  "FR": 0.20,
  "IT": 0.25,
  "ES": 0.19,
  "PL": 0.21,
  "RO": 0.20,
  "NL": 0.20,
  "BE": 0.24,
  "EL": 0.20,
  "CZ": 0.19,
  "PT": 0.23,
  "HU": 0.27,
  "SE": 0.23,
  "AT": 0.22,
  "BG": 0.21,
  "DK": 0.21,
  "FI": 0.17,
  "SK": 0.18,
  "IE": 0.21,
  "HR": 0.23,
  "LT": 0.23,
  "SI": 0.24,
  "LV": 0.20,
  "EE": 0.22,
  "CY": 0.21,
  "LU": 0.25,
  "MT": 0.20,
};

const reductions = {
  50000: 0.15,
  10000: 0.10,
  7000: 0.07,
  5000: 0.05,
  1000: 0.03,
};

order.post('/', (req, res, next) => {

  let date = new Date().toString();

  console.log(`Handling request ${date.white}: ${JSON.stringify(req.body)}`)

  if(req.ip !== "::ffff:10.0.35.69" && req.ip !== "::ffff:10.0.34.192") {
    console.log(`got request from ${req.ip}`.magenta);

    notifier.notify({
      'title': '!!!!',
      'message': req.body.content
    });
    res.rend();
    return;
  }


  var total = 0;

  if(req.body.prices.length !== req.body.quantities.length) {
    console.log('Prices have diffrent length than quantities'.red, req.body);
    res.end();
    return;
  }

  for(let i = 0; i < req.body.prices.length; i++) {
    let price = req.body.prices[i];
    let quantity = req.body.quantities[i];

    total += price * quantity;
  }

  console.log('total', total);

  let tax = taxes[req.body.country];

  if(!tax) {
    console.log('Couldn\'t find tax for county'.red, request.body.country);
    res.end();
    return;
  }

  total = total * (1 + tax);

  console.log('after tax', 1 + tax, total);
  let reduction = 1;

  if(req.body.reduction === "STANDARD") {

    if(total >= 50000) {
      reduction = 0.85
    } else if(total >= 10000) {
      reduction = 0.9
    } else if(total >= 7000) {
      reduction = 0.93
    } else if(total >= 5000) {
      reduction = 0.95
    } else if(total >= 1000) {
      reduction = 0.97
    } else {
      reduction = 1;
    }

    total = total * reduction;

  }

  let rounded = parseFloat(total.toFixed(2));

  console.log('after reduction', req.body.reduction, reduction, rounded);

  res.send({
    'ignored': false,
    'total': rounded,
  });

  next();
});

export default order;
