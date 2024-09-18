const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/save-segment', (req, res) => {
  const { segment_name, schema } = req.body;
console.log('received feilds',segment_name,schema);

  if (!segment_name || !schema) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const data = {
    segment_name: segment_name,
    schema: schema,
  };

  const webhookUrl = process.env.REACT_APP_WEBHOOK_URL || 'https://webhook.site/6b797e98-7e39-4dae-81f9-683ffa5b3b5a';
  console.log('Sending data to webhook:', data);  // Add logging here

  axios.post(webhookUrl, data)
    .then(response => {
      console.log('Webhook response:', response.data);  // Log response from webhook
      res.status(200).json({ message: 'Segment sent to webhook successfully!' });
    })
    .catch(error => {
      console.error('Error sending segment to webhook:', error);  // Log the error
      res.status(500).json({ message: 'Error sending segment to webhook!' });
    });
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
