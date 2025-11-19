// Sort.test.tsx
import { Sort } from "@/components";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Sort Component", () => {
    const mockOnSortChange = vi.fn();

    beforeEach(() => {
        mockOnSortChange.mockClear();
    });

    test("should display the correct total items count", () => {
        const testTotal = 12;
        render(
            <Sort
                sortBy="Item Name"
                onSortChange={mockOnSortChange}
                totalItems={testTotal}
            />
        );

        expect(screen.getByText(`${testTotal} items`)).toBeInTheDocument();
    });

    test("should set the correct initial value for Select", () => {
        const testSortBy = "Higher Price";
        render(
            <Sort
                sortBy={testSortBy}
                onSortChange={mockOnSortChange}
                totalItems={5}
            />
        );

        expect(screen.getByText(testSortBy)).toBeInTheDocument();
    });


    test("should call onSortChange with the selected value when an option is chosen", async () => {
        const user = userEvent.setup();
        const targetOption = "Lower Price";

        render(
            <Sort
                sortBy="Item Name"
                onSortChange={mockOnSortChange}
                totalItems={7}
            />
        );

        const selectTrigger = screen.getByText("Item Name");
        await user.click(selectTrigger);

        const optionElement = await screen.findByText(targetOption);
        await user.click(optionElement);

        expect(mockOnSortChange).toHaveBeenCalledTimes(1);
    });

    test("should update the Select value when sortBy prop changes", () => {
        const { rerender } = render(
            <Sort
                sortBy="Item Name"
                onSortChange={mockOnSortChange}
                totalItems={5}
            />
        );
        expect(screen.getByText("Item Name")).toBeInTheDocument();

        rerender(
            <Sort
                sortBy="Higher Price"
                onSortChange={mockOnSortChange}
                totalItems={5}
            />
        );
        expect(screen.getByText("Higher Price")).toBeInTheDocument();
    });
});
