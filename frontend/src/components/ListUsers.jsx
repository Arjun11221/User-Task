// src/components/ListUsers.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  console.log(users);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:4000/users");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <Link
        to="/add"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Add User
      </Link>
      {users.length === 0 ? (
        <div>user list is empty go to Add User</div>
      ) : (
        <ul className="flex flex-wrap" >
          {users.map((user) => (
            <li key={user._id} className=" border bg-neutral-100 rounded border-black mx-4 p-5 mb-2">
              <div>Name : {user.name}</div>
              <div className="mb-1" >Age : {user.age}</div>
              <div>
                {user.addresses.map((address, index) => (
                  <div key={index}>
                    <ul>
                      <li>City : {address.city}</li>
                      <li>Country : {address.country}</li>
                      <li>House No. : {address.houseNo}</li>
                      <li className="mb-3" >State : {address.state}</li>
                    </ul>
                  </div>
                ))}
              </div>

              <Link
                to={`/edit/${user._id}`}
                className="bg-gray-500  text-white px-4 py-2 rounded"
              >
                Edit
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListUsers;
