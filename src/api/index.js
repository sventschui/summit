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

console.log(`API Server is listening on 0.0.0.0:${port.toString().red}`.green);

app.listen(port);
