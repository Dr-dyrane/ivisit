import React from "react";
import { Link } from "react-router-dom";
import { AmbulanceIcon } from "../components/common/AmbulanceIcon";

import {
	Avatar,
	AvatarImage,
	AvatarFallback,
} from "../components/common/Avatar";

export default function Home() {
	return (
		<div className="flex flex-col min-h-dvh">
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
			<main className="flex-1">
				<section id="hero"
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
				<section id="about" className="w-full py-12 md:py-24 lg:py-32">
					<div className="container space-y-12 px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<div className="inline-block rounded-lg bg-muted px-3 py-2 text-sm">
									About Us
								</div>
								<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
									Dedicated to Saving Lives
								</h2>
								<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									Our team of highly trained medical professionals is committed
									to providing rapid response and expert care in times of
									emergency. We are available 24/7 to assist you when you need
									it most.
								</p>
							</div>
						</div>
						<div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
							<div className="grid gap-1">
								<h3 className="text-lg font-bold">Emergency Response</h3>
								<p className="text-sm text-muted-foreground">
									Our team is trained to respond quickly and efficiently to
									emergency situations, providing life-saving care on the scene.
								</p>
							</div>
							<div className="grid gap-1">
								<h3 className="text-lg font-bold">Advanced Medical Care</h3>
								<p className="text-sm text-muted-foreground">
									Our medical professionals are equipped with the latest
									technology and equipment to provide the highest level of care.
								</p>
							</div>
							<div className="grid gap-1">
								<h3 className="text-lg font-bold">Compassionate Service</h3>
								<p className="text-sm text-muted-foreground">
									We understand that emergencies can be stressful, which is why
									we strive to provide compassionate and empathetic care to all
									our patients.
								</p>
							</div>
						</div>
					</div>
				</section>
				<section id="team" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
					<div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
						<div className="space-y-3">
							<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
								Meet Our Team
							</h2>
							<p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Our team of highly trained medical professionals is dedicated to
								providing the best possible care.
							</p>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
							<div className="flex flex-col items-center justify-center space-y-2">
								<Avatar>
									<AvatarImage src="vite.svg" alt="Dr. Jane Doe" />
									<AvatarFallback>JD</AvatarFallback>
								</Avatar>
								<div className="text-center">
									<h3 className="text-lg font-bold">Dr. Jane Doe</h3>
									<p className="text-sm text-muted-foreground">
										Emergency Physician
									</p>
								</div>
							</div>
							<div className="flex flex-col items-center justify-center space-y-2">
								<Avatar>
									<AvatarImage src="vite.svg" alt="Dr. John Smith" />
									<AvatarFallback>JS</AvatarFallback>
								</Avatar>
								<div className="text-center">
									<h3 className="text-lg font-bold">Dr. John Smith</h3>
									<p className="text-sm text-muted-foreground">Paramedic</p>
								</div>
							</div>
							<div className="flex flex-col items-center justify-center space-y-2">
								<Avatar>
									<AvatarImage src="vite.svg" alt="Dr. Sarah Lee" />
									<AvatarFallback>SL</AvatarFallback>
								</Avatar>
								<div className="text-center">
									<h3 className="text-lg font-bold">Dr. Sarah Lee</h3>
									<p className="text-sm text-muted-foreground">
										Registered Nurse
									</p>
								</div>
							</div>
							<div className="flex flex-col items-center justify-center space-y-2">
								<Avatar>
									<AvatarImage src="vite.svg" alt="Dr. Michael Chen" />
									<AvatarFallback>MC</AvatarFallback>
								</Avatar>
								<div className="text-center">
									<h3 className="text-lg font-bold">Dr. Michael Chen</h3>
									<p className="text-sm text-muted-foreground">
										Emergency Medical Technician
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section id="contact" className="w-full py-12 md:py-24 lg:py-32">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<div className="inline-block rounded-lg bg-muted px-3 py-2 text-sm">
									Contact Us
								</div>
								<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
									Get in Touch
								</h2>
								<p className="max-w-[900px] text-muted-foreground text-base md:text-lg lg:text-xl xl:text-2xl">
									Have a question or need emergency assistance? Fill out the
									form below and one of our team members will be in touch
									shortly.
								</p>
							</div>
						</div>
						<div className="mx-auto w-full max-w-md mt-8">
							<form className="space-y-4">
								<div className="space-y-2">
									<label
										htmlFor="name"
										className="block text-md font-medium text-primary"
									>
										Name
									</label>
									<input
										id="name"
										type="text"
										required
										className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:text-base lg:text-lg xl:text-xl"
									/>
								</div>
								<div className="space-y-2">
									<label
										htmlFor="email"
										className="block text-sm font-medium text-gray-700"
									>
										Email
									</label>
									<input
										id="email"
										type="email"
										required
										className="mt-1 p-2 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:text-base lg:text-lg xl:text-xl"
									/>
								</div>
								<div className="space-y-2">
									<label
										htmlFor="message"
										className="block text-sm font-medium text-gray-700"
									>
										Message
									</label>
									<textarea
										id="message"
										rows={4}
										required
										className="mt-1 p-2 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:text-base lg:text-lg xl:text-xl"
									/>
								</div>
								<button
									type="submit"
									className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-dark-dark hover:bg-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark sm:text-base md:text-lg lg:text-xl xl:text-2xl"
								>
									Submit
								</button>
							</form>
						</div>
					</div>
				</section>
			</main>
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
		</div>
	);
}
