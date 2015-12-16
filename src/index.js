import express from 'express';
import serveStatic from 'serve-static';
import colors from 'colors';

import api from './api';

const app = express();
const port = process.env.PORT || 3000;

app.use('/api', api);

app.use('/', serveStatic('static/'));

console.log(`Server is listening on 0.0.0.0:${port.toString().red}`.green);

app.listen(port)
