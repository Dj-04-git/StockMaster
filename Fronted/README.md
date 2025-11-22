# StockMaster

This project has been restructured to separate the frontend and backend concerns.

## Project Structure

-   `frontend/`: Contains the React application for the StockMaster UI.
    -   `frontend/src/`: React source code, pages, and components.
    -   `frontend/public/`: Static assets, including `index.html`.
    -   `frontend/package.json`: Frontend project dependencies and scripts.
    -   `frontend/tailwind.config.js`: Tailwind CSS configuration.
    -   `frontend/postcss.config.js`: PostCSS configuration.
    -   `frontend/node_modules/`: Frontend project dependencies.
-   `backend/`: (Currently empty) Intended for the backend API and server-side logic.

## Getting Started

### Frontend

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm start
    ```
    The application will be available at `http://localhost:1234` (or another port if 1234 is in use).

### Backend

The `backend` directory is currently empty. You can add your backend application here.
