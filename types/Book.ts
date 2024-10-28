export interface BookType {
  id: string;
  title: string;
  description?: string;
  authors?: string;
  favorite?: boolean;
  fileCover?: string;
  fileName?: string;
  fileBook?: string;
}

export type CreateBookType = Pick<BookType, 'description' | 'authors' | 'fileCover'>;