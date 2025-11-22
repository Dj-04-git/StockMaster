import React, { useState } from 'react';
import { Search, Filter, Edit2, X, Package, AlertCircle } from 'lucide-react';

const StockLevels = () => {
  // Mock Data matching the wireframe
  // "Reserved" is hidden but used to calculate "Free to Use"
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Desk', cost: 3000, onHand: 50, reserved: 5, uom: 'Units' },
    { id: 2, name: 'Table', cost: 3000, onHand: 50, reserved: 0, uom: 'Units' },
    { id: 3, name: 'Office Chair', cost: 4500, onHand: 120, reserved: 20, uom: 'Units' },
    { id: 4, name: 'Steel Rod', cost: 500, onHand: 0, reserved: 0, uom: 'Kg' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // State for Stock Update Modal
  const [selectedItem, setSelectedItem] = useState(null);
  const [newQty, setNewQty] = useState(0);

  // Filter Logic
  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- ACTIONS ---

  const openUpdateModal = (item) => {
    setSelectedItem(item);
    setNewQty(item.onHand);
    document.getElementById('update_stock_modal').showModal();
  };

  const handleUpdateStock = () => {
    if (!selectedItem) return;

    setInventory(inventory.map(item =>
      item.id === selectedItem.id
        ? { ...item, onHand: parseInt(newQty) || 0 }
        : item
    ));

    setSelectedItem(null);
    document.getElementById('update_stock_modal').close();
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6">

      {/* Main Container */}
      <div className="card bg-base-100 shadow-xl border border-base-300">

        {/* --- Header --- */}
        <div className="border-b border-base-300 p-4 flex justify-between items-center bg-base-200/30">
          <h1 className="text-3xl font-bold tracking-wide font-handwriting">Stock</h1>

          <div className="flex items-center gap-2">
            {/* Expandable Search Bar */}
            <div className={`transition-all duration-300 overflow-hidden ${isSearchOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'}`}>
              <input
                type="text"
                placeholder="Search product..."
                className="input input-sm input-bordered w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus={isSearchOpen}
              />
            </div>

            <button
              className={`btn btn-circle btn-sm ${isSearchOpen ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* --- Table --- */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="table w-full">
            <thead className="text-base font-bold text-base-content border-b-2 border-base-300">
              <tr>
                <th className="pl-6 text-lg">Product</th>
                <th className="text-lg">per unit cost</th>
                <th className="text-center text-lg">On hand</th>
                <th className="text-center text-lg">free to Use</th>
                <th className="text-right pr-6"></th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => {
                const freeToUse = item.onHand - item.reserved;
                const isLowStock = freeToUse < 10;

                return (
                  <tr key={item.id} className="hover text-lg group border-b border-base-200/50">
                    <td className="pl-6 font-medium">
                      <div className="flex items-center gap-2">
                        {item.name}
                        {isLowStock && (
                          <div className="tooltip tooltip-right" data-tip="Low Availability">
                            <AlertCircle className="w-4 h-4 text-warning" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="font-mono text-base-content/70">
                      {item.cost} Rs
                    </td>
                    <td className="text-center font-bold text-primary">
                      {item.onHand}
                    </td>
                    <td className="text-center font-bold text-secondary">
                      {freeToUse}
                    </td>
                    <td className="text-right pr-6">
                      <button
                        className="btn btn-sm btn-ghost gap-2 transition-opacity text-primary"
                        onClick={() => openUpdateModal(item)}
                      >
                        <Edit2 className="w-4 h-4" /> Update
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredInventory.length === 0 && (
            <div className="flex flex-col items-center justify-center h-48 opacity-50">
              <Package className="w-12 h-12 mb-2" />
              <p>No stock items found.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- Update Modal --- */}
      <dialog id="update_stock_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <h3 className="font-bold text-lg mb-6">Update Stock Quantity</h3>

          {selectedItem && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-base-200 p-4 rounded-lg">
                <span className="font-bold">{selectedItem.name}</span>
                <span className="badge badge-neutral">Current: {selectedItem.onHand}</span>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">New On Hand Quantity</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full text-lg"
                  value={newQty}
                  onChange={(e) => setNewQty(e.target.value)}
                  min="0"
                />
                <label className="label">
                  <span className="label-text-alt text-warning">
                    Adjusting this will automatically recalculate "Free to Use".
                  </span>
                </label>
              </div>

              <div className="modal-action">
                <button
                  className="btn btn-primary w-full"
                  onClick={handleUpdateStock}
                >
                  Confirm Update
                </button>
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

export default StockLevels;
