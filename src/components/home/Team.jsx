import React, { useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../common/Avatar";
import AOS from "aos";
import "aos/dist/aos.css";

const Team = () => {
	useEffect(() => {
		AOS.init({
			duration: 1000,
			easing: "ease-in-out",
			once: true,
		});
	}, []);

	return (
		<section
			id="team"
			className="w-full py-12 md:py-24 lg:py-32 bg-muted flex flex-col items-center justify-center"
		>
			<div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
				<div className="space-y-3" data-aos="fade-up">
					<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
						Meet Our Team
					</h2>
					<p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
						Our team of highly trained medical professionals is dedicated to
						providing the best possible care.
					</p>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{teamMembers.map((member, index) => (
						<div
							key={index}
							className="flex flex-col items-center justify-center space-y-2"
							data-aos="fade-up"
							data-aos-delay={index * 100}
						>
							<Avatar>
								<AvatarImage src={member.image} alt={member.name} />
								<AvatarFallback>{member.initials}</AvatarFallback>
							</Avatar>
							<div className="text-center">
								<h3 className="text-lg font-bold">{member.name}</h3>
								<p className="text-sm text-muted-foreground">{member.role}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

const teamMembers = [
	{
		name: "Dr. Jane Doe",
		role: "Emergency Physician",
		image: "logo.svg",
		initials: "JD",
	},
	{
		name: "Dr. John Smith",
		role: "Paramedic",
		image: "logo.svg",
		initials: "JS",
	},
	{
		name: "Dr. Sarah Lee",
		role: "Registered Nurse",
		image: "logo.svg",
		initials: "SL",
	},
	{
		name: "Dr. Michael Chen",
		role: "Emergency Medical Technician",
		image: "logo.svg",
		initials: "MC",
	},
];

export default Team;
