import express, { Request, Response } from 'express';
import fileMiddleware from '../middleware/file';
import { BookType } from '../types/Book';
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
    fileBook: './public/books/book1.pdf'
  }
];

router.post('/book/upload-book', fileMiddleware.single('fileBookInput'), (req: Request, res: Response) => {
  if (req.file) {
    const { path } = req.file;
    res.json(path);
  } else {
    res.json(null);
  }
});

router.get('/books/:id/download', (req: Request, res: Response, next) => {
  const bookId: string = req.params.id;
  const book: BookType = books.find((book: BookType) => book.id === bookId);

  if (!book) {
    next();
  } else {
    res.download(book.fileBook, err => {
      if (err) {
        console.error(err);
        next(err);
      }
    });
  }
});

export default router;