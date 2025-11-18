import { Col, Empty, Row, Typography } from "antd";
import styles from "./ProductList.module.scss";
import SkeletonCard from "@/components/SkeletonCard/SkeletonCard";
import type { ApiItem } from "@/types";

const { Text } = Typography;

export interface ProductListProps {
    displayItems: ApiItem[];
    isLoading: boolean;
    error: string | null;
}

const ProductList = ({ displayItems, isLoading, error }: ProductListProps) => {
    return (
        <div className={styles.productList}>
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
    );
};

export default ProductList;
