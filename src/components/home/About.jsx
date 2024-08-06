import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const About = () => {
	useEffect(() => {
		AOS.init({
			duration: 1000, // Animation duration
			easing: "ease-in-out", // Animation easing
			once: true, // Whether animation should happen only once
		});
	}, []);

	return (
		<section
			id="about"
			className="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center bg-background text-foreground"
		>
			<div className="container space-y-12 px-4 md:px-6">
				<div
					className="flex flex-col items-center justify-center space-y-4 text-center"
					data-aos="fade-up"
				>
					<div className="space-y-2">
						<div
							className="inline-block rounded-lg bg-muted px-3 py-2 text-sm"
							data-aos="fade-up"
						>
							About Us
						</div>
						<h2
							className="text-3xl font-bold tracking-tighter sm:text-5xl"
							data-aos="fade-up"
						>
							Dedicated to Saving Lives
						</h2>
						<p
							className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
							data-aos="fade-up"
						>
							Our team of highly trained medical professionals is committed to
							providing rapid response and expert care in times of emergency. We
							are available 24/7 to assist you when you need it most.
						</p>
					</div>
				</div>
				<div
					className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3"
					data-aos="fade-up"
				>
					{features.map((feature, index) => (
						<div key={index} className="grid gap-1 p-4 rounded-xl bg-muted">
							<h3 className="text-lg font-bold">{feature.title}</h3>
							<p className="text-sm text-muted-foreground">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default About;

const features = [
	{
		title: "Emergency Response",
		description:
			"Our team is trained to respond quickly and efficiently to emergency situations, providing life-saving care on the scene.",
	},
	{
		title: "Advanced Medical Care",
		description:
			"Our medical professionals are equipped with the latest technology and equipment to provide the highest level of care.",
	},
	{
		title: "Compassionate Service",
		description:
			"We understand that emergencies can be stressful, which is why we strive to provide compassionate and empathetic care to all our patients.",
	},
	{
		title: "Continuous Improvement",
		description:
			"We continuously update our protocols and training to ensure we provide the most effective and up-to-date care available.",
	},
];
