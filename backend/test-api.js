import express from 'express';
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

app.listen(5000, () => {
  console.log('Test server running on port 5000');
});