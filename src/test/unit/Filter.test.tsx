import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "@/components/Filter";
import type { FilterProps } from "@/components/Filter";
import { beforeEach, describe, expect, test, vi } from "vitest";

// Mock Ant Design Icon
vi.mock("@ant-design/icons", () => ({
    ReloadOutlined: () => <span data-testid="reload-icon">↻</span>,
}));

describe("Filter unit test", () => {
    const defaultProps: FilterProps = {
        pricingOptions: {
            Paid: true,
            Free: false,
            "View Only": true,
        },
        priceRange: [100, 500],
        onPricingToggle: vi.fn(),
        onPriceRangeChange: vi.fn(),
        onPriceRangeAfterChange: vi.fn(),
        onReset: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("should render the Filter component of pricing options", () => {
        render(<Filter {...defaultProps} />);

        expect(screen.getByText("Pricing Options")).toBeInTheDocument();
        expect(screen.getByLabelText("Paid")).toBeInTheDocument();
        expect(screen.getByLabelText("Free")).toBeInTheDocument();
        expect(screen.getByLabelText("View Only")).toBeInTheDocument();
    });

    test("should render the correct check status", () => {
        render(<Filter {...defaultProps} />);

        const paidCheckbox = screen.getByLabelText("Paid") as HTMLInputElement;
        const freeCheckbox = screen.getByLabelText("Free") as HTMLInputElement;
        const viewOnlyCheckbox = screen.getByLabelText(
            "View Only"
        ) as HTMLInputElement;

        expect(paidCheckbox.checked).toBe(true);
        expect(freeCheckbox.checked).toBe(false);
        expect(viewOnlyCheckbox.checked).toBe(true);
    });

    test("should not render the price range slider when pricing options are not available", () => {
        const props = {
            ...defaultProps,
            pricingOptions: {
                ...defaultProps.pricingOptions,
                Paid: false,
            },
        };
        render(<Filter {...props} />);

        expect(screen.queryByText("$100")).not.toBeInTheDocument();
        expect(screen.queryByText("$500")).not.toBeInTheDocument();
        expect(screen.queryByRole("slider")).not.toBeInTheDocument();
    });

    test("should trigger onPricingToggle when pricing option is toggled", () => {
        render(<Filter {...defaultProps} />);

        const paidCheckbox = screen.getByLabelText("Paid");
        fireEvent.click(paidCheckbox);

        expect(defaultProps.onPricingToggle).toHaveBeenCalledWith("Paid");
        expect(defaultProps.onPricingToggle).toHaveBeenCalledTimes(1);
    });

    test("should trigger reset function when reset button is clicked", () => {
        render(<Filter {...defaultProps} />);

        const resetButton = screen.getByText("RESET");
        fireEvent.click(resetButton);

        expect(defaultProps.onReset).toHaveBeenCalledTimes(1);
    });

    test("should handle all pricing options toggle", () => {
        render(<Filter {...defaultProps} />);

        const freeCheckbox = screen.getByLabelText("Free");
        fireEvent.click(freeCheckbox);

        expect(defaultProps.onPricingToggle).toHaveBeenCalledWith("Free");

        const viewOnlyCheckbox = screen.getByLabelText("View Only");
        fireEvent.click(viewOnlyCheckbox);

        expect(defaultProps.onPricingToggle).toHaveBeenCalledWith("View Only");
    });
});
