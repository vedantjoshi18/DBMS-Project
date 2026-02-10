export interface Event {
  id: number;
  title: string;
  date: string;
  category: string;
  price: number;
  description: string;
  image: string;
  isFeatured?: boolean;
  status: 'open' | 'sold-out' | 'cancelled';
}