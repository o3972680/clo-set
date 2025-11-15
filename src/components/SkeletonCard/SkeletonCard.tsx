import { Card, Skeleton } from "antd";
import styles from "./SkeletonCard.module.scss";
import Meta from "antd/es/card/Meta";

export interface CardProps {
    isLoading: boolean;
    creator?: string;
    title?: string;
    imagePath?: string;
    price?: number;
    priceType?: "Free" | "Paid" | "View Only";
}

const SkeletonCard = (props: CardProps) => {
    const { isLoading, title, creator, imagePath, price, priceType } = props;

    if (isLoading) {
        return (
            <Card
                hoverable
                cover={
                    <div className={styles["cardImgContainer"]}>
                        <Skeleton.Image active className={styles.skeletonImg} />
                    </div>
                }
                className={styles.productCard}
            >
                <div style={{ padding: 16 }}>
                    <Skeleton active paragraph={{ rows: 2 }} />
                </div>
            </Card>
        );
    }

    return (
        <Card
            hoverable
            cover={
                <div className={styles["cardImgContainer"]}>
                    <img alt={title} src={imagePath} />
                </div>
            }
            className={styles["productCard"]}
        >
            <Meta
                title={title}
                description={
                    <div className={styles["cardMeta"]}>
                        <div className={styles["priceTag"]}>
                            {priceType === "Paid" ? (
                                <span>${price}</span>
                            ) : (
                                <span>{priceType}</span>
                            )}
                        </div>
                        <div className={styles["userName"]}>
                            Designer: {creator}
                        </div>
                    </div>
                }
            />
        </Card>
    );
};

export default SkeletonCard;
