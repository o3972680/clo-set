/**
 * Application types
 */

// API response types
export interface ApiItem {
  id: string;
  creator: string;
  title: string;
  pricingOption: number; // 1 = Paid, 2 = Free, 3 = View Only
  imagePath: string;
  price: number;
  priceType: 'Free' | 'Paid' | 'View Only';
}



// Store types
export type PricingOption = 'Paid' | 'Free' | 'View Only';
export type SortOption = 'Item Name' | 'Higher Price' | 'Lower Price';

// Store state interface
export interface StoreState {
  // Data
  totalItems: number;
  isLoading: boolean;
  error: string | null;
  
  // Pagination
  currentPage: number;
  itemsPerPage: number;
  
  // Filters
  pricingOptions: {
    Paid: boolean;
    Free: boolean;
    'View Only': boolean;
  };
  priceRange: [number, number];
  keyword: string;
  sortBy: SortOption;
  
  // Actions
  togglePricingOption: (option: PricingOption) => void;
  setPriceRange: (range: [number, number]) => void;
  setKeyword: (keyword: string) => void;
  setSortBy: (sortOption: SortOption) => void;
  resetFilters: () => void;
  loadMore: () => Promise<void>;
  fetchInitialItems: () => Promise<void>;
}
