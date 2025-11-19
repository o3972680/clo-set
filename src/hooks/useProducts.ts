import { useEffect, useState } from "react";
import useStore from "@/store/useStore";

export const useProducts = () => {
    const {
        displayItems,
        isLoading,
        error,
        pricingOptions,
        priceRange,
        keyword,
        sortBy,
        togglePricingOption,
        setPriceRange,
        setKeyword,
        setSortBy,
        resetFilters,
        totalItems,
        hasMore,
        loadNextPage,
    } = useStore();

    const [searchValue, setSearchValue] = useState(keyword);
    const [localPriceRange, setLocalPriceRange] =
        useState<[number, number]>(priceRange);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchValue !== keyword) {
                setKeyword(searchValue);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchValue, setKeyword, keyword]);

    const handlePriceRangeChange = (value: number[]) => {
        setLocalPriceRange(value as [number, number]);
    };

    const handlePriceRangeAfterChange = (value: number[]) => {
        setPriceRange(value as [number, number]);
    };

    const handleResetFilters = () => {
        setLocalPriceRange([0, 999]);
        resetFilters();
    };

    return {
        displayItems,
        isLoading,
        error,
        pricingOptions,
        priceRange: localPriceRange,
        searchValue,
        sortBy,
        totalItems,
        hasMore,

        setSearchValue,
        togglePricingOption,
        handlePriceRangeChange,
        handlePriceRangeAfterChange,
        setSortBy,
        handleResetFilters,
        loadNextPage,
    };
};
