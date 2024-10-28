import { type BookType } from '../types/Book';

export abstract class BooksRepository {
  abstract createBook(book: BookType): void;

  abstract getBook(id: string): BookType | undefined;

  abstract getBooks(): BookType[];

  abstract updateBook(book: BookType): void;

  abstract deleteBook(id: string): void;
}