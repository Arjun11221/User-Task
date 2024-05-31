import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-hot-toast";

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    addresses: [{ city: '', state: '', houseNo: '', country: '' }],
  });
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'city' || name === 'state' || name === 'houseNo' || name === 'country') {
      const newAddresses = [...formData.addresses];
      newAddresses[index][name] = value;
      setFormData({ ...formData, addresses: newAddresses });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addAddress = () => {
    setFormData({
      ...formData,
      addresses: [...formData.addresses, { city: '', state: '', houseNo: '', country: '' }],
    });
  };

  const removeAddress = (index) => {
    const newAddresses = [...formData.addresses];
    newAddresses.splice(index, 1);
    setFormData({ ...formData, addresses: newAddresses });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const {name, age, addresses} = formData;
      const res = await axios.post("http://localhost:4000/add",formData);
      if(res.data.success){
        toast.success(res.data.message);
        navigate("/");
      }
      else{
        toast.error(res.data.message)
      }

    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
     <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Add User</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-2">
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </label>
        {formData.addresses.map((address, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-300 rounded">
            <h3 className="text-lg font-semibold mb-2">Address {index + 1}</h3>
            <label className="block mb-2">
              City:
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={(e) => handleChange(e, index)}
                className="block w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block mb-2">
              State:
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={(e) => handleChange(e, index)}
                className="block w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block mb-2">
              House No:
              <input
                type="text"
                name="houseNo"
                value={address.houseNo}
                onChange={(e) => handleChange(e, index)}
                className="block w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block mb-2">
              Country:
              <input
                type="text"
                name="country"
                value={address.country}
                onChange={(e) => handleChange(e, index)}
                className="block w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </label>
            {formData.addresses.length > 1 && (
              <button
                type="button"
                onClick={() => removeAddress(index)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove Address
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addAddress}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mr-4 hover:bg-blue-600"
        >
          Add Address
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

export default AddUser;
