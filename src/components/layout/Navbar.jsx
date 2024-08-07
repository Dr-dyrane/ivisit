import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AmbulanceIcon } from "../common/AmbulanceIcon";
import menuItems from "../data/menu.json";

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="bg-primary sticky z-50 top-0 overflow-hidden text-primary-foreground px-4 lg:px-6 h-14 flex items-center">
      <Link to="/" className="flex items-center justify-center">
        <AmbulanceIcon className="size-6 text-red-500" />
        <span className="sr-only">iVisit</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        {menuItems.menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.link}
            className={`text-sm font-medium hover:underline underline-offset-4 ${
              location.pathname === item.link ? "underline" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
        <Link
          to="/register"
          className="flex items-center text-xs border border-red-400 rounded-lg px-2 py-1 text-red-400 transition-colors duration-300 ease-in-out hover:bg-red-400 hover:text-white focus:bg-red-500 focus:text-white focus:outline-none focus:ring-1 focus:ring-red-300"
          data-aos="fade-left"
        >
          SOS
          <span className="sr-only">Get Help</span>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;