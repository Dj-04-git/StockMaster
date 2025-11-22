import React, { useState } from 'react';
import { Link } from 'react-router';
import { Search, Filter, List, LayoutGrid, Plus, ArrowRight } from 'lucide-react';

const MoveHistory = () => {
  // Mock Data - Flattened structure to show multiple products per reference
  const [moves] = useState([
    {
      id: 1,
      reference: 'WH/IN/0001',
      date: '2025-10-24',
      contact: 'Azure Interior',
      from: 'Vendor',
      to: 'WH/Stock',
      product: '[DESK001] Large Desk',
      quantity: 50,
      status: 'Done',
      type: 'in' // used for color coding
    },
    {
      id: 2,
      reference: 'WH/IN/0001',
      date: '2025-10-24',
      contact: 'Azure Interior',
      from: 'Vendor',
      to: 'WH/Stock',
      product: '[Chair002] Office Chair',
      quantity: 20,
      status: 'Done',
      type: 'in'
    },
    {
      id: 3,
      reference: 'WH/OUT/0002',
      date: '2025-10-26',
      contact: 'Gemini Furniture',
      from: 'WH/Stock',
      to: 'Customer',
      product: '[DESK001] Large Desk',
      quantity: 5,
      status: 'Done',
      type: 'out'
    },
    {
      id: 4,
      reference: 'WH/OUT/0002',
      date: '2025-10-26',
      contact: 'Gemini Furniture',
      from: 'WH/Stock',
      to: 'Customer',
      product: '[Chair002] Office Chair',
      quantity: 10,
      status: 'Done',
      type: 'out'
    },
    {
      id: 5,
      reference: 'WH/INT/0005',
      date: '2025-10-27',
      contact: '-',
      from: 'WH/Stock',
      to: 'WH/Production',
      product: '[RAW-STEEL] Steel Rod 5mm',
      quantity: 100,
      status: 'Done',
      type: 'internal'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Filter Logic
  const filteredMoves = moves.filter(m =>
    m.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper to determine row color based on type
  const getRowStyle = (type) => {
    switch (type) {
      case 'in': return 'text-success font-medium'; // Green for incoming
      case 'out': return 'text-error font-medium';  // Red for outgoing
      default: return 'text-base-content';          // Normal for internal
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border-b border-base-300 pb-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <h1 className="text-3xl font-bold text-base-content">Move History</h1>
          <Link to="/operations/adjustments/new" className="btn btn-outline btn-sm gap-2">
            <Plus className="w-4 h-4" /> NEW
          </Link>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          {/* Search */}
          <div className="join w-full md:w-auto shadow-sm">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search Reference, Product..."
                className="input input-bordered input-sm w-full join-item pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
            </div>
            <button className="btn btn-sm join-item btn-square"><Filter className="w-4 h-4" /></button>
          </div>

          {/* View Toggles */}
          <div className="join border border-base-300 rounded-lg ml-2 shadow-sm">
            <button className="btn btn-sm btn-ghost join-item btn-active"><List className="w-4 h-4" /></button>
            <button className="btn btn-sm btn-ghost join-item"><LayoutGrid className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* --- TABLE --- */}
      <div className="overflow-x-auto bg-base-100 shadow-sm border border-base-200 rounded-lg min-h-[400px]">
        <table className="table table-zebra w-full text-sm">
          {/* Table Head */}
          <thead className="bg-base-200 text-base-content uppercase font-bold text-xs sticky top-0">
            <tr>
              <th className="py-3 pl-4">Reference</th>
              <th>Date</th>
              <th>Product</th>
              <th>Contact</th>
              <th>From</th>
              <th>To</th>
              <th className="text-right">Quantity</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredMoves.map((move) => (
              <tr key={move.id} className="hover">
                {/* Reference */}
                <td className="font-mono font-bold pl-4">
                  {move.reference}
                </td>

                {/* Date */}
                <td className="text-base-content/70 whitespace-nowrap">
                  {move.date}
                </td>

                {/* Product (Specific row per product logic) */}
                <td className="font-semibold text-base-content/80">
                  {move.product}
                </td>

                {/* Contact */}
                <td>{move.contact}</td>

                {/* From / To with Directional Logic */}
                <td className={getRowStyle(move.type === 'in' ? 'in' : 'normal')}>
                  {move.from}
                </td>
                <td className={getRowStyle(move.type === 'out' ? 'out' : 'normal')}>
                  {move.to}
                </td>

                {/* Quantity - Color Coded */}
                <td className={`text-right font-bold font-mono ${getRowStyle(move.type)}`}>
                  {move.type === 'in' ? '+' : move.type === 'out' ? '-' : ''}{move.quantity}
                </td>

                {/* Status */}
                <td className="text-center">
                  <div className="badge badge-success badge-outline badge-sm font-semibold">
                    {move.status.toUpperCase()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredMoves.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 opacity-50">
            <p>No moves found matching your search.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default MoveHistory;
