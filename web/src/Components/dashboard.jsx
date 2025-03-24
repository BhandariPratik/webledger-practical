import React, { useState } from "react";

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const receipts = [
        { id: 1, image: "https://via.placeholder.com/100", name: "Receipt 1", summary: "Summary 1" },
        { id: 2, image: "https://via.placeholder.com/100", name: "Receipt 2", summary: "Summary 2" },
        { id: 3, image: "https://via.placeholder.com/100", name: "Receipt 3", summary: "Summary 3" },
        // Add more items as needed
    ];

    const filteredReceipts = receipts.filter(receipt => receipt.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="p-4">
                <input
                    type="text"
                    placeholder="Search receipts..."
                    className="border p-2 w-full mb-4"
                    value={ searchTerm }
                    onChange={ (e) => setSearchTerm(e.target.value) }
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    { filteredReceipts.slice(0, 10).map((receipt) => (
                        <div key={ receipt.id } className="bg-white p-4 shadow rounded">
                            <img src={ receipt.image } alt={ receipt.name } className="w-full h-32 object-cover rounded" />
                            <h3 className="text-lg font-bold mt-2">{ receipt.name }</h3>
                            <p className="text-gray-600">{ receipt.summary }</p>
                        </div>
                    )) }
                </div>
            </div>
        </div>
    );
};

export default Dashboard;