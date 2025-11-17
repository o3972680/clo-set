import { Col, Empty, Row, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import useStoreStore from "@/store/useStore";
import styles from "./Products.module.scss";
import SkeletonCard from "@/components/SkeletonCard/SkeletonCard";
import { Filter, SearchBar, Sort } from "@/components";

const { Text } = Typography;

const Products = () => {
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
    } = useStoreStore();

    const [searchValue, setSearchValue] = useState(keyword);
    const [localPriceRange, setLocalPriceRange] =
        useState<[number, number]>(priceRange);
    const observer = useRef<IntersectionObserver | null>(null);
    const loadingRef = useRef<HTMLDivElement>(null);

    // Setup infinite scrolling
    useEffect(() => {
        const handleObserver = (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && !isLoading && hasMore) {
                loadNextPage();
            }
        };

        observer.current = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "200px",
            threshold: 0.01,
        });

        if (loadingRef.current) {
            observer.current.observe(loadingRef.current);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [isLoading, hasMore, loadNextPage]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchValue !== keyword) {
                setKeyword(searchValue);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchValue, setKeyword, keyword]);

    useEffect(() => {
        if (isLoading) {
            loadingRef.current?.classList.remove("hidden");
        } else {
            loadingRef.current?.classList.add("hidden");
        }
    }, [isLoading]);

    const handlePriceRangeChange = (value: number[]) => {
        setLocalPriceRange(value as [number, number]);
    };

    const handlePriceRangeAfterChange = (value: number[]) => {
        setPriceRange(value as [number, number]);
    };

    const handleResetFilters = () => {
        setSearchValue("");
        setLocalPriceRange([0, 999]);
        resetFilters();
    };

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
                priceRange={localPriceRange}
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

            <div className={styles.productsGrid}>
                {displayItems.length > 0 ? (
                    <Row gutter={[16, 24]}>
                        {displayItems.map((item) => (
                            <Col
                                xs={24}
                                sm={12}
                                md={12}
                                lg={8}
                                xl={6}
                                key={item.id}
                                className={styles.productCol}
                            >
                                <SkeletonCard {...item} />
                            </Col>
                        ))}
                    </Row>
                ) : !isLoading && !error ? (
                    <Empty description="No products found" />
                ) : null}
                {error && (
                    <div className={styles.errorMessage}>
                        <Text type="danger">{error}</Text>
                    </div>
                )}
            </div>
            {hasMore && <div ref={loadingRef} className={styles.sentinel} />}
            {!isLoading && !hasMore && displayItems.length > 0 && (
                <div className={styles.loadFinished}>
                    <Text type="secondary" className={styles.loadFinished}>
                        All data has been loaded
                    </Text>
                </div>
            )}
        </div>
    );
};

export default Products;
