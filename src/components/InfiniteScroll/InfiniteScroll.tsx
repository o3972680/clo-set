import { Typography } from "antd";
import { useEffect, useRef } from "react";
import styles from "./InfiniteScroll.module.scss";

const { Text } = Typography;

export interface InfiniteScrollProps {
    isLoading: boolean;
    hasMore: boolean;
    loadNextPage: () => void;
    hasItems: boolean;
}

const InfiniteScroll = ({
    isLoading,
    hasMore,
    loadNextPage,
    hasItems,
}: InfiniteScrollProps) => {
    const observer = useRef<IntersectionObserver | null>(null);
    const loadingRef = useRef<HTMLDivElement>(null);

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
        if (isLoading) {
            loadingRef.current?.classList.remove("hidden");
        } else {
            loadingRef.current?.classList.add("hidden");
        }
    }, [isLoading]);

    return (
        <>
            {hasMore && <div ref={loadingRef} className={styles.sentinel} />}
            {!isLoading && !hasMore && hasItems && (
                <Text className={styles.loadFinished}>
                    All data has been loaded
                </Text>
            )}
        </>
    );
};

export default InfiniteScroll;
