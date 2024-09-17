const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/save-segment', (req, res) => {
  const { segment_name, schema } = req.body;

  const data = {
    segment_name: segment_name,
    schema: schema,
  };

  const webhookUrl = process.env.REACT_APP_WEBHOOK_URL;

  axios.post(webhookUrl, data)
    .then(response => {
      res.status(200).json({ message: 'Segment sent to webhook successfully!' });
    })
    .catch(error => {
      res.status(500).json({ message: 'Error sending segment to webhook!' });
    });
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
