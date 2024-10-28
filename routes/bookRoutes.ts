import express, { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { type BookType, type CreateBookType } from '../types/Book';
const router = express.Router();

const books: BookType[] = [
  {
    id: '1',
    title: 'Book 1',
    description: 'Описание 1',
    authors: 'Author 1',
    favorite: true,
    fileCover: 'image1.jpg',
    fileName: 'book1.pdf',
    fileBook: './public/books/book1.pdf',
  }
];

router.get('/', (req: Request, res: Response) => {
  res.render('index', { books });
});

router.get('/books/:id', (req: Request, res: Response, next: Function) => {
  const bookId: string = req.params.id;
  const book: BookType = books.find((book: BookType) => book.id === bookId);
  if (!book) {
    next();
  } else {
    res.render('view', { book });
  }
});

router.get('/book/create', (req: Request, res: Response) => {
  const book: CreateBookType = {
    description: '',
    authors: '',
    fileCover: ''
  };
  res.render('create', { book });
});

router.post('/book/create', (req: Request, res: Response, next: Function) => {
  const { title, description, authors, fileCover, fileBook } = req.body;
  const id: string = uuid();
  const fileName: string = fileBook.split('/').pop();
  const newBook: BookType = { id, title, description, authors, favorite: false, fileCover, fileName, fileBook };
  if (!title) {
    res.status(400).render('create', {
      error: 'Title is required',
      book: newBook,
    });
    next();
  } else {
    books.push(newBook);
    res.redirect('/');
  }
});

router.get('/book/update/:id', (req: Request, res: Response, next: Function) => {
  const bookId: string = req.params.id;
  const book: BookType = books.find((book: BookType) => book.id === bookId);
  if (!book) {
    next();
  } else {
    res.render('update', { book });
  }
});

router.post('/book/update/:id', (req: Request, res: Response, next: Function) => {
  const bookId: string = req.params.id;
  const book: BookType = books.find((book: BookType) => book.id === bookId);
  if (!book) {
    next();
  } else {
    const { title, description, authors, fileCover, fileBook } = req.body;
    book.title = title;
    book.description = description;
    book.authors = authors;
    book.fileCover = fileCover;
    book.fileName = fileBook.split('/').pop();
    book.fileBook = fileBook;
    res.redirect('/');
  }
});

export default router;