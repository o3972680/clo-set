import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { fetchItems } from "../services/api";
import type { ApiItem } from "../types";
import { mapPricingOptionToType } from "../utils/filters";

export type PricingOption = "Paid" | "Free" | "View Only";
export type SortOption = "Item Name" | "Higher Price" | "Lower Price";

interface StoreState {
    // Data
    items: ApiItem[];
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
        "View Only": boolean;
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

// Create the store
const useStoreStore = create<StoreState>()(
    persist(
        immer((set, get) => ({
            items: [],
            totalItems: 0,
            isLoading: true,
            error: null,
            currentPage: 0,
            itemsPerPage: 20,
            pricingOptions: {
                Paid: false,
                Free: false,
                "View Only": false,
            },
            priceRange: [0, 999],
            keyword: "",
            sortBy: "Item Name",

            togglePricingOption: (option) => {
                set((state) => {
                    state.pricingOptions[option] =
                        !state.pricingOptions[option];
                    state.items = [];
                    state.currentPage = 0;
                });
                if (option === "Paid" && !get().pricingOptions[option]) {
                    set((state) => {
                        state.sortBy = "Item Name";
                    });
                }
                get().fetchInitialItems();
            },

            setPriceRange: (range) => {
                set((state) => {
                    state.priceRange = range;
                    state.items = [];
                    state.currentPage = 0;
                });
                get().fetchInitialItems();
            },

            setKeyword: (keyword) => {
                set((state) => {
                    state.keyword = keyword;
                    state.items = [];
                    state.currentPage = 0;
                });
                get().fetchInitialItems();
            },

            setSortBy: (sortOption) => {
                set((state) => {
                    state.sortBy = sortOption;
                    state.items = [];
                    state.currentPage = 0;
                });
                get().fetchInitialItems();
            },

            resetFilters: () => {
                set((state) => {
                    state.pricingOptions = {
                        Paid: false,
                        Free: false,
                        "View Only": false,
                    };
                    state.priceRange = [0, 999];
                    state.keyword = "";
                    state.items = [];
                    state.currentPage = 0;
                    state.sortBy = "Item Name";
                });
                get().fetchInitialItems();
            },

            // Initial fetch (used on first load and after filter changes)
            fetchInitialItems: async () => {
                const {
                    itemsPerPage,
                    pricingOptions,
                    priceRange,
                    keyword,
                    sortBy,
                } = get();

                set((state) => {
                    state.isLoading = true;
                    state.error = null;
                });

                try {
                    const items = await fetchItems(0, itemsPerPage);

                    // Apply client-side filtering (in a real app, this would be handled by the API)
                    let filteredItems = items || [];
                    filteredItems = filteredItems.map((item) => ({
                        ...item,
                        priceType: mapPricingOptionToType(item.pricingOption),
                    }));

                    // Filter by pricing options if any are selected
                    const hasPricingFilters = Object.values(
                        pricingOptions
                    ).some((val) => val);
                    if (hasPricingFilters) {
                        filteredItems = filteredItems.filter(
                            (item) =>
                                (pricingOptions.Paid &&
                                    item.priceType === "Paid") ||
                                (pricingOptions.Free &&
                                    item.priceType === "Free") ||
                                (pricingOptions["View Only"] &&
                                    item.priceType === "View Only")
                        );
                    }

                    // Filter by price range if Paid option is selected
                    if (pricingOptions.Paid) {
                        filteredItems = filteredItems.filter(
                            (item) =>
                                item.priceType === "Paid" &&
                                item.price >= priceRange[0] &&
                                item.price <= priceRange[1]
                        );
                    }

                    // Filter by keyword
                    if (keyword.trim()) {
                        const searchTerm = keyword.toLowerCase();
                        filteredItems = filteredItems.filter(
                            (item) =>
                                item.title.toLowerCase().includes(searchTerm) ||
                                item.creator.toLowerCase().includes(searchTerm)
                        );
                    }

                    // Apply sorting
                    filteredItems.sort((a, b) => {
                        if (sortBy === "Item Name") {
                            return a.title.localeCompare(b.title);
                        } else if (sortBy === "Higher Price") {
                            return (b.price || 0) - (a.price || 0);
                        } else if (sortBy === "Lower Price") {
                            return (a.price || 0) - (b.price || 0);
                        }
                        return 0;
                    });

                    set((state) => {
                        state.items = filteredItems;
                        state.totalItems = filteredItems.length;
                        state.currentPage = 0;
                        state.isLoading = false;
                    });
                } catch (error) {
                    set((state) => {
                        state.error =
                            error instanceof Error
                                ? error.message
                                : "Unknown error occurred";
                        state.isLoading = false;
                    });
                }
            },

            // Fetch more items (for infinite scrolling)
            loadMore: async () => {
                const {
                    isLoading,
                    currentPage,
                    itemsPerPage,
                    pricingOptions,
                    priceRange,
                    keyword,
                    sortBy,
                } = get();

                if (isLoading) return;

                set((state) => {
                    state.isLoading = true;
                    state.error = null;
                });

                try {
                    const nextPage = currentPage + 1;
                    const items = await fetchItems(nextPage, itemsPerPage);

                    // Apply client-side filtering (in a real app, this would be handled by the API)
                    let filteredItems = items || [];
                    filteredItems = filteredItems.map((item) => ({
                        ...item,
                        priceType: mapPricingOptionToType(item.pricingOption),
                    }));

                    // Filter by pricing options if any are selected
                    const hasPricingFilters = Object.values(
                        pricingOptions
                    ).some((val) => val);
                    if (hasPricingFilters) {
                        filteredItems = filteredItems.filter(
                            (item) =>
                                (pricingOptions.Paid &&
                                    item.priceType === "Paid") ||
                                (pricingOptions.Free &&
                                    item.priceType === "Free") ||
                                (pricingOptions["View Only"] &&
                                    item.priceType === "View Only")
                        );
                    }

                    // Filter by price range if Paid option is selected
                    if (pricingOptions.Paid) {
                        filteredItems = filteredItems.filter(
                            (item) =>
                                item.priceType === "Paid" &&
                                item.price >= priceRange[0] &&
                                item.price <= priceRange[1]
                        );
                    }

                    // Filter by keyword
                    if (keyword.trim()) {
                        const searchTerm = keyword.toLowerCase();
                        filteredItems = filteredItems.filter(
                            (item) =>
                                item.title.toLowerCase().includes(searchTerm) ||
                                item.creator.toLowerCase().includes(searchTerm)
                        );
                    }

                    // Apply sorting
                    filteredItems.sort((a, b) => {
                        if (sortBy === "Item Name") {
                            return a.title.localeCompare(b.title);
                        } else if (sortBy === "Higher Price") {
                            return (b.price || 0) - (a.price || 0);
                        } else if (sortBy === "Lower Price") {
                            return (a.price || 0) - (b.price || 0);
                        }
                        return 0;
                    });

                    set((state) => {
                        // Add filtered items to existing items in the store
                        console.log("filtered items:", filteredItems);

                        state.items = [...state.items, ...filteredItems];
                        // Update total items count based on all available items
                        state.totalItems = state.items.length;
                        state.currentPage = nextPage;
                        state.isLoading = false;
                    });
                } catch (error) {
                    set((state) => {
                        state.error =
                            error instanceof Error
                                ? error.message
                                : "Unknown error occurred";
                        state.isLoading = false;
                    });
                }
            },
        })),
        {
            name: "clo-set-store",
            // Only persist partial items, including the filter and sort settings
            partialize: (state) => ({
                pricingOptions: state.pricingOptions,
                priceRange: state.priceRange,
                keyword: state.keyword,
                sortBy: state.sortBy,
            }),
        }
    )
);

export default useStoreStore;
