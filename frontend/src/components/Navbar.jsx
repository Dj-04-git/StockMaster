import { Link, NavLink } from "react-router";

export default function Navbar() {
  const links = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/products', label: 'Products' },
    { path: '/operations', label: 'Operations' },
    { path: '/stock', label: 'Stock' },
    { path: '/move-history', label: 'Move History' },
    { path: '/settings', label: 'Settings' },
  ];

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1 flex-row">
        <ul className="menu menu-horizontal px-1 gap-1">
          <li><Link to='/' className="font-bold text-xl px-4 select-none hover:bg-transparent cursor-pointer">StockMaster</Link></li>

          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "font-bold underline decoration-2 underline-offset-4 active mt-1.5" : "mt-1.5"
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/register'>Register</Link></li>
        </ul>
      </div>
    </div>
  );
}
