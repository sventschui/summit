import express from 'express';
import colors from 'colors';
import notifier from 'node-notifier';

const vouchers = express();

const vouch = {
  "Drinks": 10,
  "Fishing": 50,
  "Weapons": 100,
  "Phones": 100,
  "Computers": 200,
  "Cars": 1000,
  "Planes": 20000,
  "Houses": 20000,
  "Boats": 20000,
};

vouchers.get('/', (req, res) => {
  res.send(vouch);
  res.end();
});

vouchers.get('/:cat', (req, res) => {
  const cat = req.params.cat;
  const voucher = vouch[cat];

  if(!voucher) {
    res.status(404);
    res.end();
    return;
  }

  res.send({
    category: cat,
    amount: vouch[cat],
  });
})

export default vouchers;
