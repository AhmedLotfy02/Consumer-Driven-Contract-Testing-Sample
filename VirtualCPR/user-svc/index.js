const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

// Existing dummy POST API that requests OTP service
// app.post('/request-otp', async (req, res) => {
//   try {
//     const response = await axios.post('http://localhost:3001/otp');
//     res.json({ message: 'OTP requested', otpResponse: response.data });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to request OTP' });
//   }
// });
app.post('/request-otp', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:3001/otp', req.body);
    res.json({ message: 'OTP requested', otpResponse: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to request OTP' });
  }
});
// Existing dummy GET API that requests OTP service
app.get('/get-otp', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3001/otp');
    res.json({ message: 'OTP retrieved', otp: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve OTP' });
  }
});


// New dummy GET API that requests a new endpoint in Notify service
app.get('/notification-status', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3002/notification-status');
    res.json({ message: 'Notification status retrieved', notifyStatus: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve notification status' });
  }
});

app.listen(port, () => {
  console.log(`User service running on port ${port}`);
});
