export interface ApiItem {
    id: string;
    creator: string;
    title: string;
    pricingOption: number; // 1 = Paid, 2 = Free, 3 = View Only
    imagePath: string;
    price: number;
    priceType: "Free" | "Paid" | "View Only";
    loading?: boolean;
}

// Store
export type PricingOption = "Paid" | "Free" | "View Only";
export type SortOption = "Item Name" | "Higher Price" | "Lower Price";

export interface StoreState {
    // Data
    items: ApiItem[];
    totalItems: number;
    displayItems: ApiItem[];
    hasMore: boolean;
    isLoading: boolean;
    error: string | null;

    // Pagination
    currentPage: number;
    pageSize: number;

    // Filters
    pricingOptions: {
        Paid: boolean;
        Free: boolean;
        "View Only": boolean;
    };
    priceRange: [number, number];
    // Search
    keyword: string;
    // Sorting
    sortBy: SortOption;

    // Actions
    togglePricingOption: (option: PricingOption) => void;
    setPriceRange: (range: [number, number]) => void;
    setKeyword: (keyword: string) => void;
    setSortBy: (sortOption: SortOption) => void;
    resetFilters: () => void;
    fetchInitialItems: () => Promise<void>;
    loadNextPage: () => void;
}
