import styles from "./Products.module.scss";
import {
    Filter,
    InfiniteScroll,
    ProductList,
    SearchBar,
    Sort,
} from "@/components";
import { useProducts } from "@/hooks/useProducts";

const Products = () => {
    const {
        displayItems,
        isLoading,
        error,
        pricingOptions,
        priceRange,
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
    } = useProducts();

    return (
        <div className={styles.productsContainer}>
            <SearchBar
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Find the items you're looking for"
                isSearching={isLoading}
            />
            <Filter
                pricingOptions={pricingOptions}
                priceRange={priceRange}
                onPricingToggle={togglePricingOption}
                onPriceRangeChange={handlePriceRangeChange}
                onPriceRangeAfterChange={handlePriceRangeAfterChange}
                onReset={handleResetFilters}
            />
            <Sort
                sortBy={sortBy}
                onSortChange={(value) => setSortBy(value as never)}
                isPaid={pricingOptions.Paid}
                totalItems={totalItems}
            />

            <ProductList
                displayItems={displayItems}
                isLoading={isLoading}
                error={error}
            />

            <InfiniteScroll
                isLoading={isLoading}
                hasMore={hasMore}
                loadNextPage={loadNextPage}
                hasItems={displayItems.length > 0}
            />
        </div>
    );
};

export default Products;
