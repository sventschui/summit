import express from 'express';
import notifier from 'node-notifier';
import request from 'superagent';

const order = express();

const lic = [
  {
    "category": "Weapons",
    "country": "FR",
    "license": "HUNTING"
  },
  {
    "category": "Weapons",
    "country": "UK",
    "license": "HUNTING"
  },
  {
    "category": "Alcohol",
    "country": "UK",
    "license": "OLDER_THAN_21"
  },
  {
    "category": "Alcohol",
    "country": "DE",
    "license": "OLDER_THAN_21"
  },
  {
    "category": "Fishing",
    "country": "CZ",
    "license": "FISHING"
  },
  {
    "category": "Fishing",
    "country": "US",
    "license": "FISHING"
  },
  {
    "category": "Fishing",
    "country": "XE",
    "license": "FISHING"
  }
];

const cats = [
  {
    "name": "Shirt",
    "category": "Clothes"
  },
  {
    "name": "Trouser",
    "category": "Clothes"
  },
  {
    "name": "Jean",
    "category": "Clothes"
  },
  {
    "name": "Glove",
    "category": "Clothes"
  },
  {
    "name": "Socks",
    "category": "Clothes"
  },
  {
    "name": "Shoe",
    "category": "Clothes"
  },
  {
    "name": "Coat",
    "category": "Clothes"
  },
  {
    "name": "Jacket",
    "category": "Clothes"
  },
  {
    "name": "Pyjama",
    "category": "Clothes"
  },
  {
    "name": "Beret",
    "category": "Clothes"
  },
  {
    "name": "Hat",
    "category": "Clothes"
  },
  {
    "name": "Spacesuit for elephant",
    "category": "Clothes"
  },
  {
    "name": "Water gun",
    "category": "Weapons"
  },
  {
    "name": "Wooden sword",
    "category": "Weapons"
  },
  {
    "name": "Stinking cheese",
    "category": "Weapons"
  },
  {
    "name": "Dalek",
    "category": "Weapons"
  },
  {
    "name": "Laser saber",
    "category": "Weapons"
  },
  {
    "name": "Death Star",
    "category": "Weapons"
  },
  {
    "name": "Cheese",
    "category": "Food"
  },
  {
    "name": "Candy",
    "category": "Food"
  },
  {
    "name": "Paella",
    "category": "Food"
  },
  {
    "name": "Tomato",
    "category": "Vegetables"
  },
  {
    "name": "Cucumber",
    "category": "Vegetables"
  },
  {
    "name": "Carrot",
    "category": "Vegetables"
  },
  {
    "name": "Tomato juice",
    "category": "Drinks"
  },
  {
    "name": "Apple juice",
    "category": "Drinks"
  },
  {
    "name": "Diet coke",
    "category": "Drinks"
  },
  {
    "name": "Water",
    "category": "Drinks"
  },
  {
    "name": "Coffee",
    "category": "Drinks"
  },
  {
    "name": "Tea",
    "category": "Drinks"
  },
  {
    "name": "Wine",
    "category": "Alcohol"
  },
  {
    "name": "Beer",
    "category": "Alcohol"
  },
  {
    "name": "Whisky",
    "category": "Alcohol"
  },
  {
    "name": "Fishing rod",
    "category": "Fishing"
  },
  {
    "name": "Worms",
    "category": "Fishing"
  },
  {
    "name": "Net",
    "category": "Fishing"
  }
]

