import React from "react";
import {
	Avatar,
	AvatarImage,
	AvatarFallback,
} from "../common/Avatar";

const Team = () => {
	return (
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
							<AvatarImage src="logo.svg" alt="Dr. Jane Doe" />
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
							<AvatarImage src="logo.svg" alt="Dr. John Smith" />
							<AvatarFallback>JS</AvatarFallback>
						</Avatar>
						<div className="text-center">
							<h3 className="text-lg font-bold">Dr. John Smith</h3>
							<p className="text-sm text-muted-foreground">Paramedic</p>
						</div>
					</div>
					<div className="flex flex-col items-center justify-center space-y-2">
						<Avatar>
							<AvatarImage src="logo.svg" alt="Dr. Sarah Lee" />
							<AvatarFallback>SL</AvatarFallback>
						</Avatar>
						<div className="text-center">
							<h3 className="text-lg font-bold">Dr. Sarah Lee</h3>
							<p className="text-sm text-muted-foreground">Registered Nurse</p>
						</div>
					</div>
					<div className="flex flex-col items-center justify-center space-y-2">
						<Avatar>
							<AvatarImage src="logo.svg" alt="Dr. Michael Chen" />
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
	);
};

export default Team;
