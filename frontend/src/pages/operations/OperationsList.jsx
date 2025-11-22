import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
import { Search, List, LayoutGrid, Plus, Filter, MoreHorizontal, Calendar, User, MapPin } from 'lucide-react';

const OperationsList = () => {
  const { type } = useParams();

  // --- STATE MANAGEMENT ---
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'kanban'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'draft' | 'ready' | 'done'

  // --- CONFIGURATION ---
  const config = {
    receipts: { title: 'Receipts', contactLabel: 'Vendor', fromLabel: 'Source', toLabel: 'Destination' },
    deliveries: { title: 'Deliveries', contactLabel: 'Customer', fromLabel: 'Warehouse', toLabel: 'Destination' },
    internal: { title: 'Internal Transfers', contactLabel: 'Contact', fromLabel: 'From', toLabel: 'To' },
    all: { title: 'All Operations', contactLabel: 'Contact', fromLabel: 'From', toLabel: 'To' }
  };

  const currentConfig = config[type] || config.all;

  // --- MOCK DATA ---
  const allOperations = [
    {
      id: 1,
      type: 'receipts',
      reference: 'WH/IN/0001',
      from: 'Vendor: Azure',
      to: 'WH/Stock',
      contact: 'Azure Interior',
      scheduleDate: '2025-10-24',
      status: 'Ready',
    },
    {
      id: 2,
      type: 'receipts',
      reference: 'WH/IN/0002',
      from: 'Vendor: Gemini',
      to: 'WH/Stock',
      contact: 'Gemini Furniture',
      scheduleDate: '2025-10-25',
      status: 'Done',
    },
    {
      id: 3,
      type: 'receipts',
      reference: 'WH/IN/0003',
      from: 'Vendor: Lumber Inc',
      to: 'WH/Stock',
      contact: 'Lumber Inc',
      scheduleDate: '2025-10-28',
      status: 'Draft',
    },
    {
      id: 4,
      type: 'deliveries',
      reference: 'WH/OUT/0050',
      from: 'WH/Stock',
      to: 'Cust: Deco Addict',
      contact: 'Deco Addict',
      scheduleDate: '2025-10-26',
      status: 'Draft',
    },
    {
      id: 5,
      type: 'deliveries',
      reference: 'WH/OUT/0051',
      from: 'WH/Stock',
      to: 'Cust: Ready Mat',
      contact: 'Ready Mat',
      scheduleDate: '2025-10-27',
      status: 'Waiting',
    }
  ];

  // --- FILTERING LOGIC ---
  const filteredOperations = allOperations.filter(op => {
    // 1. Filter by URL Type (receipts vs deliveries)
    const matchesType = type ? op.type === type : true;

    // 2. Filter by Search Term (Reference or Contact)
    const term = searchTerm.toLowerCase();
    const matchesSearch = op.reference.toLowerCase().includes(term) ||
      op.contact.toLowerCase().includes(term);

    // 3. Filter by Status Dropdown
    const matchesStatus = statusFilter === 'all' ? true : op.status.toLowerCase() === statusFilter;

    return matchesType && matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'ready': return 'badge-success';
      case 'done': return 'badge-neutral';
      case 'draft': return 'badge-ghost';
      case 'waiting': return 'badge-warning';
      default: return 'badge-ghost';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">

      {/* --- HEADER & CONTROLS --- */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">

        {/* Title & New Button */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <h1 className="text-3xl font-bold text-base-content">{currentConfig.title}</h1>
          {type && (
            <Link to={`/operations/${type}/new`} className="btn btn-primary btn-sm gap-2">
              <Plus className="w-4 h-4" />
              New
            </Link>
          )}
        </div>

        {/* Search, Filter, Layout Switcher */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">

          {/* Search Bar */}
          <div className="join w-full md:w-auto shadow-sm">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder={`Search ${currentConfig.contactLabel}...`}
                className="input input-bordered input-sm w-full join-item pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
            </div>

            {/* Filter Dropdown */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className={`btn btn-sm join-item btn-square ${statusFilter !== 'all' ? 'btn-active' : ''}`}>
                <Filter className="w-4 h-4" />
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-1 border border-base-200">
                <li className="menu-title">Filter by Status</li>
                <li><a className={statusFilter === 'all' ? 'active' : ''} onClick={() => setStatusFilter('all')}>All</a></li>
                <li><a className={statusFilter === 'ready' ? 'active' : ''} onClick={() => setStatusFilter('ready')}>Ready</a></li>
                <li><a className={statusFilter === 'waiting' ? 'active' : ''} onClick={() => setStatusFilter('waiting')}>Waiting</a></li>
                <li><a className={statusFilter === 'done' ? 'active' : ''} onClick={() => setStatusFilter('done')}>Done</a></li>
                <li><a className={statusFilter === 'draft' ? 'active' : ''} onClick={() => setStatusFilter('draft')}>Draft</a></li>
              </ul>
            </div>
          </div>

          {/* Layout Switcher */}
          <div className="join border border-base-300 rounded-lg ml-2 shadow-sm">
            <button
              className={`btn btn-sm btn-ghost join-item ${viewMode === 'list' ? 'bg-base-200' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              className={`btn btn-sm btn-ghost join-item ${viewMode === 'kanban' ? 'bg-base-200' : ''}`}
              onClick={() => setViewMode('kanban')}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* --- VIEW: LIST (TABLE) --- */}
      {viewMode === 'list' && (
        <div className="overflow-x-auto bg-base-100 shadow-sm border border-base-200 rounded-lg">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-base-content/70 uppercase text-xs font-bold">
              <tr>
                <th className="py-4">Reference</th>
                <th>{currentConfig.fromLabel}</th>
                <th>{currentConfig.toLabel}</th>
                <th>{currentConfig.contactLabel}</th>
                <th>Schedule Date</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOperations.map((op) => (
                <tr key={op.id} className="hover group">
                  <td className="font-medium font-mono text-primary">
                    <Link to={`/operations/${op.type}/${op.id}`} className="hover:underline">
                      {op.reference}
                    </Link>
                  </td>
                  <td>{op.from}</td>
                  <td>{op.to}</td>
                  <td className="font-medium">{op.contact}</td>
                  <td className="text-base-content/70">{op.scheduleDate}</td>
                  <td>
                    <div className={`badge ${getStatusColor(op.status)} badge-sm font-semibold border-0`}>
                      {op.status.toUpperCase()}
                    </div>
                  </td>
                  <td className="text-right">
                    <button className="btn btn-ghost btn-xs transition-opacity text-base-800">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- VIEW: KANBAN (GRID) --- */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOperations.map((op) => (
            <div key={op.id} className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all">
              <div className="card-body p-5">
                <div className="flex justify-between items-start mb-2">
                  <Link to={`/operations/${op.type}/${op.id}`} className="text-lg font-bold font-mono text-primary hover:underline">
                    {op.reference}
                  </Link>
                  <div className={`badge ${getStatusColor(op.status)} font-semibold border-0`}>
                    {op.status}
                  </div>
                </div>

                <div className="space-y-2 text-sm text-base-content/80 my-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 opacity-70" />
                    <span className="font-medium">{op.contact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 opacity-70" />
                    <div className="flex gap-1 text-xs">
                      <span>{op.from}</span>
                      <span>→</span>
                      <span>{op.to}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-base-content/60">
                    <Calendar className="w-4 h-4 opacity-70" />
                    <span>{op.scheduleDate}</span>
                  </div>
                </div>

                <div className="card-actions justify-end mt-2">
                  <Link to={`/operations/${op.type}/${op.id}`} className="btn btn-xs btn-ghost">View</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- EMPTY STATE --- */}
      {filteredOperations.length === 0 && (
        <div className="text-center py-20 opacity-50 border border-dashed border-base-300 rounded-lg bg-base-100 mt-4">
          <p className="text-lg font-medium">No operations found</p>
          <p className="text-sm">Try adjusting your search or filters.</p>
        </div>
      )}

    </div>
  );
};

export default OperationsList;
