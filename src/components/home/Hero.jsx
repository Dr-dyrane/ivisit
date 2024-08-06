import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const Hero = () => {
	useEffect(() => {
		AOS.init({
			duration: 1000, // Animation duration
			easing: "ease-in-out", // Animation easing
			once: true, // Whether animation should happen only once
		});
	}, []);

	return (
		<section
			id="hero"
			className="w-full pt-12 md:pt-24 lg:pt-32 bg-primary text-primary-foreground"
		>
			<div className="px-4 md:px-6 space-y-10 xl:space-y-16">
				<div
					className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16"
					data-aos="fade-up" // Add AOS attribute for animation
				>
					<div>
						<h1
							className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]"
							data-aos="fade-down" // Add AOS attribute for animation
						>
							iVisit
						</h1>
						<p
							className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
							data-aos="fade-up" // Add AOS attribute for animation
						>
							Providing rapid response and expert care in times of crisis.
						</p>
						<div className="space-x-4 mt-6">
							<Link
								to="#" // Use 'to' instead of 'href' for React Router
								className="inline-flex h-10 items-center justify-center rounded-md bg-secondary px-8 text-sm font-medium text-secondary-foreground shadow transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
								data-aos="fade-up" // Add AOS attribute for animation
							>
								Request Assistance
							</Link>
						</div>
					</div>
					<img
						src="placeholder.jpg"
						width="600"
						height="400"
						alt="Hero"
						className="mx-auto aspect-[3/2] overflow-hidden rounded-t-xl object-cover"
						data-aos="zoom-in" // Add AOS attribute for animation
					/>
				</div>
			</div>
		</section>
	);
};

export default Hero;
