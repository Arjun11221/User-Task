import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListUsers from "./components/ListUsers";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<ListUsers />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
