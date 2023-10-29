const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoute');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch(error => {
  console.error('Error connecting to the database: ', error);
});

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use('/users', userRoutes);
