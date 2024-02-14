import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const response = await axios.get('http://localhost:5000/api/employees');
        setEmployees(response.data);
    };

    const deleteEmployee = async (id) => {
        await axios.delete(`http://localhost:5000/api/employees/${id}`);
        fetchEmployees();
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredEmployees = employees.filter(
        (employee) =>
            employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Employee List</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name or address"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <Link to="/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Employee
            </Link>
            <table className="table-auto w-full mt-4">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Address</th>
                        <th className="px-4 py-2">Position</th>
                        <th className="px-4 py-2">Salary</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map((employee) => (
                        <tr key={employee._id} className="border-b">
                            <td className="px-4 py-2">{employee.name}</td>
                            <td className="px-4 py-2">{employee.address}</td>
                            <td className="px-4 py-2">{employee.position}</td>
                            <td className="px-4 py-2">{employee.salary}</td>
                            <td className="px-4 py-2">
                                <Link to={`/edit/${employee._id}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2">
                                    Edit
                                </Link>
                                <button onClick={() => deleteEmployee(employee._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;
