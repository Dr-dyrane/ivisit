import React from 'react';
import { Link } from "react-router-dom";
import { AmbulanceIcon } from "../common/AmbulanceIcon";



const Navbar = () => {
  return (
    <header className="bg-primary text-primary-foreground px-4 lg:px-6 h-14 flex items-center">
    <Link href="#" className="flex items-center justify-center">
        <AmbulanceIcon className="size-6 text-pink-400" />
        <span className="sr-only">iVisit</span>
    </Link>
    <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
        >
            About
        </Link>
        <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
        >
            Team
        </Link>
        <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
        >
            Contact
        </Link>
    </nav>
</header>
  );
};

export default Navbar;
