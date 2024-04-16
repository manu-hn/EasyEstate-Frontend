
import { BrowserRouter, Route, Routes, useLocation, } from "react-router-dom";
import Home from "@/components/nav/home";
import Header from "@/components/nav/header";
import About from "@/components/nav/about";
import Profile from "@/components/nav/profile";
import Login from "@/components/auth/Login";
import SignUp from "@/components/auth/SignUp";
import PrivateRoute from "@/components/auth/PrivateRoute";
import EditListing from "@/components/Listings/edit";
import CreateListing from "@/components/Listings/create";



const Body = () => {

  return (
    <div className="bg-gray-20">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/update-listing/:id" element={<EditListing />} />
            <Route path="/create-listing" element={<CreateListing />} />

          </Route>



        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default Body;