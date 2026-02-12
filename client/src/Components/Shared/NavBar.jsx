import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import {
  RiHome6Line,
  RiUser3Line,
  RiImageAddLine,
  RiLogoutBoxRLine,
  RiMenuLine,
  RiCloseLine,
} from "react-icons/ri";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { removeToken } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <>
      {/* 🔥 Mobile Top Bar */}
      <header className="md:hidden fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm border-b border-zinc-200 z-[100] flex items-center justify-between px-6 py-4">
        <button onClick={() => setOpen(true)} className="p-2 -ml-2 text-zinc-700 active:bg-zinc-100 rounded-lg transition-colors">
          <RiMenuLine className="text-2xl" />
        </button>

        <h1 className="text-xl font-bold text-zinc-900 tracking-tight">
          MEMORIES
        </h1>

        <button
          onClick={handleLogout}
          className="text-sm text-zinc-600 font-medium hover:text-zinc-900 transition-colors"
        >
          Logout
        </button>
      </header>

      {/* 🔥 Overlay (Mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-[110] md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 🔥 Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-white border-r border-zinc-200 flex flex-col p-6 transition-transform duration-300 ease-out z-[120]
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Mobile Close Button & Header */}
        <div className="flex justify-between items-center mb-10 md:hidden">
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
            MEMORIES
          </h1>
          <button onClick={() => setOpen(false)} className="p-2 -mr-2 text-zinc-500 hover:text-zinc-900 rounded-full hover:bg-zinc-100 transition-all">
            <RiCloseLine className="text-2xl" />
          </button>
        </div>

        {/* Desktop Logo */}
        <div className="hidden md:flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <h1 className="text-xl font-bold text-zinc-900 tracking-tight">
            Memories
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          <NavItem to="/home" icon={<RiHome6Line />} label="Home" onClick={() => setOpen(false)} />
          <NavItem to="/memory" icon={<RiImageAddLine />} label="Add Memory" onClick={() => setOpen(false)} />
          <NavItem to="/profile" icon={<RiUser3Line />} label="Profile" onClick={() => setOpen(false)} />
        </nav>

        {/* Logout */}
        <div className="pt-6 border-t border-zinc-100 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-600 font-medium hover:bg-zinc-50 hover:text-red-600 transition-all group"
          >
            <RiLogoutBoxRLine className="text-xl group-hover:scale-110 transition-transform" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

const NavItem = ({ to, icon, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium duration-200 group
      ${isActive
        ? "bg-zinc-900 text-white shadow-md shadow-zinc-900/10"
        : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
      }`
    }
  >
    <span className="text-xl transition-transform duration-200 group-hover:scale-110 group-active:scale-95">{icon}</span>
    {label}
  </NavLink>
);

export default NavBar;
