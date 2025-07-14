# SOLUTION.md

### Backend

- **Refactored blocking I/O:**
  - `src/routes/items.js` now uses async `fs.promises.readFile` and `writeFile` for non-blocking operations.
- **Performance improvements:**
  - `GET /api/stats` now caches stats in memory and recalculates only when needed, using a service module (`src/service/stats.js`).
  - Stats calculation uses a utility function for average and total price.
- **Validation:**
  - Added Joi validation for item creation (`src/validators/createItem.js`).
  - Integrated validation middleware in item POST route.
- **Error Handling:**
  - Improved error handling in `src/middleware/errorHandler.js` for validation and custom errors.
- **Unit Tests:**
  - Added Jest tests for items routes (`backend/tests/items.test.js`).
- **Constants:**
  - Centralized data path in `src/constants.js`.

### Frontend

- **Memory Leak Fix:**
  - `Items.js` now cancels state updates if the component unmounts before fetch completes.
- **Pagination & Search:**
  - Implemented paginated list and server-side search (`q` param) in `Items.js` and backend.
  - Added `Pagination` and `SearchBox` components.
- **Performance:**
  - UI components use skeleton loaders for smooth experience.
  - Tailwind CSS integrated for modern UI.
- **Stats Display:**
  - Added stat cards for total items, average price, and total value.
- **Routing:**
  - Improved routing and navigation for item details.

## How to Run

- **Backend:**
  - `cd backend && npm install && npm start`
- **Frontend:**
  - `cd frontend && npm install && npm start`

## Testing

- **Backend:**
  - Run `npm test` in the backend folder to execute Jest unit tests.
