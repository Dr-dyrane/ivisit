import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="bg-primary text-primary-foreground p-6 md:py-12 w-full">
			<div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
				<div className="grid gap-1">
					<h3 className="font-semibold">About</h3>
					<Link href="#">Our Mission</Link>
					<Link href="#">Our History</Link>
					<Link href="#">Careers</Link>
				</div>
				<div className="grid gap-1">
					<h3 className="font-semibold">Services</h3>
					<Link href="#">Emergency Response</Link>
					<Link href="#">Advanced Medical Care</Link>
					<Link href="#">Compassionate Service</Link>
				</div>
				<div className="grid gap-1">
					<h3 className="font-semibold">Resources</h3>
					<Link href="#">FAQs</Link>
					<Link href="#">Blog</Link>
					<Link href="#">Community</Link>
				</div>
				<div className="grid gap-1">
					<h3 className="font-semibold">Legal</h3>
					<Link href="#">Privacy Policy</Link>
					<Link href="#">Terms of Service</Link>
				</div>
				<div className="grid gap-1">
					<h3 className="font-semibold">Contact</h3>
					<Link href="#" className="text-xs">
						Phone: 081-5950-2463
					</Link>
					<Link href="#" className="text-xs">
						Email: info@ivisit.com
					</Link>
					<Link href="#" className="text-xs">
						Address: 123 Maryland, Lagos Nigeria
					</Link>
				</div>
			</div>
			<div className="text-center mt-4 flex flex-row space-x-4 w-full justify-center items-center">
				<img src="logo.svg" alt="Company Logo" className="w-4 h-4" />
				<p className="text-xs w-full flex flex-row">
				iVisit	&copy; {new Date().getFullYear()} . All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
