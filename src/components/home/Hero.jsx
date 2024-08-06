import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
	return (
		<section
			id="hero"
			className="w-full pt-12 md:pt-24 lg:pt-32 bg-primary text-primary-foreground"
		>
			<div className="px-4 md:px-6 space-y-10 xl:space-y-16">
				<div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
					<div>
						<h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-pink-400">
							iVisit
						</h1>
						<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
							Providing rapid response and expert care in times of crisis.
						</p>
						<div className="space-x-4 mt-6">
							<Link
								href="#"
								className="inline-flex h-10 items-center justify-center rounded-md bg-secondary px-8 text-sm font-medium text-secondary-foreground shadow transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
								prefetch={false}
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
					/>
				</div>
			</div>
		</section>
	);
};

export default Hero;
