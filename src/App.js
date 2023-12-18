import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Start from "./Pages/Start";
import Home from "./Pages/Home";
import DetailPage from "./Pages/DetailsPage";
import Search from "./Pages/Search";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile"
import ForgetPassword from "./Pages/ForgetPassword";
import NewPassword from "./Pages/NewPassword"
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/home" element={<Home />} />
          <Route path="/details/:id" element={<DetailPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/newpassword" element={<NewPassword />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </>
  );
}

export default App;
