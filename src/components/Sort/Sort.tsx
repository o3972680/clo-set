import { Col, Divider, Row, Select, Typography } from "antd";
import React from "react";
import styles from "./Sort.module.scss";

const { Option } = Select;
const { Text } = Typography;

export interface SortProps {
    sortBy: string;
    onSortChange: (value: string) => void;
    isPaid: boolean;
    totalItems: number;
}

const Sort: React.FC<SortProps> = ({ sortBy, onSortChange, isPaid, totalItems }) => {
    return (
        <Row className={styles.sortRow}>
            <Col xs={24} md={24} sm={24} lg={24}>
                <div className={styles.sortContainer}>
                    <Text>{totalItems} items</Text>
                    <Divider type="vertical" />
                    <Text strong style={{ marginRight: "10px" }}>
                        Sort by
                    </Text>
                    <Select
                        value={sortBy}
                        onChange={onSortChange}
                        className={styles.sortSelect}
                        bordered={false}
                    >
                        <Option value="Item Name">Item Name</Option>
                        <Option value="Higher Price" disabled={!isPaid}>
                            Higher Price
                        </Option>
                        <Option value="Lower Price" disabled={!isPaid}>
                            Lower Price
                        </Option>
                    </Select>
                </div>
            </Col>
        </Row>
    );
};

export default Sort;
