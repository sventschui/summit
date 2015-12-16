import express from 'express';
import colors from 'colors';
import notifier from 'node-notifier';

const feedback = express();

feedback.post('/', (req, res) => {
  if(req.body.type !== "INFO") {
    notifier.notify({
      'title': '!!!!',
      'message': req.body.content
    });
  }
  console.log(`Got feedback: ${JSON.stringify(req.body).blue}`.red);
  res.end();
});

export default feedback;
