
export type Category = 'Action' | 'Puzzle' | 'Sports' | 'Arcade' | 'Driving' | 'Strategy' | 'All';

export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  iframeUrl: string;
  category: Category;
  rating?: number;
  isHot?: boolean;
}

export interface AppState {
  searchQuery: string;
  activeCategory: Category;
  favorites: string[];
}
