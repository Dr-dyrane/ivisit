import React from "react";

const About = () => {
	return (
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
							Our team of highly trained medical professionals is committed to
							providing rapid response and expert care in times of emergency. We
							are available 24/7 to assist you when you need it most.
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
							Our medical professionals are equipped with the latest technology
							and equipment to provide the highest level of care.
						</p>
					</div>
					<div className="grid gap-1">
						<h3 className="text-lg font-bold">Compassionate Service</h3>
						<p className="text-sm text-muted-foreground">
							We understand that emergencies can be stressful, which is why we
							strive to provide compassionate and empathetic care to all our
							patients.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
