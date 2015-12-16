import express from 'express';
import bodyParser from 'body-parser';
import colors from 'colors';

import test from './test';

const port = process.env.PORT || 3001;
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use(bodyParser.json());
app.use('/test', test);

console.log(`Server is listening on 0.0.0.0:${port.toString().red}`.green);

app.listen(port);
