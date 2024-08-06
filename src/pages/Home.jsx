import React from "react";

import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Team from "../components/home/Team";
import Contact from "../components/home/Contact";

export default function Home() {
	return (
		<div className="flex flex-col min-h-dvh">
			<main className="flex-1">
				<Hero />
				<About />
				<Team />
				<Contact />
			</main>
		</div>
	);
}
