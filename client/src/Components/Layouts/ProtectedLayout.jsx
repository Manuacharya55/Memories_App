import { Outlet } from "react-router-dom";
import NavBar from "../Shared/NavBar";

const ProtectedLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar / Navbar */}
      <NavBar />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20 md:pt-0 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
