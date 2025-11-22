import React, { useState } from 'react';
import { Save, Building2, MapPin, Hash } from 'lucide-react';

const Settings = () => {
  const [warehouse, setWarehouse] = useState({
    name: 'San Francisco Main',
    shortCode: 'WH-SF',
    address: '123 Market St, Suite 400\nSan Francisco, CA 94105',
  });

  const handleChange = (field, value) => {
    setWarehouse({ ...warehouse, [field]: value });
  };

  const handleSave = () => {
    alert('Warehouse settings saved!');
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-base-content">Settings</h1>
        <button className="btn btn-primary gap-2" onClick={handleSave}>
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      {/* Warehouse Card */}
      <div className="card bg-base-100 shadow-lg border border-base-200">

        {/* Card Header */}
        <div className="border-b border-base-200 p-6 bg-base-200/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="card-title text-xl">Warehouse Configuration</h2>
              <p className="text-xs text-base-content/60">Manage main warehouse details and location.</p>
            </div>
          </div>
        </div>

        {/* Card Body / Form */}
        <div className="card-body space-y-6">

          {/* Name Field */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold text-base-content/70">Warehouse Name</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Central Warehouse"
              className="input input-bordered w-full text-lg"
              value={warehouse.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Short Code Field */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-base-content/70">Short Code</span>
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-3 w-5 h-5 text-base-content/40" />
                <input
                  type="text"
                  placeholder="e.g. WH-01"
                  className="input input-bordered w-full pl-10 font-mono"
                  value={warehouse.shortCode}
                  onChange={(e) => handleChange('shortCode', e.target.value)}
                />
              </div>
              <label className="label">
                <span className="label-text-alt text-base-content/50">Used for generating sequence numbers (e.g. WH/IN/001)</span>
              </label>
            </div>

            {/* Location/Visual Placeholder (Optional, fills empty space) */}
            <div className="hidden md:flex items-end justify-end opacity-10">
              <Building2 className="w-24 h-24" />
            </div>
          </div>

          {/* Address Field */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold text-base-content/70">Address</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-base-content/40" />
              <textarea
                className="textarea textarea-bordered w-full h-24 pl-10 text-base leading-relaxed"
                placeholder="Warehouse full address..."
                value={warehouse.address}
                onChange={(e) => handleChange('address', e.target.value)}
              ></textarea>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;
