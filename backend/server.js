const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Note = require('./models/Note');
const User = require('./models/User');
// const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = 'Noteable'; // Use a secure key in production

// mongoose.connect('mongodb://localhost:27017/notes', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb+srv://saurabhc0102:VpjOXWHPVizEVTyT@notes.i0btqxf.mongodb.net/?retryWrites=true&w=majority&appName=Notes',{ useNewUrlParser: true, useUnifiedTopology: true })

// User registration
app.post('/api/register', async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, username, password: hashedPassword });
    await newUser.save();
    res.send({ message: 'User registered successfully' });
});

// User login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, user: { firstName: user.firstName, lastName: user.lastName } });
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', error });
  }
});

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send({ message: 'No token provided' });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// Create note
app.post('/api/notes', authenticateUser, async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content, user: req.userId });
    await note.save();
    res.status(201).send(note);
  } catch (error) {
    res.status(500).send({ message: 'Error creating note', error });
  }
});

// Get notes
app.get('/api/notes', authenticateUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId });
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching notes', error });
  }
});

// Update note
app.put('/api/notes/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const note = await Note.findOneAndUpdate({ _id: id, user: req.userId }, { title, content }, { new: true });
    if (!note) {
      return res.status(404).send({ message: 'Note not found' });
    }
    res.status(200).send(note);
  } catch (error) {
    res.status(500).send({ message: 'Error updating note', error });
  }
});

// Delete note
app.delete('/api/notes/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findOneAndDelete({ _id: id, user: req.userId });
    if (!note) {
      return res.status(404).send({ message: 'Note not found' });
    }
    res.status(200).send({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting note', error });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
