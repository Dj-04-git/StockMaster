import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
import { Printer, Plus, AlertCircle, User, Trash2 } from 'lucide-react';

const OperationDetail = () => {
  const { type, id } = useParams();
  const isNew = id === 'new';

  // --- CONFIGURATION ---
  const config = {
    receipts: {
      title: 'Receipt',
      addressLabel: 'Receive From',
      destLabel: 'Destination',
      operationType: 'Receipts'
    },
    deliveries: {
      title: 'Delivery',
      addressLabel: 'Delivery Address',
      destLabel: 'Source',
      operationType: 'Delivery Orders'
    },
    internal: {
      title: 'Internal Transfer',
      addressLabel: 'Contact',
      operationType: 'Internal Transfers'
    },
    all: { title: 'Operation', addressLabel: 'Address', operationType: 'Operations' }
  };
  const currentConfig = config[type] || config.all;

  // --- STATE ---
  const [status, setStatus] = useState('draft');
  const [activeTab, setActiveTab] = useState('products'); // 'products', 'info', 'note'

  const [formData, setFormData] = useState({
    reference: isNew ? 'Draft' : 'WH/OUT/0001',
    address: 'Azure Interior',
    responsible: 'Mitchell Admin',
    scheduleDate: '2025-10-26',
    operationType: currentConfig.operationType,
  });

  const [lines, setLines] = useState([
    { id: 1, product: '[DESK001] Large Desk', quantity: 6, available: 2 },
    { id: 2, product: '[Chair002] Office Chair', quantity: 10, available: 50 },
  ]);

  // --- ACTIONS ---
  const handleLineChange = (id, field, value) => {
    setLines(lines.map(line =>
      line.id === id ? { ...line, [field]: value } : line
    ));
  };

  const handleDeleteLine = (id) => {
    setLines(lines.filter(line => line.id !== id));
  };

  const handleAddLine = () => {
    setLines([
      ...lines,
      { id: Date.now(), product: '', quantity: 1, available: 0 }
    ]);
  };

  const handleValidate = () => {
    const hasshortage = lines.some(l => l.available < l.quantity);
    setStatus(hasshortage ? 'waiting' : 'done');
  };

  const steps = ['draft', 'waiting', 'ready', 'done'];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 text-base-content">

      {/* --- 1. BREADCRUMBS --- */}
      <div className="text-sm breadcrumbs text-base-content/60 mb-4">
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to={`/operations/${type}`}>{currentConfig.title}s</Link></li>
          <li className="font-semibold text-primary">{formData.reference}</li>
        </ul>
      </div>

      {/* --- 2. HEADER AREA --- */}
      <div className="border-b border-base-300 pb-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          {isNew && <div className="badge badge-outline">New</div>}
          <h1 className="text-3xl font-bold">{currentConfig.title} / {formData.reference}</h1>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

          {/* ACTION BUTTONS */}
          <div className="flex gap-2 w-full lg:w-auto">
            <button className="btn btn-primary btn-sm px-6" onClick={handleValidate}>
              Validate
            </button>
            <button className="btn btn-outline btn-sm px-6 gap-2">
              <Printer className="w-4 h-4" /> Print
            </button>
            <button className="btn btn-ghost btn-sm px-6">
              Cancel
            </button>
          </div>

          {/* STATUS BAR (DaisyUI Styled) */}
          <div className="w-full lg:w-auto">
            <div className="flex items-center border border-base-300 rounded-full px-1 py-1 bg-base-100 shadow-sm">
              {steps.map((step, i) => {
                const isActive = status === step;
                const isCompleted = steps.indexOf(status) > i;

                return (
                  <React.Fragment key={step}>
                    <div
                      onClick={() => setStatus(step)}
                      className={`
                        px-4 py-1 rounded-full text-sm font-bold uppercase cursor-pointer transition-all select-none
                        ${isActive ? 'bg-primary text-primary-content shadow-md' : ''}
                        ${!isActive && isCompleted ? 'text-primary' : ''}
                        ${!isActive && !isCompleted ? 'text-base-content/40' : ''}
                        hover:bg-base-200 hover:text-base-content
                        ${isActive ? 'hover:bg-primary hover:text-primary-content' : ''}
                      `}
                    >
                      {step}
                    </div>
                    {/* Arrow Separator */}
                    {i < steps.length - 1 && (
                      <div className="text-base-content/30 px-1 font-bold">&gt;</div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* --- 3. FORM FIELDS --- */}
      <div className="bg-base-100 p-1 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">

          {/* Left Column */}
          <div className="space-y-4">
            <div className="form-control w-full border-b border-base-200 pb-1">
              <label className="label p-0 mb-1">
                <span className="label-text font-semibold text-base-content/70">{currentConfig.addressLabel}</span>
              </label>
              <input
                type="text"
                className="input input-ghost input-sm w-full px-0 font-medium text-lg focus:bg-transparent focus:outline-none rounded-none text-base-content"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="form-control w-full border-b border-base-200 pb-1">
              <label className="label p-0 mb-1">
                <span className="label-text font-semibold text-base-content/70">Responsible</span>
              </label>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 opacity-50" />
                <input
                  type="text"
                  className="input input-ghost input-sm w-full px-0 focus:bg-transparent focus:outline-none rounded-none text-base-content"
                  value={formData.responsible}
                  onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="form-control w-full border-b border-base-200 pb-1">
              <label className="label p-0 mb-1">
                <span className="label-text font-semibold text-base-content/70">Schedule Date</span>
              </label>
              <input
                type="date"
                className="input input-ghost input-sm w-full px-0 focus:bg-transparent focus:outline-none rounded-none text-base-content"
                value={formData.scheduleDate}
                onChange={(e) => setFormData({ ...formData, scheduleDate: e.target.value })}
              />
            </div>

            <div className="form-control w-full border-b border-base-200 pb-1">
              <label className="label p-0 mb-1">
                <span className="label-text font-semibold text-base-content/70">Operation Type</span>
              </label>
              <select
                className="select select-ghost select-sm w-full px-0 focus:bg-transparent focus:outline-none rounded-none text-base-content font-normal"
                value={formData.operationType}
                onChange={(e) => setFormData({ ...formData, operationType: e.target.value })}
              >
                <option value="Receipts">Receipts</option>
                <option value="Delivery Orders">Delivery Orders</option>
                <option value="Internal Transfers">Internal Transfers</option>
                <option value="Manufacturing">Manufacturing</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* --- 4. TABS & CONTENT --- */}
      <div className="mt-8">
        {/* Tabs Header */}
        <div role="tablist" className="tabs tabs-bordered mb-4">
          <a
            role="tab"
            className={`tab tab-lg px-0 mr-6 ${activeTab === 'products' ? 'tab-active font-bold border-primary text-primary' : 'text-base-content/60'}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </a>
          <a
            role="tab"
            className={`tab tab-lg px-0 mr-6 ${activeTab === 'info' ? 'tab-active font-bold border-primary text-primary' : 'text-base-content/60'}`}
            onClick={() => setActiveTab('info')}
          >
            Additional Info
          </a>
          <a
            role="tab"
            className={`tab tab-lg px-0 ${activeTab === 'note' ? 'tab-active font-bold border-primary text-primary' : 'text-base-content/60'}`}
            onClick={() => setActiveTab('note')}
          >
            Note
          </a>
        </div>

        {/* Tab Content: Products */}
        {activeTab === 'products' && (
          <div className="overflow-x-auto min-h-[200px]">
            <table className="table w-full border-b border-base-200">
              <thead>
                <tr className="border-b-2 border-base-300 text-base-content font-bold">
                  <th className="pl-0 text-sm w-3/5">Product</th>
                  <th className="text-right text-sm w-1/5">Quantity</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {lines.map((line) => {
                  const isStockLow = line.available < line.quantity;

                  return (
                    <tr key={line.id} className={`border-b border-base-100 hover:bg-base-200/50 group ${isStockLow ? 'bg-error/10' : ''}`}>
                      {/* Product Input */}
                      <td className="pl-0 py-2">
                        <div className="flex items-center gap-2 w-full">
                          <input
                            type="text"
                            className={`input input-ghost input-sm w-full px-2 font-medium focus:bg-base-100 ${isStockLow ? 'text-error' : 'text-base-content'}`}
                            value={line.product}
                            placeholder="Select or type product..."
                            onChange={(e) => handleLineChange(line.id, 'product', e.target.value)}
                          />
                          {isStockLow && line.product && (
                            <div className="tooltip tooltip-right tooltip-error" data-tip={`Stock Low: Only ${line.available} available!`}>
                              <AlertCircle className="w-4 h-4 text-error" />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Quantity Input */}
                      <td className="py-2">
                        <input
                          type="number"
                          className="input input-ghost input-sm w-full text-right font-mono text-lg px-2 focus:bg-base-100"
                          value={line.quantity}
                          min="1"
                          onChange={(e) => handleLineChange(line.id, 'quantity', parseFloat(e.target.value) || 0)}
                        />
                      </td>

                      {/* Delete Action */}
                      <td className="py-2">
                        <button
                          className="btn btn-xs btn-ghost opacity-0 group-hover:opacity-100 text-error"
                          onClick={() => handleDeleteLine(line.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {/* Add Line Button */}
                <tr>
                  <td colSpan="3" className="pl-0 py-4">
                    <button
                      className="btn btn-ghost btn-sm text-primary hover:bg-transparent p-0 gap-2 font-normal normal-case"
                      onClick={handleAddLine}
                    >
                      <Plus className="w-4 h-4" /> Add New product
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Tab Content: Additional Info */}
        {activeTab === 'info' && (
          <div className="p-4 bg-base-200/30 rounded-lg border border-base-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label"><span className="label-text">Shipping Policy</span></label>
                <select className="select select-bordered select-sm">
                  <option>As soon as possible</option>
                  <option>When all products are ready</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Tracking Reference</span></label>
                <input type="text" placeholder="e.g. UPS123456" className="input input-bordered input-sm" />
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Note */}
        {activeTab === 'note' && (
          <div className="form-control">
            <textarea
              className="textarea textarea-bordered h-24 w-full"
              placeholder="Add an internal note..."
            ></textarea>
          </div>
        )}

      </div>

    </div>
  );
};

export default OperationDetail;
