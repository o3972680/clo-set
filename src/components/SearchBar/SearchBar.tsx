import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Col, Row } from "antd";
import React from "react";
import styles from "./SearchBar.module.scss";

export interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    isSearching?: boolean;
}

const Search: React.FC<SearchBarProps> = ({
    value,
    onChange,
    placeholder = "Search...",
    isSearching = false,
}) => {
    return (
        <Row className={styles.search}>
            <Col xs={24} md={24} sm= {24} lg={24}>
                <Input
                    prefix={
                        isSearching ? <LoadingOutlined /> : <SearchOutlined />
                    }
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={styles.searchInput}
                    allowClear
                    size="large"
                />
            </Col>
        </Row>
    );
};

export default Search;
