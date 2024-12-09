import { fetchUser } from "./client";

export const login = async (credentials: {
	email: string;
	password: string;
}) => {
	// Simulate API call
	await new Promise((resolve) => setTimeout(resolve, 1000));

	return fetchUser("1");

	throw new Error("Invalid credentials");
};

export const register = async (userData: {
	name: string;
	email: string;
	password: string;
}) => {
	// Simulate API call
	await new Promise((resolve) => setTimeout(resolve, 1000));

	// In a real app, you'd create a new user here
	return {
		id: "2",
		name: userData.name,
		email: userData.email,
		// ... other user properties
	};
};

export const logout = async () => {
	// Simulate API call
	await new Promise((resolve) => setTimeout(resolve, 500));
	// In a real app, you'd invalidate the session here
};
