interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
}
interface BookCoverProps {
  className?: string;
  variant?: BookCoverVariant;
  coverColor: string;
  coverUrl: string;
}
type BookCoverVariant = 'extraSmall' | 'small' | 'medium' | 'regular' | "wide"

interface BookListProps {
  title: string;
  books: Book[];
  containerClassName?: string;
}
interface BorrowBookParams {
  userId: string
  bookId: string
}
