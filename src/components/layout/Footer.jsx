import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="bg-primary text-primary-foreground p-6 md:py-12 w-full">
			<div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
				<div className="grid gap-1">
					<h3 className="font-semibold">About</h3>
					<Link href="#" prefetch={false}>
						Our Mission
					</Link>
					<Link href="#" prefetch={false}>
						Our History
					</Link>
					<Link href="#" prefetch={false}>
						Careers
					</Link>
				</div>
				<div className="grid gap-1">
					<h3 className="font-semibold">Services</h3>
					<Link href="#" prefetch={false}>
						Emergency Response
					</Link>
					<Link href="#" prefetch={false}>
						Advanced Medical Care
					</Link>
					<Link href="#" prefetch={false}>
						Compassionate Service
					</Link>
				</div>
				<div className="grid gap-1">
					<h3 className="font-semibold">Resources</h3>
					<Link href="#" prefetch={false}>
						FAQs
					</Link>
					<Link href="#" prefetch={false}>
						Blog
					</Link>
					<Link href="#" prefetch={false}>
						Community
					</Link>
				</div>
				<div className="grid gap-1">
					<h3 className="font-semibold">Legal</h3>
					<Link href="#" prefetch={false}>
						Privacy Policy
					</Link>
					<Link href="#" prefetch={false}>
						Terms of Service
					</Link>
				</div>
				<div className="grid gap-1">
					<h3 className="font-semibold">Contact</h3>
					<Link href="#" prefetch={false}>
						Phone: 555-555-5555
					</Link>
					<Link href="#" prefetch={false}>
						Email: info@ivisit.com
					</Link>
					<Link href="#" prefetch={false}>
						Address: 123 Main St, Anytown USA
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
