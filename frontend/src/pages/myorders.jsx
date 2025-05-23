import { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import NavBar from '../components/auth/nav';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [cancellingOrderId, setCancellingOrderId] = useState(null);
    const [activeTab, setActiveTab] = useState('all'); // 'all', 'active', 'cancelled'
    
    // Retrieve email from Redux state
    const email = useSelector((state) => state.user.email);
    const navigate = useNavigate();

    const fetchOrders = async () => {
        if (!email) return; // Only fetch if email is available
        
        try {
            setLoading(true);
            setError('');
            const response = await axios.get('/api/v2/orders/myorders', {
                params: { email: email },
            });
            setOrders(response.data.orders);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching orders');
        } finally {
            setLoading(false);
        }
    };

    // Cancel order handler
    const cancelOrder = async (orderId) => {
        try {
            setCancellingOrderId(orderId);
            const response = await axios.patch(`/api/v2/orders/cancel-order/${orderId}`);
            
            // Update the order in local state
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId ? { ...order, orderStatus: 'Cancelled' } : order
                )
            );
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Error cancelling order');
        } finally {
            setCancellingOrderId(null);
        }
    };
    
    // Filter orders based on active tab
    const filteredOrders = orders.filter(order => {
        if (activeTab === 'all') return true;
        if (activeTab === 'active') return order.orderStatus !== 'Cancelled';
        if (activeTab === 'cancelled') return order.orderStatus === 'Cancelled';
        return true;
    });
    
    // Format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    
    useEffect(() => {
        fetchOrders();
    }, [email]);

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gray-50 py-10">
                <div className="max-w-5xl mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">My Orders</h1>
                    <p className="text-center text-gray-600 mb-8">Track and manage your order history</p>
                    
                    {/* Tabs */}
                    <div className="flex justify-center mb-8">
                        <div className="bg-white rounded-lg shadow-md p-1 inline-flex">
                            <button 
                                onClick={() => setActiveTab('all')}
                                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                                    activeTab === 'all' 
                                        ? 'bg-indigo-600 text-white' 
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                All Orders
                            </button>
                            <button 
                                onClick={() => setActiveTab('active')}
                                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                                    activeTab === 'active' 
                                        ? 'bg-indigo-600 text-white' 
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                Active
                            </button>
                            <button 
                                onClick={() => setActiveTab('cancelled')}
                                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                                    activeTab === 'cancelled' 
                                        ? 'bg-indigo-600 text-white' 
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                Cancelled
                            </button>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-pulse flex flex-col items-center">
                                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                <p className="mt-4 text-lg text-indigo-600 font-medium">Loading your orders...</p>
                            </div>
                        </div>
                    )}
                    
                    {/* Error State */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                            <div className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        </div>
                    )}

                    {/* Orders List */}
                    {!loading && filteredOrders.length > 0 ? (
                        <div className="space-y-6">
                            {filteredOrders.map((order) => (
                                <div
                                    key={order._id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                                >
                                    {/* Order Header */}
                                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4">
                                        <div className="flex flex-wrap justify-between items-center">
                                            <div>
                                                <p className="text-sm font-medium opacity-80">Order Placed</p>
                                                <p className="font-medium">{order.createdAt ? formatDate(order.createdAt) : 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium opacity-80">Order ID</p>
                                                <p className="font-mono text-sm">{order._id}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium opacity-80">Total</p>
                                                <p className="text-xl font-bold">${order.totalAmount?.toFixed(2)}</p>
                                            </div>
                                            <div className="mt-2 sm:mt-0">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                    order.orderStatus === 'Cancelled' 
                                                        ? 'bg-red-100 text-red-800' 
                                                        : 'bg-green-100 text-green-800'
                                                }`}>
                                                    {order.orderStatus || 'Processing'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Order Content */}
                                    <div className="p-6">
                                        {/* Shipping Address */}
                                        <div className="mb-6">
                                            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                Shipping Address
                                            </h2>
                                            <div className="bg-gray-50 rounded-lg p-4 text-gray-700">
                                                <p className="font-medium">{order.shippingAddress?.addressType}</p>
                                                <p>
                                                    {order.shippingAddress?.address1}
                                                    {order.shippingAddress?.address2 &&
                                                        `, ${order.shippingAddress.address2}`}
                                                </p>
                                                <p>
                                                    {order.shippingAddress?.city}, {order.shippingAddress?.zipCode}
                                                </p>
                                                <p>{order.shippingAddress?.country}</p>
                                            </div>
                                        </div>

                                        {/* Order Items */}
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                                Order Items
                                            </h2>
                                            <div className="bg-gray-50 rounded-lg overflow-hidden">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-100">
                                                        <tr>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Product
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Quantity
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Price
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Total
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {order.orderItems?.map((item, index) => (
                                                            <tr key={index} className="hover:bg-gray-50">
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="flex items-center">
                                                                        <div className="text-sm font-medium text-gray-900">
                                                                            {item.name}
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">{item.quantity}</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">${item.price?.toFixed(2)}</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        ${(item.price * item.quantity).toFixed(2)}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        
                                        {/* Actions */}
                                        <div className="mt-6 flex justify-end">
                                            {order.orderStatus !== 'Cancelled' ? (
                                                <button
                                                    onClick={() => cancelOrder(order._id)}
                                                    disabled={cancellingOrderId === order._id}
                                                    className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                                        cancellingOrderId === order._id
                                                            ? 'bg-red-400 cursor-not-allowed'
                                                            : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                                                    }`}
                                                >
                                                    {cancellingOrderId === order._id ? (
                                                        <>
                                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            Cancelling...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                            Cancel Order
                                                        </>
                                                    )}
                                                </button>
                                            ) : (
                                                <div className="inline-flex items-center px-4 py-2 bg-red-100 border border-red-200 rounded-md text-sm font-medium text-red-800">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    Order Cancelled
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        !loading && (
                            <div className="bg-white rounded-lg shadow-md p-8 text-center">
                                <div className="flex justify-center mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">No orders found</h2>
                                <p className="text-gray-600 mb-8">
                                    {activeTab === 'all' 
                                        ? "You haven't placed any orders yet." 
                                        : activeTab === 'active' 
                                            ? "You don't have any active orders." 
                                            : "You don't have any cancelled orders."}
                                </p>
                                <button 
                                    onClick={() => navigate('/')} 
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    Start Shopping
                                </button>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    );
};

export default MyOrdersPage;

 




















