import { fetchUser } from "./client";

export const login = async (credentials: {
	email: string;
	password: string;
	provider?: string;
	providerId?: string;
}) => {
	// Simulate API call
	await new Promise((resolve) => setTimeout(resolve, 1000));

	// Handle social login
	if (credentials.provider && credentials.providerId) {
		// Return user from social auth
		return {
			id: credentials.providerId,
			name: credentials.email.split('@')[0], // Extract name from email for demo
			email: credentials.email,
			avatar: `https://api.dicebear.com/6.x/initials/svg?seed=${credentials.email}`,
			provider: credentials.provider,
			providerId: credentials.providerId,
		};
	}

	return fetchUser("1");

	throw new Error("Invalid credentials");
};

export const register = async (userData: {
	name: string;
	email: string;
	password: string;
	avatar?: string;
	provider?: string;
	providerId?: string;
}) => {
	// Simulate API call
	await new Promise((resolve) => setTimeout(resolve, 1000));

	// In a real app, you'd create a new user here
	return {
		id: userData.providerId || "2",
		name: userData.name,
		email: userData.email,
		avatar: userData.avatar || `https://api.dicebear.com/6.x/initials/svg?seed=${userData.email}`,
		provider: userData.provider,
		providerId: userData.providerId,
	};
};

export const logout = async () => {
	// Simulate API call
	await new Promise((resolve) => setTimeout(resolve, 500));
	// In a real app, you'd invalidate the session here
};
