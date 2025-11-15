import { SearchOutlined } from "@ant-design/icons";
import {
    Button,
    Checkbox,
    Col,
    Empty,
    Input,
    Row,
    Select,
    Slider,
    Space,
    Typography,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import type { PricingOption } from "../../store/useStore";
import useStoreStore from "../../store/useStore";
import styles from "./Products.module.scss";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";

const { Title, Text } = Typography;
const { Option } = Select;

const Products = () => {
    const {
        items,
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
        loadMore,
    } = useStoreStore();

    const [searchValue, setSearchValue] = useState(keyword);
    const [localPriceRange, setLocalPriceRange] =
        useState<[number, number]>(priceRange);
    const observer = useRef<IntersectionObserver | null>(null);
    const loadingRef = useRef<HTMLDivElement>(null);

    // Setup infinite scrolling
    // useEffect(() => {
    //     const handleObserver = (entries: IntersectionObserverEntry[]) => {
    //         const target = entries[0];
    //         if (target.isIntersecting && !isLoading && items.length > 0) {
    //             loadMore();
    //         }
    //     };

    //     observer.current = new IntersectionObserver(handleObserver, {
    //         root: null,
    //         rootMargin: "20px",
    //         threshold: 0.1,
    //     });

    //     if (loadingRef.current) {
    //         observer.current.observe(loadingRef.current);
    //     }

    //     return () => {
    //         if (observer.current) {
    //             observer.current.disconnect();
    //         }
    //     };
    // }, [isLoading, items.length, loadMore]);

    // Apply search after debounce
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

    const handlePricingOptionToggle = (option: PricingOption) => {
        togglePricingOption(option);
    };

    const handleSortChange = (value: string) => {
        setSortBy(value as never);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleResetFilters = () => {
        setSearchValue("");
        setLocalPriceRange([0, 999]);
        resetFilters();
    };

    return (
        <div className={styles.productsContainer}>
            <div className={styles.filtersSection}>
                <Row
                    gutter={[24, 16]}
                    align="middle"
                    style={{ minHeight: "4.5rem" }}
                >
                    <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                        <Title level={4}>Pricing Options</Title>
                        <Space direction="horizontal" size="middle">
                            <Checkbox
                                checked={pricingOptions.Paid}
                                onChange={() =>
                                    handlePricingOptionToggle("Paid")
                                }
                            >
                                Paid
                            </Checkbox>
                            <Checkbox
                                checked={pricingOptions.Free}
                                onChange={() =>
                                    handlePricingOptionToggle("Free")
                                }
                            >
                                Free
                            </Checkbox>
                            <Checkbox
                                checked={pricingOptions["View Only"]}
                                onChange={() =>
                                    handlePricingOptionToggle("View Only")
                                }
                                style={{ minWidth: "13rem" }}
                            >
                                View Only
                            </Checkbox>
                        </Space>
                    </Col>

                    {pricingOptions.Paid && (
                        <Col
                            xs={24}
                            sm={24}
                            md={16}
                            lg={12}
                            xl={10}
                            style={{ marginLeft: "10rem" }}
                        >
                            <Title level={4}>Price Range</Title>
                            <div className={styles.sliderContainer}>
                                <Text>${localPriceRange[0]}</Text>
                                <Slider
                                    range
                                    min={0}
                                    max={999}
                                    value={localPriceRange}
                                    onChange={handlePriceRangeChange}
                                    onAfterChange={handlePriceRangeAfterChange}
                                    className={styles.priceSlider}
                                />
                                <Text>${localPriceRange[1]}</Text>
                            </div>
                        </Col>
                    )}

                    <Col
                        xs={24}
                        sm={12}
                        md={8}
                        lg={6}
                        xl={4}
                        style={{
                            marginLeft: "auto",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button onClick={handleResetFilters} type="default">
                            Reset Filters
                        </Button>
                    </Col>
                </Row>

                <Row gutter={[24, 16]} className={styles.searchSortRow}>
                    <Col xs={24} md={12} lg={16}>
                        <Input
                            prefix={<SearchOutlined />}
                            placeholder="Find the items you're looking for"
                            value={searchValue}
                            onChange={handleSearchChange}
                            className={styles.searchInput}
                            allowClear
                            size="large"
                        />
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <div className={styles.sortContainer}>
                            <Text strong style={{ marginRight: "10px" }}>
                                Sort by:
                            </Text>
                            <Select
                                value={sortBy}
                                onChange={handleSortChange}
                                className={styles.sortSelect}
                            >
                                <Option value="Item Name">Item Name</Option>
                                <Option
                                    value="Higher Price"
                                    disabled={!pricingOptions.Paid}
                                >
                                    Higher Price
                                </Option>
                                <Option
                                    value="Lower Price"
                                    disabled={!pricingOptions.Paid}
                                >
                                    Higher Price
                                </Option>
                            </Select>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className={styles.productsGrid}>
                {isLoading ? (
                    <Row gutter={[16, 24]}>
                        {Array(12)
                            .fill(null)
                            .map((_, index) => (
                                <Col
                                    xs={24}
                                    sm={12}
                                    md={12}
                                    lg={8}
                                    xl={6}
                                    key={index}
                                    className={styles.productCol}
                                >
                                    <SkeletonCard isLoading={isLoading} />
                                </Col>
                            ))}
                    </Row>
                ) : items.length > 0 ? (
                    <Row gutter={[16, 24]}>
                        {items.map((item) => (
                            <Col
                                xs={24}
                                sm={12}
                                md={12}
                                lg={8}
                                xl={6}
                                key={item.id}
                                className={styles.productCol}
                            >
                                <SkeletonCard {...item} isLoading={isLoading} />
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
        </div>
    );
};

export default Products;
