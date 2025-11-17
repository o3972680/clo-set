import { ReloadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Row, Slider, Space, Typography } from "antd";
import React from "react";
import type { PricingOption } from "@/types";
import styles from "./Filter.module.scss";

const { Title, Text } = Typography;

export interface FilterProps {
    pricingOptions: Record<PricingOption, boolean>;
    priceRange: [number, number];
    onPricingToggle: (option: PricingOption) => void;
    onPriceRangeChange: (value: number[]) => void;
    onPriceRangeAfterChange: (value: number[]) => void;
    onReset: () => void;
}

const Filter: React.FC<FilterProps> = ({
    pricingOptions,
    priceRange,
    onPricingToggle,
    onPriceRangeChange,
    onPriceRangeAfterChange,
    onReset,
}) => {
    return (
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
                            onChange={() => onPricingToggle("Paid")}
                        >
                            Paid
                        </Checkbox>
                        <Checkbox
                            checked={pricingOptions.Free}
                            onChange={() => onPricingToggle("Free")}
                        >
                            Free
                        </Checkbox>
                        <Checkbox
                            checked={pricingOptions["View Only"]}
                            onChange={() => onPricingToggle("View Only")}
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
                            <Text>${priceRange[0]}</Text>
                            <Slider
                                range
                                min={0}
                                max={999}
                                value={priceRange}
                                onChange={onPriceRangeChange}
                                onAfterChange={onPriceRangeAfterChange}
                                className={styles.priceSlider}
                            />
                            <Text>${priceRange[1]}</Text>
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
                    <Button
                        onClick={onReset}
                        variant="text"
                        color="default"
                        icon={<ReloadOutlined />}
                    >
                        RESET
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default Filter;
