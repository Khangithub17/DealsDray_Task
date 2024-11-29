import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeList from '../components/EmployeeList';
import AddEmployee from '../components/AddEmployee';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-green-500 text-black p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Employee Management Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-yellow-500 hover:bg-yellow-300 px-4 py-2 rounded"
        >
          Logout
        </button>
      </header>

      <main className="p-6 flex-grow">
        <div className="bg-white p-6 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Employee List</h2>
            <button
              onClick={() => setShowAddEmployee(true)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Employee
            </button>
          </div>
          {showAddEmployee && (
            <AddEmployee
              onClose={() => setShowAddEmployee(false)}
              onAdd={(newEmployee) => {
                setShowAddEmployee(false);
                setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
              }}
            />
          )}
          <EmployeeList />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
