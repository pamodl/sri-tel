// Mock Payment Gateway (REST)
const express = require('express');
const app = express();
app.use(express.json());

app.post('/pay', (req, res) => {
  res.json({ status: 'success', transactionId: Math.random().toString(36).substr(2, 9) });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Payment Gateway mock running on port ${PORT}`));
