import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressCard from "../components/auth/AddressCard";
import NavBar from "../components/auth/nav";
import { useSelector } from "react-redux";
import axios from "../axiosConfig";

export default function Profile() {
	// Retrieve email from Redux state
	const email = useSelector((state) => state.user.email);
	const [personalDetails, setPersonalDetails] = useState({
		name: "",
		email: "",
		phoneNumber: "",
		avatarUrl: "",
	});
	const [addresses, setAddresses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState("profile");
	const navigate = useNavigate();

	useEffect(() => {
		// Only fetch profile if email exists
		if (!email) return;
		setLoading(true);
		axios
			.get("/api/v2/user/profile", { params: { email } })
			.then((res) => {
				setPersonalDetails(res.data.user);
				setAddresses(res.data.addresses);
				setLoading(false);
			})
			.catch((err) => {
				console.error(err);
				setLoading(false);
			});
	}, [email]);

	const handleAddAddress = () => {
		navigate("/create-address");
	};

	if (loading) {
		return (
			<>
				<NavBar />
				<div className="w-full min-h-screen bg-gradient-to-b from-neutral-800 to-neutral-900 flex items-center justify-center">
					<div className="animate-pulse flex flex-col items-center">
						<div className="w-16 h-16 border-4 border-t-purple-500 border-neutral-200 rounded-full animate-spin mb-4"></div>
						<p className="text-xl text-purple-400 font-semibold">Loading your profile...</p>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<NavBar />
			<div className="w-full min-h-screen bg-gradient-to-b from-neutral-800 to-neutral-900 py-8 px-4 sm:px-6 lg:px-8">
				<div className="max-w-5xl mx-auto">
					{/* Profile Header */}
					<div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-xl p-6 mb-8 shadow-xl backdrop-blur-sm border border-purple-500/20">
						<div className="flex flex-col md:flex-row items-center gap-6">
							<div className="relative group">
								<div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg group-hover:border-blue-500 transition-all duration-300">
									<img
										src={personalDetails.avatarUrl ? `http://localhost:8000/${personalDetails.avatarUrl}` : `https://cdn.vectorstock.com/i/500p/17/61/male-avatar-profile-picture-vector-10211761.jpg`}
										alt="profile"
										className="w-full h-full object-cover"
										onError={(e) => {
											e.target.onerror = null;
											e.target.src = "https://cdn.vectorstock.com/i/500x500/17/61/male-avatar-profile-picture-vector-10211761.jpg";
										}}
									/>
								</div>
								<div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
									<span className="text-white text-sm">Change Photo</span>
								</div>
							</div>
							<div className="flex-1 text-center md:text-left">
								<h1 className="text-3xl font-bold text-white mb-2">{personalDetails.name}</h1>
								<div className="flex flex-col sm:flex-row gap-4 text-neutral-300">
									<div className="flex items-center">
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
											<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
											<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
										</svg>
										<span>{personalDetails.email}</span>
									</div>
									<div className="flex items-center">
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
											<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
										</svg>
										<span>{personalDetails.phoneNumber || "No phone number"}</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Navigation Tabs */}
					<div className="flex border-b border-neutral-700 mb-6">
						<button
							onClick={() => setActiveTab("profile")}
							className={`px-6 py-3 font-medium text-sm transition-all duration-200 ${
								activeTab === "profile"
									? "text-purple-400 border-b-2 border-purple-500"
									: "text-neutral-400 hover:text-white"
							}`}
						>
							Profile Details
						</button>
						<button
							onClick={() => setActiveTab("addresses")}
							className={`px-6 py-3 font-medium text-sm transition-all duration-200 ${
								activeTab === "addresses"
									? "text-purple-400 border-b-2 border-purple-500"
									: "text-neutral-400 hover:text-white"
							}`}
						>
							Addresses
						</button>
						<button
							onClick={() => setActiveTab("orders")}
							className={`px-6 py-3 font-medium text-sm transition-all duration-200 ${
								activeTab === "orders"
									? "text-purple-400 border-b-2 border-purple-500"
									: "text-neutral-400 hover:text-white"
							}`}
						>
							Orders
						</button>
					</div>

					{/* Profile Details Tab */}
					{activeTab === "profile" && (
						<div className="bg-neutral-800/50 rounded-xl p-6 shadow-lg border border-neutral-700">
							<h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
									<path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
								</svg>
								Personal Information
							</h2>
							
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="bg-neutral-700/50 p-4 rounded-lg">
									<div className="text-sm text-neutral-400 mb-1">Full Name</div>
									<div className="text-lg text-white font-medium">{personalDetails.name}</div>
								</div>
								
								<div className="bg-neutral-700/50 p-4 rounded-lg">
									<div className="text-sm text-neutral-400 mb-1">Email Address</div>
									<div className="text-lg text-white font-medium break-all">{personalDetails.email}</div>
								</div>
								
								<div className="bg-neutral-700/50 p-4 rounded-lg">
									<div className="text-sm text-neutral-400 mb-1">Phone Number</div>
									<div className="text-lg text-white font-medium">
										{personalDetails.phoneNumber || "Not provided"}
									</div>
								</div>
								
								<div className="bg-neutral-700/50 p-4 rounded-lg">
									<div className="text-sm text-neutral-400 mb-1">Account Created</div>
									<div className="text-lg text-white font-medium">
										{personalDetails.createdAt 
											? new Date(personalDetails.createdAt).toLocaleDateString() 
											: "Unknown"}
									</div>
								</div>
							</div>
							
							<div className="mt-8 flex justify-end">
								<button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 flex items-center">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
										<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
									</svg>
									Edit Profile
								</button>
							</div>
						</div>
					)}

					{/* Addresses Tab */}
					{activeTab === "addresses" && (
						<div className="bg-neutral-800/50 rounded-xl p-6 shadow-lg border border-neutral-700">
							<div className="flex justify-between items-center mb-6">
								<h2 className="text-2xl font-semibold text-white flex items-center">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
										<path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
									</svg>
									Your Addresses
								</h2>
								<button
									className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 flex items-center"
									onClick={handleAddAddress}
								>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
										<path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
									</svg>
									Add New Address
								</button>
							</div>
							
							{addresses.length === 0 ? (
								<div className="bg-neutral-700/30 rounded-lg p-8 text-center">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-neutral-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
									</svg>
									<h3 className="text-xl font-medium text-neutral-300 mb-2">No Addresses Found</h3>
									<p className="text-neutral-400 mb-6">You haven't added any addresses to your account yet.</p>
									<button
										className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300"
										onClick={handleAddAddress}
									>
										Add Your First Address
									</button>
								</div>
							) : (
								<div className="grid grid-cols-1 gap-4">
									{addresses.map((address, index) => (
										<AddressCard key={index} {...address} />
									))}
								</div>
							)}
						</div>
					)}

					{/* Orders Tab */}
					{activeTab === "orders" && (
						<div className="bg-neutral-800/50 rounded-xl p-6 shadow-lg border border-neutral-700">
							<h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
									<path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
									<path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
								</svg>
								Your Orders
							</h2>
							
							<div className="bg-neutral-700/30 rounded-lg p-8 text-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-neutral-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
								</svg>
								<h3 className="text-xl font-medium text-neutral-300 mb-2">View Your Order History</h3>
								<p className="text-neutral-400 mb-6">Check your order history and track current orders.</p>
								<button
									className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300"
									onClick={() => navigate('/myorders')}
								>
									Go to My Orders
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);

}