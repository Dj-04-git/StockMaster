import { Link, NavLink } from "react-router";

export default function Navbar() {
  const links = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/operations', label: 'Operations' },
    { path: '/stock', label: 'Stock' },
    { path: '/move-history', label: 'Move History' },
    { path: '/settings', label: 'Settings' },
  ];

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1 flex-row">
        <ul className="menu menu-horizontal px-1 gap-1">
          <li><Link to='/' className="font-bold text-xl px-4 py-2 select-none hover:bg-transparent cursor-pointer pt-1">StockMaster</Link></li>

          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "font-bold underline decoration-2 underline-offset-4 active" : ""
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
