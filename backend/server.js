const express = require('express');
require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


// mongoose.connect('mongodb://localhost:27017/notes', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect('mongodb+srv://saurabhc0102:VpjOXWHPVizEVTyT@notes.i0btqxf.mongodb.net/?retryWrites=true&w=majority&appName=Notes',{ useNewUrlParser: true, useUnifiedTopology: true })

const dbURI = process.env.MONGO_URL;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/notes', require('./routes/notes'));
app.use('/api/users', require('./routes/users'));


// Middleware to authenticate user


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
