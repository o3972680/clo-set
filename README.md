# CONNET - Shopping Website

A modern shopping website built with React and Vite(Rolldown), featuring responsive design, advanced filtering capabilities, and persistent state management.

## Features
### Navigation
- Navigation menu with STORE, GALLERY, CONTEST, COMMUNITY options
- Authentication options (SIGN IN, SIGN UP)
- Currently, only the STORE functionality is implemented

### Store Page
#### Contents Filter
- **Pricing Options**: Filter by Paid, Free, and View Only
  - Multiple options can be selected simultaneously
  - Default state is unchecked (shows all items)
- **Reset Button**: Restores filters to default state, and the sorting option to "Item Name"
- **Pricing Slider**:
  - Range from 0 to 999
  - Activated only when "Paid" option is selected
  - Displays selected price range on both sides of the slider

#### Sorting Options
- Dropdown menu with sorting criteria:
  - Item Name (Default)
  - Higher Price
  - Lower Price
- If the "Paid" option is selected, the "Higher Price" and "Lower Price" options are disabled
- If the "Paid" option is not selected, the "Higher Price" and "Lower Price" options are enabled

#### Keyword Search
- Filter content based on creator or title
- Can be combined with Pricing Option filters
- Empty search displays all items

#### Contents List
- Displays each item's:
  - Photo
  - Creator (Designer)
  - Title
  - Pricing (Free/View Only/Paid with price)
- Implemented skeleton UI loading state
- Responsive grid system:
  - Default (>1200px): 4 columns
  - <1200px: 3 columns
  - <768px: 2 columns
  - <480px: 1 column

#### State Persistence
- Maintains filters and search results after page refresh
- Implemented with Zustand, without using browser storage

## Tech Stack

- **Frontend Framework**: React
- **Build Tool**: Vite with Rolldown
- **State Management**: Zustand with Immer and persist
- **Styling**: SCSS Modules
- **Component Library**: Ant-Design
- **Testing**: 
  - Unit tests
  - Test coverage reporting

## Installation and Setup

```bash
# Clone the repository
git clone [repository-url]
cd clo-set

# Install dependencies
pnpm install

# Start development server
npm run start

# Build for production
npm run build


# Run tests
npm run test

# Check test coverage
npm run coverage
```
