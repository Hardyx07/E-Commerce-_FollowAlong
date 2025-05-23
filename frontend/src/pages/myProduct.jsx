import { useEffect, useState } from "react";
import Myproduct from "../components/auth/myproduct";
import NavBar from "../components/auth/nav";
import { useSelector } from "react-redux";
import axios from "../axiosConfig";

export default function MyProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Get the email from Redux state
    const email = useSelector((state) => state.user.email);

    useEffect(() => {
        // Only fetch if email is available
        if (!email) return;
        axios.get(`/api/v2/product/my-products?email=${email}`)
            .then((res) => {
                setProducts(res.data.products);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setError(err.message);
                setLoading(false);
            });
    }, [email]);

    if (loading) {
        return (
            <>
                <NavBar />
                <div className="w-full min-h-screen bg-gradient-to-b from-neutral-800 to-neutral-900 flex items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="w-16 h-16 border-4 border-t-blue-500 border-neutral-200 rounded-full animate-spin mb-4"></div>
                        <p className="text-xl text-blue-400 font-semibold">Loading your products...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <NavBar />
                <div className="w-full min-h-screen bg-gradient-to-b from-neutral-800 to-neutral-900 flex items-center justify-center">
                    <div className="bg-red-900/30 p-8 rounded-lg border border-red-500 max-w-md">
                        <h2 className="text-2xl text-red-400 font-bold mb-4">Something went wrong</h2>
                        <p className="text-white mb-4">We couldn't load your products at this time.</p>
                        <p className="text-red-300 font-mono text-sm bg-red-900/40 p-2 rounded">{error}</p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-all duration-300"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <NavBar />
            <div className="w-full min-h-screen bg-gradient-to-b from-neutral-800 to-neutral-900">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-bold text-white">
                            <span className="text-blue-400">My</span> Products
                        </h1>
                        <div className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all duration-300 cursor-pointer"
                             onClick={() => window.location.href = '/create-product'}>
                            + Add New Product
                        </div>
                    </div>
                    
                    {products.length === 0 ? (
                        <div className="bg-neutral-700/50 rounded-lg p-10 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-neutral-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <h2 className="text-2xl font-semibold text-neutral-300 mb-2">No Products Found</h2>
                            <p className="text-neutral-400 mb-6">You haven't added any products to your store yet.</p>
                            <a href="/create-product" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-all duration-300">
                                Create Your First Product
                            </a>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <Myproduct key={product._id} {...product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
