import React, { useState } from 'react';
import { Link } from 'react-router';
import { Search, Plus, Filter, MoreHorizontal, History, Edit2, X } from 'lucide-react';

const ProductList = () => {
  // Mock Data matching the screenshot structure
  const [products, setProducts] = useState([
    { id: 1, name: 'Desk', cost: 3000, onHand: 50, reserved: 5, uom: 'Units' },
    { id: 2, name: 'Table', cost: 3000, onHand: 50, reserved: 0, uom: 'Units' },
    { id: 3, name: 'Office Chair', cost: 4500, onHand: 120, reserved: 20, uom: 'Units' },
    { id: 4, name: 'Steel Rod', cost: 500, onHand: 0, reserved: 0, uom: 'Kg' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null); // For the Update Stock Modal
  const [adjustmentQty, setAdjustmentQty] = useState(0);

  // Filter Logic
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Stock Update
  const handleUpdateStock = () => {
    if (!selectedProduct) return;

    const updatedProducts = products.map(p => {
      if (p.id === selectedProduct.id) {
        // Ensure stock doesn't go below 0
        const newOnHand = Math.max(0, parseInt(adjustmentQty));
        return { ...p, onHand: newOnHand };
      }
      return p;
    });

    setProducts(updatedProducts);
    setSelectedProduct(null); // Close Modal
  };

  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setAdjustmentQty(product.onHand);
    // DaisyUI modal toggle
    document.getElementById('stock_update_modal').showModal();
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">

      {/* Header Section matching the "Stock" look */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border-b border-base-300 pb-4">
        <h1 className="text-3xl font-bold text-base-content">Stock</h1>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          {/* Search */}
          <div className="join">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="input input-bordered input-sm w-full md:w-64 pl-10 join-item"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
            </div>
            <button className="btn btn-sm btn-primary join-item">
              <Filter className="w-4 h-4" />
            </button>
          </div>

          {/* New Product Action */}
          <Link to="/products/new" className="btn btn-sm btn-outline gap-2 ml-2">
            <Plus className="w-4 h-4" /> New
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 shadow-sm border border-base-200 rounded-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base-content font-bold text-sm">
            <tr>
              <th className="py-4 pl-6 text-lg">Product</th>
              <th className="text-lg">per unit cost</th>
              <th className="text-center text-lg">On hand</th>
              <th className="text-center text-lg">free to Use</th>
              <th className="text-right text-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover text-base">
                <td className="pl-6 font-medium">{product.name}</td>
                <td className="font-mono">{product.cost} Rs</td>
                <td className="text-center font-bold text-primary">{product.onHand}</td>
                <td className="text-center font-bold text-secondary">
                  {/* Free to Use = On Hand - Reserved */}
                  {product.onHand - product.reserved}
                </td>
                <td className="text-right pr-6">
                  <button
                    className="btn btn-xs btn-ghost border-base-300 hover:bg-primary hover:text-white gap-1"
                    onClick={() => openUpdateModal(product)}
                  >
                    <Edit2 className="w-3 h-3" /> Update Stock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-10 opacity-50">No products found.</div>
      )}

      {/* --- UPDATE STOCK MODAL --- */}
      <dialog id="stock_update_modal" className="modal">
        <div className="modal-box">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Update Stock</h3>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost"><X className="w-4 h-4" /></button>
            </form>
          </div>

          {selectedProduct && (
            <div className="space-y-4">
              <div className="py-2">
                Updating stock for: <span className="font-bold text-primary">{selectedProduct.name}</span>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">New On Hand Quantity</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={adjustmentQty}
                  onChange={(e) => setAdjustmentQty(e.target.value)}
                  min="0"
                />
                <label className="label">
                  <span className="label-text-alt text-base-content/60">Current: {selectedProduct.onHand}</span>
                </label>
              </div>

              <div className="modal-action">
                <form method="dialog">
                  {/* Close button handled by dialog form */}
                  <button className="btn btn-ghost mr-2">Cancel</button>
                </form>
                <button className="btn btn-primary" onClick={handleUpdateStock}>Update</button>
              </div>
            </div>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

    </div>
  );
};

export default ProductList;
