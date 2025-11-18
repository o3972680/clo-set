import { Button, Card, Skeleton, Typography } from "antd";
import styles from "./SkeletonCard.module.scss";
import Meta from "antd/es/card/Meta";
import Cart from "@/assets/cart.svg?react";
import Icon from "@ant-design/icons";
import type { ApiItem } from "@/types";

const SkeletonCard = (props: ApiItem) => {
    const { loading, title, creator, imagePath, price, priceType } = props;
    if (loading) {
        return (
            <Card
                hoverable
                cover={
                    <div className={styles.cardImgContainer}>
                        <Skeleton.Image active className={styles.skeletonImg} />
                    </div>
                }
                className={styles.productCard}
            >
                <div>
                    <Skeleton active paragraph={{ rows: 1 }} />
                </div>
            </Card>
        );
    }

    return (
        <Card
            hoverable
            cover={
                <div className={styles.cardImgContainer}>
                    <img alt={title} src={imagePath} />
                    <Button
                        className={styles.cartIcon}
                        shape="circle"
                        icon={<Icon component={Cart} />}
                    />
                </div>
            }
            className={styles.productCard}
        >
            <Meta
                description={
                    <div className={styles.cardMeta}>
                        <div className={styles.leftDesc}>
                            <Typography.Text>{title}</Typography.Text>
                            <div className={styles.userName}>{creator}</div>
                        </div>
                        <div className={styles.priceTag}>
                            {priceType === "Paid" ? (
                                <span>${price}</span>
                            ) : (
                                <span>{priceType}</span>
                            )}
                        </div>
                    </div>
                }
            />
        </Card>
    );
};

export default SkeletonCard;
