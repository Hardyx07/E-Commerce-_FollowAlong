import React, { useState } from 'react';

export default function AddressCard({_id, country, city, address1, address2, zipCode, addressType}) {
	const [isExpanded, setIsExpanded] = useState(false);
	
	// Function to get address type badge color
	const getAddressTypeColor = (type) => {
		switch(type?.toLowerCase()) {
			case 'home':
				return 'bg-green-600';
			case 'work':
				return 'bg-blue-600';
			case 'other':
				return 'bg-purple-600';
			default:
				return 'bg-gray-600';
		}
	};
	
	return (
		<div className="bg-gradient-to-r from-neutral-700/50 to-neutral-800/50 rounded-lg border border-neutral-600/50 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:border-purple-500/30">
			<div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
				<div className="flex-1">
					<div className="flex items-center mb-2">
						<span className={`text-xs font-semibold px-2 py-1 rounded-full text-white ${getAddressTypeColor(addressType)} mr-2`}>
							{addressType || 'Unknown'}
						</span>
						<h3 className="text-lg font-medium text-white">
							{address1}
						</h3>
					</div>
					
					<div className="text-neutral-300 text-sm">
						{city}, {country}, {zipCode}
					</div>
				</div>
				
				<div className="flex items-center mt-3 md:mt-0">
					<button 
						onClick={() => setIsExpanded(!isExpanded)}
						className="text-purple-400 hover:text-purple-300 transition-colors duration-200 mr-3 flex items-center"
					>
						<span className="mr-1">{isExpanded ? 'Hide Details' : 'View Details'}</span>
						<svg 
							xmlns="http://www.w3.org/2000/svg" 
							className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
							viewBox="0 0 20 20" 
							fill="currentColor"
						>
							<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
						</svg>
					</button>
					
					<div className="flex space-x-2">
						<button className="p-1.5 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white transition-colors duration-200">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
								<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
							</svg>
						</button>
						<button className="p-1.5 rounded-full bg-red-700 hover:bg-red-600 text-white transition-colors duration-200">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
								<path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
							</svg>
						</button>
					</div>
				</div>
			</div>
			
			{/* Expanded details */}
			{isExpanded && (
				<div className="border-t border-neutral-600/50 p-4 bg-neutral-800/50">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						<div>
							<div className="text-xs text-neutral-400 mb-1">Country</div>
							<div className="text-white">{country}</div>
						</div>
						<div>
							<div className="text-xs text-neutral-400 mb-1">City</div>
							<div className="text-white">{city}</div>
						</div>
						<div>
							<div className="text-xs text-neutral-400 mb-1">Zip Code</div>
							<div className="text-white">{zipCode}</div>
						</div>
						<div>
							<div className="text-xs text-neutral-400 mb-1">Address Line 1</div>
							<div className="text-white">{address1}</div>
						</div>
						<div>
							<div className="text-xs text-neutral-400 mb-1">Address Line 2</div>
							<div className="text-white">{address2 || 'N/A'}</div>
						</div>
						<div>
							<div className="text-xs text-neutral-400 mb-1">Address Type</div>
							<div className="text-white">{addressType}</div>
						</div>
					</div>
					
					<div className="mt-4 flex justify-end">
						<button className="text-sm text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition-colors duration-200">
							Use This Address
						</button>
					</div>
				</div>
			)}
		</div>
	);
}