const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rewardRoutes = require('./routes/reward');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/reward', rewardRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
