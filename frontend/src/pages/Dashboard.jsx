import { Link, useNavigate } from 'react-router'; // v7 imports
import { ArrowRight, AlertCircle, Layers, Truck, Archive } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data
  const stats = {
    receipts: {
      toReceive: 4,
      late: 1,
      totalOperations: 6,
    },
    deliveries: {
      toDeliver: 4,
      late: 1,
      waiting: 2,
      totalOperations: 6,
    }
  };

  return (
    <div className="p-6 lg:p-10 w-full max-w-7xl mx-auto">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

        {/* --- RECEIPT CARD --- */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <div className="flex justify-between items-start mb-4">
              <h2 className="card-title text-2xl font-light">Receipt</h2>
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Archive className="w-6 h-6" />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              {/* Primary Action */}
              <Link
                to="/operations/receipts"
                className="btn btn-primary btn-outline h-auto py-4 px-6 flex flex-col gap-1 min-w-[160px]"
              >
                <span className="text-3xl font-bold">{stats.receipts.toReceive}</span>
                <span className="text-xs uppercase tracking-widest font-semibold">To Receive</span>
              </Link>

              {/* Status Details */}
              <div className="flex flex-col gap-2">
                {stats.receipts.late > 0 && (
                  <div className="badge badge-error gap-2 p-3 h-auto">
                    <AlertCircle className="w-4 h-4" />
                    <span className="font-semibold">{stats.receipts.late} Late</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-base-content/70">
                  <Layers className="w-4 h-4" />
                  <span>{stats.receipts.totalOperations} operations</span>
                </div>
              </div>
            </div>

            <div className="card-actions justify-end mt-6 pt-4 border-t border-base-200">
              <button
                onClick={() => navigate('/operations/receipts')}
                className="btn btn-ghost btn-sm gap-2"
              >
                Process Receipts <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* --- DELIVERY CARD --- */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <div className="flex justify-between items-start mb-4">
              <h2 className="card-title text-2xl font-light">Delivery</h2>
              <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                <Truck className="w-6 h-6" />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              {/* Primary Action */}
              <Link
                to="/operations/deliveries"
                className="btn btn-secondary btn-outline h-auto py-4 px-6 flex flex-col gap-1 min-w-[160px]"
              >
                <span className="text-3xl font-bold">{stats.deliveries.toDeliver}</span>
                <span className="text-xs uppercase tracking-widest font-semibold">To Deliver</span>
              </Link>

              {/* Status Details */}
              <div className="flex flex-col gap-2">
                {stats.deliveries.late > 0 && (
                  <div className="badge badge-error gap-2 p-3 h-auto">
                    <AlertCircle className="w-4 h-4" />
                    <span className="font-semibold">{stats.deliveries.late} Late</span>
                  </div>
                )}
                {stats.deliveries.waiting > 0 && (
                  <div className="badge badge-warning gap-2 p-3 h-auto">
                    <span className="font-semibold">{stats.deliveries.waiting} Waiting</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-base-content/70">
                  <Layers className="w-4 h-4" />
                  <span>{stats.deliveries.totalOperations} operations</span>
                </div>
              </div>
            </div>

            <div className="card-actions justify-end mt-6 pt-4 border-t border-base-200">
              <button
                onClick={() => navigate('/operations/deliveries')}
                className="btn btn-ghost btn-sm gap-2"
              >
                Process Deliveries <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
