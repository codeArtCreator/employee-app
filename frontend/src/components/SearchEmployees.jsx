import React, { useState } from 'react';
import axios from 'axios';

function SearchEmployees() {
    const [searchParams, setSearchParams] = useState({
        name: '',
        address: '',
    });
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e) => {
        setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.get('http://localhost:5000/api/employees/search', {
            params: searchParams,
        });
        setSearchResults(response.data);
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-6">Search Employees</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        name="name"
                        value={searchParams.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                        Address
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="address"
                        type="text"
                        name="address"
                        value={searchParams.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Search
                    </button>
                </div>
            </form>
            <div>
                <h3 className="text-xl font-bold mb-4">Search Results</h3>
                <ul className="list-disc pl-5">
                    {searchResults.map((employee) => (
                        <li key={employee._id} className="mb-2">
                            {employee.name} - {employee.address}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SearchEmployees;
