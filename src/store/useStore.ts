import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { fetchItems } from "../services/api";
import { mapPricingOptionToType } from "../utils/filters";
import type { StoreState } from "@/types";

// Create the store
const useStoreStore = create<StoreState>()(
    persist(
        immer((set, get) => ({
            items: [],
            displayItems: [],
            totalItems: 0,
            hasMore: true,
            isLoading: false,
            error: null,
            currentPage: 1,
            pageSize: 8,
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
                });
                get().fetchInitialItems();
            },

            setKeyword: (keyword) => {
                set((state) => {
                    state.keyword = keyword;
                });
                get().fetchInitialItems();
            },

            setSortBy: (sortOption) => {
                set((state) => {
                    state.sortBy = sortOption;
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
                    state.currentPage = 1;
                });
                get().fetchInitialItems();
            },

            // Initial fetch (used on first load and after filter changes)
            fetchInitialItems: async () => {
                const {
                    pricingOptions,
                    priceRange,
                    keyword,
                    sortBy,
                    isLoading,
                } = get();

                if (isLoading) return;

                set((state) => {
                    state.isLoading = true;
                    state.error = null;
                    state.displayItems = [];
                });

                try {
                    const items = await fetchItems();

                    let filteredItems = items || [];
                    filteredItems = filteredItems.map((item) => ({
                        ...item,
                        priceType: mapPricingOptionToType(item.pricingOption),
                        loading: false,
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
                                (item.priceType === "Paid" &&
                                    item.price >= priceRange[0] &&
                                    item.price <= priceRange[1]) ||
                                (pricingOptions.Free &&
                                    item.priceType === "Free") ||
                                (pricingOptions["View Only"] &&
                                    item.priceType === "View Only")
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

                    const filteredTotal = filteredItems.length;
                    set((state) => {
                        state.totalItems = filteredTotal;
                    });

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

                    console.log("filteredItems ", filteredItems);

                    set((state) => {
                        state.items = filteredItems;
                        state.currentPage = 0;
                        state.isLoading = false;
                    });
                    get().loadNextPage();
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
            loadNextPage: () => {
                const { currentPage, pageSize: itemsPerPage, items } = get();

                set({ isLoading: true });
                const nextPage = currentPage + 1;
                const startIndex = (nextPage - 1) * itemsPerPage;
                const endIndex = Math.min(
                    startIndex + itemsPerPage,
                    items.length
                );
                const nextPageData = items
                    .slice(startIndex, endIndex)
                    .map((item) => ({ ...item, loading: true }));
                console.log("nextPageData ", nextPageData);
                set((state) => ({
                    displayItems: [...state.displayItems, ...nextPageData],
                }));

                setTimeout(() => {
                    set((state) => ({
                        displayItems: state.displayItems.map((item) =>
                            nextPageData.some(
                                (loadingItem) => loadingItem.id === item.id
                            )
                                ? { ...item, loading: false }
                                : item
                        ),
                        currentPage: nextPage,
                        hasMore: endIndex < items.length,
                        isLoading: false,
                    }));
                }, 1000);
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
