
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import Home from "@/components/nav/home";
import Header from "@/components/nav/header";
import About from "@/components/nav/about";
import Profile from "@/components/nav/profile";
import Login from "@/components/auth/Login";
import SignUp from "@/components/auth/SignUp";
import PrivateRoute from "@/components/auth/PrivateRoute";



const Body = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          {/* <Route path="" element={} />
          <Route path="" element={} /> */}


        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default Body;