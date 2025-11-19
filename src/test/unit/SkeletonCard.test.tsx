import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SkeletonCard } from "@/components";
import styles from "@/components/SkeletonCard/SkeletonCard.module.scss";
import type { ApiItem } from "@/types";

vi.mock("@/assets/cart.svg?react", () => ({
    default: vi.fn(() => <svg data-testid="cart-icon" />),
}));

const mockApiItem: ApiItem = {
    id: "test",
    loading: false,
    title: "Test Product",
    creator: "Test Creator",
    imagePath: "test-image.jpg",
    price: 99.99,
    priceType: "Paid",
    pricingOption: 0,
};

describe("SkeletonCard Component", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    test("should render actual content when loading is false", () => {
        render(<SkeletonCard {...mockApiItem} />);

        expect(screen.queryByTestId("skeleton-image")).not.toBeInTheDocument();
        expect(
            screen.queryByTestId("skeleton-placeholder")
        ).not.toBeInTheDocument();

        const productImage = screen.getByAltText(mockApiItem.title);
        expect(productImage).toBeInTheDocument();
        expect(productImage).toHaveAttribute("src", mockApiItem.imagePath);

        const cartButton = screen.getByTestId("cart-icon").closest("button");
        expect(cartButton).toBeInTheDocument();
        expect(cartButton).toHaveClass(styles.cartIcon);

        expect(screen.getByText(mockApiItem.title)).toBeInTheDocument();
        expect(screen.getByText(mockApiItem.creator)).toBeInTheDocument();
    });

    test("should display correct price based on priceType", () => {
        render(<SkeletonCard {...mockApiItem} priceType="Paid" />);
        expect(screen.getByText(`$${mockApiItem.price}`)).toBeInTheDocument();

        const freeType = "Free";
        render(<SkeletonCard {...mockApiItem} priceType={freeType} />);
        expect(screen.getByText(freeType)).toBeInTheDocument();
    });

    test("should apply correct CSS classes", () => {
        const { container } = render(<SkeletonCard {...mockApiItem} />);

        const cardElement = container.firstChild;
        expect(cardElement).toHaveClass(styles.productCard);

        const imgContainer = screen
            .getByAltText(mockApiItem.title)
            .closest(`.${styles.cardImgContainer}`);
        expect(imgContainer).toBeInTheDocument();

        const metaContainer = screen
            .getByText(mockApiItem.title)
            .closest(`.${styles.cardMeta}`);
        expect(metaContainer).toBeInTheDocument();

        const priceTag = screen
            .getByText(`$${mockApiItem.price}`)
            .closest(`.${styles.priceTag}`);
        expect(priceTag).toBeInTheDocument();
    });

    test("should render Card with hoverable prop", () => {
        const { container } = render(<SkeletonCard {...mockApiItem} />);
        expect(container.firstChild).toHaveClass("ant-card-hoverable");
    });
});
