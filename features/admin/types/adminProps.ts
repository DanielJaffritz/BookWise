export interface Props extends Partial<Book> {
  type?: 'create' | 'update'
  defaultValues: {
    title: string,
    description: string,
    author: string,
    genre: string,
    rating: number,
    totalCopies: number,
    coverUrl: string
    coverColor: string
    videoUrl: string,
    summary: string
  };
  id: string
}
export interface BookParams {
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  videoUrl: string;
  summary: string;
}
