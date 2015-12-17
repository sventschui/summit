import express from 'express';
import bodyParser from 'body-parser';
import colors from 'colors';

import feedback from './feedback';
import order from './order';
import vouchers from './vouchers';

const port = process.env.PORT || 3001;
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use(bodyParser.json());
app.use('/feedback', feedback);
app.use('/vouchers', vouchers);
app.use('/order', order);

app.get('/categories', (req, res, next) => {
  res.send([
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
  ]);
  next();
})

console.log(`API Server is listening on 0.0.0.0:${port.toString().red}`.green);

app.listen(port);