const vouch = [{
  category: "Drinks",
  amount: 10,
},{
  category: "Fishing",
  amount: 50,
},{
  category: "Weapons",
  amount: 100,
},{
  category: "Phones",
  amount: 100,
},{
  category: "Computers",
  amount: 200,
},{
  category: "Cars",
  amount: 1000,
},{
  category: "Planes",
  amount: 20000,
},{
  category: "Houses",
  amount: 20000,
},{
  category: "Boats",
  amount: 20000,
}];

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

  // IP check
  /*if(req.ip !== "::ffff:10.0.34.252" && req.ip !== "::ffff:10.0.35.69" && req.ip !== "::ffff:10.0.34.192") {
    console.log(`got request from ${req.ip}`.magenta);

    notifier.notify({
      'title': '!!!!',
      'message': req.body.content
    });
    res.send({
      ignored: true
    });
    res.end();
    return;
  }*/

  // check for prices and quantities
  if(!req.body.prices || !req.body.quantities) {
    console.log('had no prices or quantities');
    res.send({
      ignored: true
    });
    res.end();
    return;
  }

  // check array lengths
  /*if(req.body.prices.length !== req.body.quantities.length || req.body.prices.length !== req.body.volumes.length) {
    console.log('Prices have diffrent length than quantities'.red, req.body);
    res.send({
      ignored: true
    });
    res.end();
    return;
  }*/

  // sum up
  let total = 0;

  for(let i = 0; i < req.body.prices.length; i++) {
    let price = req.body.prices[i];
    let quantity = req.body.quantities[i];

    total += price * quantity;
  }

  console.log('total', total);

  // calc the taxes
  let tax = taxes[req.body.country];

  if(!tax) {
    console.log('Couldn\'t find tax for county'.red, req.body.country);
    res.send({
      ignored: true
    });
    res.end();
    return;
  }

  let totalWithTaxes = total * (1 + tax);

  console.log('after tax', 1 + tax, totalWithTaxes);

  // Do the reduction
  let reduction = 1;


  if(!req.body.reduction || req.body.reduction === "") {
    reduction = 1;
  } else if(req.body.reduction === "STANDARD") {

    console.log('reducing')

    if(totalWithTaxes >= 50000) {
      reduction = 0.85
    } else if(totalWithTaxes >= 10000) {
      reduction = 0.9
    } else if(totalWithTaxes >= 7000) {
      reduction = 0.93
    } else if(totalWithTaxes >= 5000) {
      reduction = 0.95
    } else if(totalWithTaxes >= 1000) {
      reduction = 0.97
    } else {
      reduction = 1;
    }

  } else if(req.body.reduction === "PAY THE PRICE") {
    reduction = 1;
  } else if(req.body.reduction === "HALF PRICE") {
    reduction = 0.5;
  } else {
    console.log(`Unknown reduction ${req.body.reduction}`)
    res.send({
      ignored: true
    });
    res.end();
    return;
  }

  let totalReduced = totalWithTaxes * reduction;

  let rounded = parseFloat(totalReduced.toFixed(2));

  console.log('after reduction', req.body.reduction, reduction, rounded);

  // categories
  let categories = [];

  for(let i = 0; i < req.body.names.length; i++) {
    let article = req.body.names[i];
    let category = cats.find((itemCat) => {
      return itemCat.name === article;
    });

    if(!category) {
      console.log('found no cat for', article)
      res.status(204);
      res.end();
      return;
    }

    categories.push(category);
  }

  // vouchers
  let foundVouchers = vouch.filter((voucher) => {
    return !!categories.find((cat) => { return cat.category == voucher.category; });
  });

  let voucher = 0;

  if(foundVouchers && foundVouchers.length) {
    voucher = Math.max.apply(null, [0].concat(foundVouchers.map((voucher) => {
      return voucher.amount;
    })));
  }

  // licenses
  let licenses = [];

  lic.forEach((license) => {
    if(license.country == req.body.country && categories.find((cat) => { return cat.category == license.category; })) {
      licenses.push(license.license);
    }
  })

  // boxes
  if(req.body.vip) {
    console.log('Skipping vip');
    res.status(204);
    res.end();
    return;

    request.post('http://10.0.34.179:3000/bin-packing')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(req.body))
      .end((err, packRes) => {
        if(err || !packRes) {
          res.status(204);
          res.end();
          return;
        }

        console.log('pack response', err, packRes.body);

        res.send({
          'ignored': false,
          'total': rounded,
          'voucher': voucher,
          'licenses': licenses,
          'boxes': packRes.body.boxes,
        });

        next();
      })
  } else {
    res.send({
      'ignored': false,
      'total': rounded,
      'voucher': voucher,
      'licenses': licenses,
    });
    next();
  }

});

export default order;
