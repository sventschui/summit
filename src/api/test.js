import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send({
    'hello': 'summit',
  });
});

export default app;
