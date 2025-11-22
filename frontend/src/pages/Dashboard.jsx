import { Link, useNavigate } from 'react-router'; // v7 imports from 'react-router'
import { ArrowRight, Clock, AlertCircle, Package } from 'lucide-react'; // Icons for better UX

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data based on your screenshot
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
    <div className="min-h-[calc(100vh-64px)] bg-[#0f0f0f] text-base-content p-6 lg:p-10 font-sans">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 border-b border-[#ff8fa3] pb-4">
        <h1 className="text-4xl font-bold text-[#ff8fa3] tracking-wide">Dashboard</h1>
        <div className="badge badge-lg bg-[#ff8fa3] text-black font-bold rounded-md p-4">
          4 Active Alerts
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">

        {/* 1. RECEIPT CARD */}
        <div className="card bg-[#161616] border-2 border-[#ff8fa3] shadow-[0_0_15px_rgba(255,143,163,0.1)] hover:shadow-[0_0_25px_rgba(255,143,163,0.2)] transition-all duration-300">
          <div className="card-body">
            <div className="flex justify-between items-start">
              <h2 className="card-title text-3xl font-light text-white mb-6">Receipt</h2>
              <Package className="text-[#ff8fa3] w-8 h-8 opacity-50" />
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Main Action Button */}
              <Link
                to="/operations/receipts"
                className="btn btn-lg h-24 w-full lg:w-auto bg-[#2a1b1e] border-[#ff8fa3] text-[#ff8fa3] hover:bg-[#ff8fa3] hover:text-black hover:border-[#ff8fa3] flex flex-col gap-1 group"
              >
                <span className="text-4xl font-bold">{stats.receipts.toReceive}</span>
                <span className="text-sm uppercase tracking-wider font-semibold group-hover:text-black">To Receive</span>
              </Link>

              {/* Sub Stats */}
              <div className="flex flex-col gap-3 w-full lg:w-auto">
                <div className="flex items-center gap-3 text-[#ff8fa3]">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-lg font-medium">
                    <span className="font-bold text-white">{stats.receipts.late}</span> Late
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Clock className="w-5 h-5" />
                  <span className="text-lg">
                    <span className="font-bold text-white">{stats.receipts.totalOperations}</span> operations
                  </span>
                </div>
              </div>
            </div>

            <div className="card-actions justify-end mt-6">
              <button
                onClick={() => navigate('/operations/receipts/new')}
                className="btn btn-ghost btn-sm text-gray-500 hover:text-[#ff8fa3] gap-2"
              >
                View Details <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 2. DELIVERY CARD */}
        <div className="card bg-[#161616] border-2 border-[#ff8fa3] shadow-[0_0_15px_rgba(255,143,163,0.1)] hover:shadow-[0_0_25px_rgba(255,143,163,0.2)] transition-all duration-300">
          <div className="card-body">
            <div className="flex justify-between items-start">
              <h2 className="card-title text-3xl font-light text-white mb-6">Delivery</h2>
              <Package className="text-[#ff8fa3] w-8 h-8 opacity-50" />
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Main Action Button */}
              <Link
                to="/operations/deliveries"
                className="btn btn-lg h-24 w-full lg:w-auto bg-[#2a1b1e] border-[#ff8fa3] text-[#ff8fa3] hover:bg-[#ff8fa3] hover:text-black hover:border-[#ff8fa3] flex flex-col gap-1 group"
              >
                <span className="text-4xl font-bold">{stats.deliveries.toDeliver}</span>
                <span className="text-sm uppercase tracking-wider font-semibold group-hover:text-black">To Deliver</span>
              </Link>

              {/* Sub Stats */}
              <div className="flex flex-col gap-3 w-full lg:w-auto">
                <div className="flex items-center gap-3 text-[#ff8fa3]">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-lg font-medium">
                    <span className="font-bold text-white">{stats.deliveries.late}</span> Late
                  </span>
                </div>
                <div className="flex items-center gap-3 text-warning">
                  <Clock className="w-5 h-5" />
                  <span className="text-lg font-medium">
                    <span className="font-bold text-white">{stats.deliveries.waiting}</span> waiting
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Clock className="w-5 h-5" />
                  <span className="text-lg">
                    <span className="font-bold text-white">{stats.deliveries.totalOperations}</span> operations
                  </span>
                </div>
              </div>
            </div>

            <div className="card-actions justify-end mt-6">
              <button
                onClick={() => navigate('/operations/deliveries/new')}
                className="btn btn-ghost btn-sm text-gray-500 hover:text-[#ff8fa3] gap-2"
              >
                View Details <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
