const express = require('express');
const axios = require('axios');
const app = express();
const port = 3002;

// Existing dummy GET API that requests OTP status from otp-svc
app.get('/notify', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3001/otp-status');
    res.json({ message: 'Notification sent', otpStatus: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get OTP status' });
  }
});

// New dummy GET API to be requested by user-svc
app.get('/notification-status', (req, res) => {
  res.json({ status: 'Notification service is running' });
});

app.listen(port, () => {
  console.log(`Notify service running on port ${port}`);
});
