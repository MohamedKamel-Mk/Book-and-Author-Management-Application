import express from 'express';
import mongoose from 'mongoose';

import Book from './models/book.js';
import Author from './models/author.js';

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/book_author_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Book Endpoints
app.post('/books', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

// Author Endpoints
app.post('/authors', async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).send(author);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/authors', async (req, res) => {
  try {
    const authors = await Author.find().populate('books');
    res.send(authors);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/authors/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).populate('books');
    if (!author) {
      return res.status(404).send('Author not found');
    }
    res.send(author);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/authors/:id', async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body).populate('books');
    if (!author) {
      return res.status(404).send('Author not found');
    }
    res.send(author);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/authors/:id', async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).send('Author not found');
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
