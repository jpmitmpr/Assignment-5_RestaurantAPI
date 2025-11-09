const express = require('express');
const menuRouter = require('./routes/menu');
const { requestLogger } = require('./middlewares/logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);

app.use('/api/menu', menuRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Restaurant API running on http://localhost:${PORT}`);
});
