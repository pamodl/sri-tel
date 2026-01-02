// Mock Provisioning System (REST)
const express = require('express');
const app = express();
app.use(express.json());

app.post('/activate', (req, res) => {
  res.json({ status: 'activated', details: req.body });
});

app.post('/deactivate', (req, res) => {
  res.json({ status: 'deactivated', details: req.body });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Provisioning System mock running on port ${PORT}`));
