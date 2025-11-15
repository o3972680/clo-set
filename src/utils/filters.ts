import type { ApiItem, PricingOption, SortOption } from '../types';

export const filterByPricingOptions = (
  items: ApiItem[],
  pricingOptions: Record<PricingOption, boolean>
): ApiItem[] => {
  const hasPricingFilters = Object.values(pricingOptions).some(val => val);
  
  if (!hasPricingFilters) {
    return items;
  }
  
  return items.filter(item => {
    // Map the pricing option number to string type
    const priceType = mapPricingOptionToType(item.pricingOption);
    
    return (
      (pricingOptions.Paid && priceType === 'Paid') ||
      (pricingOptions.Free && priceType === 'Free') ||
      (pricingOptions['View Only'] && priceType === 'View Only')
    );
  });
};


export const filterByPriceRange = (
  items: ApiItem[],
  priceRange: [number, number]
): ApiItem[] => {
  return items.filter(item => {
    const isPaid = mapPricingOptionToType(item.pricingOption) === 'Paid';
    
    if (!isPaid) {
      return true; // Keep non-paid items
    }
    
    const price = item.price || 0;
    return price >= priceRange[0] && price <= priceRange[1];
  });
};

export const filterByKeyword = (
  items: ApiItem[],
  keyword: string
): ApiItem[] => {
  if (!keyword.trim()) {
    return items;
  }
  
  const searchTerm = keyword.toLowerCase();
  
  return items.filter(item => 
    item.title.toLowerCase().includes(searchTerm) ||
    item.creator.toLowerCase().includes(searchTerm)
  );
};

export const sortItems = (
  items: ApiItem[],
  sortBy: SortOption
): ApiItem[] => {
  return [...items].sort((a, b) => {
    if (sortBy === 'Item Name') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'Higher Price') {
      return (b.price || 0) - (a.price || 0);
    } else if (sortBy === 'Lower Price') {
      return (a.price || 0) - (b.price || 0);
    }
    return 0;
  });
};

export const mapPricingOptionToType = (option: number): 'Paid' | 'Free' | 'View Only' => {
  switch (option) {
    case 0: return 'Paid';
    case 1: return 'Free';
    case 2: return 'View Only';
    default: return 'Free';
  }
};

export const applyFiltersAndSort = (
  items: ApiItem[],
  filters: {
    pricingOptions: Record<PricingOption, boolean>;
    priceRange: [number, number];
    keyword: string;
    sortBy: SortOption;
  }
): ApiItem[] => {
  // Apply filters in sequence
  let filteredItems = filterByPricingOptions(items, filters.pricingOptions);
  
  // Only apply price range filter if Paid option is selected
  if (filters.pricingOptions.Paid) {
    filteredItems = filterByPriceRange(filteredItems, filters.priceRange);
  }
  
  filteredItems = filterByKeyword(filteredItems, filters.keyword);
  
  // Apply sorting
  return sortItems(filteredItems, filters.sortBy);
};
