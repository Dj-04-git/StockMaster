import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Save, ArrowLeft, Package, Layers, Barcode, Tag, DollarSign, Box } from 'lucide-react';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new' || !id;

  // --- STATE ---
  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'inventory'

  const [formData, setFormData] = useState({
    name: isNew ? '' : 'Large Desk',
    canSold: true,
    canPurchase: true,
    type: 'Storable Product',
    category: 'Furniture',
    price: isNew ? 0 : 120.00,
    cost: isNew ? 0 : 80.00,
    sku: isNew ? '' : 'DESK001',
    barcode: '',
    uom: 'Units',
    initialStock: 0, // Only for new products
  });

  // --- ACTIONS ---
  const handleSave = () => {
    // API logic would go here
    const msg = isNew
      ? `Created ${formData.name} with ${formData.initialStock} initial stock.`
      : `Updated ${formData.name}.`;

    alert(msg);
    navigate('/products');
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6">

      {/* --- BREADCRUMBS --- */}
      <div className="text-sm breadcrumbs text-base-content/60 mb-4">
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li className="font-semibold text-primary">{isNew ? 'New' : formData.sku || formData.name}</li>
        </ul>
      </div>

      {/* --- HEADER --- */}
      <div className="flex justify-between items-center mb-6 border-b border-base-300 pb-4">
        <h1 className="text-3xl font-bold text-base-content">
          {isNew ? 'New Product' : formData.name}
        </h1>
        <div className="flex gap-2">
          <button className="btn btn-ghost" onClick={() => navigate('/products')}>Discard</button>
          <button className="btn btn-primary gap-2 px-6" onClick={handleSave}>
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </div>

      {/* --- MAIN CARD --- */}
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-0">

          {/* Top Section: Name, Image, Toggles */}
          <div className="p-8 pb-0 flex flex-col md:flex-row gap-8">

            {/* Image Placeholder */}
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-xl w-32 h-32 text-5xl font-bold shadow-inner">
                {getInitials(formData.name)}
              </div>
            </div>

            {/* Main Inputs */}
            <div className="flex-1 space-y-4">

              {/* Name Input */}
              <div className="form-control">
                <label className="label py-0"><span className="label-text font-bold text-base-content/60">Product Name</span></label>
                <input
                  type="text"
                  className="input input-ghost text-4xl font-bold px-0 h-auto focus:bg-transparent placeholder:text-base-content/20"
                  placeholder="e.g. Office Chair"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  autoFocus
                />
              </div>

              {/* Toggles */}
              <div className="flex gap-6">
                <label className="label cursor-pointer justify-start gap-2 p-0">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-primary"
                    checked={formData.canSold}
                    onChange={(e) => setFormData({ ...formData, canSold: e.target.checked })}
                  />
                  <span className="label-text font-medium">Can be Sold</span>
                </label>
                <label className="label cursor-pointer justify-start gap-2 p-0">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-secondary"
                    checked={formData.canPurchase}
                    onChange={(e) => setFormData({ ...formData, canPurchase: e.target.checked })}
                  />
                  <span className="label-text font-medium">Can be Purchased</span>
                </label>
              </div>

            </div>

            {/* Smart Buttons (Stats) - Only for Existing Products */}
            {!isNew && (
              <div className="flex flex-col gap-2 min-w-[140px]">
                <div className="btn btn-outline btn-block h-auto py-2 flex-col gap-0 normal-case border-base-300 hover:bg-base-200 hover:text-base-content hover:border-base-300">
                  <div className="flex items-center gap-2 text-primary font-bold text-xl">
                    <Box className="w-5 h-5" /> 12
                  </div>
                  <span className="text-xs opacity-70">On Hand</span>
                </div>
                <div className="btn btn-outline btn-block h-auto py-2 flex-col gap-0 normal-case border-base-300 hover:bg-base-200 hover:text-base-content hover:border-base-300">
                  <div className="flex items-center gap-2 text-secondary font-bold text-xl">
                    <Layers className="w-5 h-5" /> 22
                  </div>
                  <span className="text-xs opacity-70">Forecasted</span>
                </div>
              </div>
            )}
          </div>

          {/* --- TABS --- */}
          <div role="tablist" className="tabs tabs-bordered px-8 mt-6">
            <a
              role="tab"
              className={`tab tab-lg px-0 mr-8 ${activeTab === 'general' ? 'tab-active font-bold' : ''}`}
              onClick={() => setActiveTab('general')}
            >
              General Information
            </a>
            <a
              role="tab"
              className={`tab tab-lg px-0 ${activeTab === 'inventory' ? 'tab-active font-bold' : ''}`}
              onClick={() => setActiveTab('inventory')}
            >
              Inventory
            </a>
          </div>

          {/* --- TAB CONTENT --- */}
          <div className="p-8 bg-base-100 min-h-[300px]">

            {/* GENERAL TAB */}
            {activeTab === 'general' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">

                {/* Left Col */}
                <div className="space-y-4">
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text font-semibold">Product Type</span></label>
                    <select
                      className="select select-bordered w-full"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option>Storable Product</option>
                      <option>Consumable</option>
                      <option>Service</option>
                    </select>
                  </div>

                  <div className="form-control w-full">
                    <label className="label"><span className="label-text font-semibold">Category</span></label>
                    <div className="relative">
                      <Tag className="absolute top-3 left-3 w-5 h-5 opacity-40" />
                      <input
                        type="text"
                        className="input input-bordered w-full pl-10"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Col */}
                <div className="space-y-4">
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text font-semibold">Sales Price</span></label>
                    <div className="relative">
                      <DollarSign className="absolute top-3 left-3 w-5 h-5 opacity-40" />
                      <input
                        type="number"
                        className="input input-bordered w-full pl-10 text-lg font-bold"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-control w-full">
                    <label className="label"><span className="label-text font-semibold">Cost</span></label>
                    <div className="relative">
                      <DollarSign className="absolute top-3 left-3 w-5 h-5 opacity-40" />
                      <input
                        type="number"
                        className="input input-bordered w-full pl-10"
                        value={formData.cost}
                        onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* INVENTORY TAB */}
            {activeTab === 'inventory' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">

                <div className="space-y-4">
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text font-semibold">Internal Reference (SKU)</span></label>
                    <div className="relative">
                      <Barcode className="absolute top-3 left-3 w-5 h-5 opacity-40" />
                      <input
                        type="text"
                        className="input input-bordered w-full pl-10 font-mono"
                        value={formData.sku}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                        placeholder="e.g. WH/001"
                      />
                    </div>
                  </div>

                  <div className="form-control w-full">
                    <label className="label"><span className="label-text font-semibold">Barcode</span></label>
                    <div className="relative">
                      <Barcode className="absolute top-3 left-3 w-5 h-5 opacity-40" />
                      <input
                        type="text"
                        className="input input-bordered w-full pl-10 font-mono"
                        value={formData.barcode}
                        onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text font-semibold">Unit of Measure</span></label>
                    <select
                      className="select select-bordered w-full"
                      value={formData.uom}
                      onChange={(e) => setFormData({ ...formData, uom: e.target.value })}
                    >
                      <option>Units</option>
                      <option>Kg</option>
                      <option>Liters</option>
                      <option>Box</option>
                    </select>
                  </div>

                  {/* Initial Stock (Only for New Products) */}
                  {isNew && formData.type === 'Storable Product' && (
                    <div className="form-control w-full bg-warning/10 p-4 rounded-lg border border-warning/20">
                      <label className="label pt-0"><span className="label-text font-bold text-warning-content">Initial Stock</span></label>
                      <input
                        type="number"
                        className="input input-bordered w-full"
                        value={formData.initialStock}
                        onChange={(e) => setFormData({ ...formData, initialStock: e.target.value })}
                        min="0"
                      />
                      <label className="label pb-0"><span className="label-text-alt opacity-70">Will create an automatic inventory adjustment.</span></label>
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductForm;
