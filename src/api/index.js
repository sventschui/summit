import express from 'express';
import bodyParser from 'body-parser';

import test from './test';

const app = express();

app.use(bodyParser.json());
app.use('/test', test);

export default app;
