import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/auth/nav";
import { useSelector } from "react-redux";

const CreateAddress = () => {
    const navigate = useNavigate();
    const email = useSelector((state) => state.user.email);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [addressType, setAddressType] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const addressData = {
            country,
            city,
            address1,
            address2,
            zipCode,
            addressType,
            email
        };

        try {
            const response = await axios.post(
                "http://localhost:8000/api/v2/user/add-address",
                addressData,
                { headers: { "Content-Type": "application/json" } }
            );
            if (response.status === 201) {
                alert("Address added successfully!");
                navigate("/profile");
            }
        } catch (err) {
            console.error("Error adding address:", err);
            alert("Failed to add address. Please check the data and try again.");
        }
    };

    return (
        <>
            <NavBar />
            <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
                <div className="w-full max-w-[450px] bg-white shadow-lg rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                        Add Address
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Input Fields */}
                        {[
                            { label: "Country", value: country, setter: setCountry },
                            { label: "City", value: city, setter: setCity },
                            { label: "Address 1", value: address1, setter: setAddress1 },
                            { label: "Address 2", value: address2, setter: setAddress2 },
                            { label: "Zip Code", value: zipCode, setter: setZipCode, type: "number" },
                            { label: "Address Type", value: addressType, setter: setAddressType },
                        ].map((field, index) => (
                            <div key={index}>
                                <label className="block text-gray-600 font-medium mb-1">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type || "text"}
                                    value={field.value}
                                    onChange={(e) => field.setter(e.target.value)}
                                    placeholder={`Enter ${field.label.toLowerCase()}`}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                />
                            </div>
                        ))}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg shadow-md hover:bg-blue-700 transition-all"
                        >
                            Add Address
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateAddress;
