import { Link } from "react-router"

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <p className="btn btn-ghost text-xl">StockMaster</p>

        <ul className="menu menu-horizontal px-1">
          <li><Link to='/dashboard'>Dashboard</Link></li>
          <li><Link to='/operations'>Operations</Link></li>
          <li><Link to='/stock'>Stock</Link></li>
          <li><Link to='/move-history'>Move History</Link></li>
          <li><Link to='/settings'>Settings</Link></li>
        </ul>
      </div>
    </div>
  )
}
