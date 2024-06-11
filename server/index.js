const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');
const fs = require('fs');
const https = require('https');
const path = require('path')

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(cors());


app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);

app.get('/', (req, res) => {
  res.send('7 Up 7 Down Game API');
});


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
};

connectDB();


const options = {
   key: fs.readFileSync(path.join(__dirname, '/private.key')),
    cert: fs.readFileSync(path.join(__dirname, '/certificate.crt')),
    ca: fs.readFileSync(path.join(__dirname, '/ca_bundle.crt')) 
};


https.createServer(options, app).listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
