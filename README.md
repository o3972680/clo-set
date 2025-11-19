# CLO-SET - Modern Shopping Website

A sleek, responsive shopping platform built with React and Vite (Rolldown). It features advanced filtering, sorting, infinite scroll, and persistent state management for a seamless user experience.

## Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/o3972680/clo-set.git
cd clo-set

# 2. Install dependencies (uses pnpm for faster installs)
pnpm install

# 3. Start local development server
npm run start

# 4. Build production bundle (optimized for performance)
npm run build

# 5. Run unit tests (Vitest)
npm run test

# 6. Generate test coverage report
npm run coverage
```

## Core Features

### Navigation

-   Only the **STORE** functionality is fully implemented.
-   Other menu items (GALLERY, CONTEST, COMMUNITY, SIGN IN, SIGN UP) are placeholders for future expansion.

### Store Page

The store is the core feature, with a focus on intuitive content discovery and filtering.

#### 1. Content Filters

-   **Pricing Options**: Filter by 3 categories (Paid, Free, View Only)
    -   Supports multi-selection (e.g., select both Free and View Only)
    -   Default state: All options unchecked (shows all items)
-   **Reset Button**: One-click restoration of default filter/sort states
-   **Price Slider** (Paid-only):
    -   Range: 0 – 999
    -   Activates **only** when "Paid" is selected
    -   Displays selected min/max price values next to the slider

#### 2. Sorting Options

-   Dropdown menu with 3 sorting criteria:
    -   Item Name (default)
    -   Higher Price
    -   Lower Price
-   Shows total number of items matching the current filters

#### 3. Keyword Search

-   Searches across **item title** and **creator name**
-   Works in combination with filters (filters + search = precise results)
-   Empty search: Displays all items (respects active filters)

#### 4. Item List

-   Each item card displays:
    -   Product image
    -   Creator name
    -   Item title
    -   Pricing (Free / View Only / $X.XX for Paid items)
-   Loading state: Skeleton UI for smooth perceived performance
-   Infinite scroll: Automatically loads more items as the user scrolls
-   Responsive grid layout (adapts to screen size):

| Screen Size        | Columns |
| ------------------ | ------- |
| > 1200px (Desktop) | 4       |
| 768px – 1200px     | 3       |
| 480px – 767px      | 2       |
| < 480px (Mobile)   | 1       |

#### 5. State Persistence

-   Saves filter, sort, and search states across page refreshes
-   Powered by Zustand (with Immer for immutable updates)
-   No browser storage (localStorage/sessionStorage) required

## Tech Stack

| Category           | Tools/Libraries                                      |
| ------------------ | ---------------------------------------------------- |
| Frontend Framework | React                                                |
| Build Tool         | Vite (with Rolldown adapter for faster builds)       |
| State Management   | Zustand (with Immer + persist for state persistence) |
| Styling            | SCSS Modules (scoped styles + modular organization)  |
| Component Library  | Ant Design (UI components for consistency)           |
| Testing            | Vitest (unit tests) + Test Coverage Reporting        |
