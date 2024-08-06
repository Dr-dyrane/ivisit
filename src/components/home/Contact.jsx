import React from "react";

const Contact = () => {
	return (
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
							Have a question or need emergency assistance? Fill out the form
							below and one of our team members will be in touch shortly.
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
							className="w-full inline-flex justify-center py-3 md:py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-dark-dark hover:bg-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark sm:text-base md:text-lg lg:text-xl xl:text-2xl"
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Contact;
