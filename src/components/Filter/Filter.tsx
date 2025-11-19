import { ReloadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Row, Slider, Space, Typography } from "antd";
import React from "react";
import type { PricingOption } from "@/types";
import styles from "./Filter.module.scss";

const { Text } = Typography;

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
            <Row align="middle" style={{ minHeight: "4em" }}>
                <Col>
                    <Space direction="horizontal" size="middle">
                        <Text>Pricing Options</Text>
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
                        >
                            View Only
                        </Checkbox>
                    </Space>
                </Col>

                {
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <div className={styles.sliderContainer}>
                            <Text disabled={!pricingOptions.Paid}>
                                ${priceRange[0]}
                            </Text>
                            <Slider
                                range
                                min={0}
                                max={999}
                                value={priceRange}
                                onChange={onPriceRangeChange}
                                onAfterChange={onPriceRangeAfterChange}
                                className={styles.priceSlider}
                                disabled={!pricingOptions.Paid}
                            />
                            <Text disabled={!pricingOptions.Paid}>
                                ${priceRange[1]}
                            </Text>
                        </div>
                    </Col>
                }

                <Col
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
