const express = require('express');
const app = express();
const port = 3001;


// Dummy POST API
app.post('/otp', (req, res) => {
  console.log('Received request body:', req.body);
  res.json({ message: 'OTP generated', explanation: 'OTP is generated and sent to user', requestBody: req.body });
});
// Dummy GET API
app.get('/otp', (req, res) => {
  res.json({ otp: '123456',valid:true });
});

// Dummy GET API for notify-svc
app.get('/otp-status', (req, res) => {
  res.json({ status: 'OTP sent' });
});

app.listen(port, () => {
  console.log(`OTP service running on port ${port}`);
});
