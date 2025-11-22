import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import './index.css'

// Layouts
import Layout from './pages/Layout';

// Pages
import App from './App'
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ProductList from './pages/products/ProductList';
import ProductForm from './pages/products/ProductForm';
import OperationsList from './pages/operations/OperationsList';
import OperationDetail from './pages/operations/OperationDetail';
import StockLevels from './pages/stock/StockLevels';
import MoveHistory from './pages/reports/MoveHistory';
import Settings from './pages/Settings';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      {/* Public Routes (No Navbar/Sidebar) */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Signup />} />
      <Route path="forgot-page" element={<Signup />} />

      {/* Protected App Routes (With Layout) */}
      <Route element={<Layout />}>
        {/* Default redirect to dashboard */}
        <Route index element={<App />} />

        <Route path="dashboard" element={<Dashboard />} />

        {/* Product Management */}
        <Route path="products">
          <Route index element={<ProductList />} />
          <Route path="new" element={<ProductForm />} />
          <Route path=":id" element={<ProductForm />} /> {/* Re-use form for edit */}
        </Route>

        {/* Operations (Dynamic: type = receipts, deliveries, internal, adjustments) */}
        <Route path="operations">
          <Route index element={<OperationsList />} />
          <Route path=":type" element={<OperationsList />} />
          <Route path=":type/new" element={<OperationDetail />} />
          <Route path=":type/:id" element={<OperationDetail />} />
        </Route>

        {/* Reporting */}
        <Route path="stock" element={<StockLevels />} />
        <Route path="move-history" element={<MoveHistory />} />

        {/* Admin */}
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  </BrowserRouter>
);
