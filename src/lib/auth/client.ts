const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const mockUsers: User[] = [
	{
		id: "1",
		name: "John Doe",
		email: "john@example.com",
		phoneNumber: "1234567890",
		location: { latitude: 40.7128, longitude: -74.006 },
		authenticationProviders: { custom: "custom-id" },
		emergencyContacts: [
			{ name: "Jane Doe", phoneNumber: "0987654321", relationship: "Spouse" },
		],
	},
];

const mockHospitals: Hospital[] = [
	{
		id: "1",
		name: "City General Hospital",
		address: "123 Main St, City, State 12345",
		location: { latitude: 40.7128, longitude: -74.006 },
		phoneNumber: "1234567890",
		specialties: ["Emergency", "Cardiology", "Neurology"],
		rating: 4.5,
		availableBeds: 10,
		waitTime: "30 minutes",
		ambulances: 5,
		type: "Premium",
		price: { Emergency: 1000, Cardiology: 1500, Neurology: 2000 },
		image: "https://example.com/hospital1.jpg",
	},
	{
		id: "2",
		name: "St. Mary's Medical Center",
		distance: "0.8 km",
		specialties: ["General Care", "Neurology", "Pediatrics"],
		availableBeds: 3,
		rating: 4.9,
		waitTime: "15 mins",
		eta: "5 mins",
		ambulances: 2,
		type: "Premium",
		price: "$180",
		image:
			"https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=300&h=200",
	},
	{
		id: "3",
		name: "Emergency Care Unit",
		distance: "1.0 km",
		specialties: ["Emergency", "Orthopedics", "General Care"],
		availableBeds: 7,
		rating: 4.7,
		waitTime: "5 mins",
		eta: "6 mins",
		ambulances: 4,
		type: "Standard",
		price: "$120",
		image:
			"https://images.unsplash.com/photo-1626315869436-d6781ba69d6f?auto=format&fit=crop&q=80&w=300&h=200",
	},
];

export const fetchUser = async (id: string): Promise<User | null> => {
	await delay(500);
	return mockUsers.find((user) => user.id === id) || null;
};

export const fetchHospitals = async (): Promise<Hospital[]> => {
	await delay(500);
	return mockHospitals;
};

export const createBooking = async (
	booking: Omit<Booking, "id">
): Promise<Booking> => {
	await delay(500);
	const newBooking: Booking = {
		...booking,
		id: Math.random().toString(36).substr(2, 9),
		status: "pending",
		bookingTime: new Date(),
	};
	return newBooking;
};
