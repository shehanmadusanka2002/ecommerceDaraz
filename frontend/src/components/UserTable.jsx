import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserTable = () => {
  const [users, setUsers] = useState([]);

  // Fetch users on load
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/all');
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 flex justify-between items-center">
        Registered Users
        <span className="text-sm text-gray-500">{users.length} users</span>
      </h2>
      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-gray-600 font-medium uppercase tracking-wider">Username</th>
              <th className="py-3 px-6 text-left text-gray-600 font-medium uppercase tracking-wider">Email</th>
              <th className="py-3 px-6 text-left text-gray-600 font-medium uppercase tracking-wider">Date Registered</th>
              <th className="py-3 px-6 text-left text-gray-600 font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">No users found.</td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`transition-colors duration-300 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-blue-100`}
                >
                  <td className="py-4 px-6 text-gray-700">{user.username}</td>
                  <td className="py-4 px-6 text-gray-700">{user.email}</td>
                  <td className="py-4 px-6 text-gray-700">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
