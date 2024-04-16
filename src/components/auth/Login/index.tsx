import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginFailure, loginInitiated, loginSuccess } from '@/redux/slices/userSlice.tsx';
import OAuth from '@/components/auth/OAuth.tsx';
import {  setCookie } from 'typescript-cookie'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

type UserData = {
  email: string;
  password: string;
}

const Login = () => {

  const { loading, } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: ""
  });



  const inputStyle = `rounded-lg outline-none border border-gray-300 p-1 md:p-2 
  bg-black bg-opacity-25 text-white focus:bg-black focus:bg-opacity-55  placeholder:text-white`;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginInitiated());
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}api/easy-estates/user/login`, JSON.stringify(userData), {
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:5173',
        },
        // withCredentials: true,
      });
   
      setCookie('token', response?.data?.access_token)
      dispatch(loginSuccess(response?.data?.data));

      navigate('/')

    } catch (error) {
      dispatch(loginFailure(error));
      console.log(error)

    }
  }

  const handleDataChange = (e) => {

    setUserData({ ...userData, [e.target.id]: e.target.value });
  }

  return (
    <div className="p-3 max-w-lg mx-auto h-screen ">
      <h1 className='font-semibold text-2xl text-center my-7'>Login</h1>
      <form className='flex flex-col gap-4 bg-black bg-opacity-55 px-4 py-6 rounded-lg' onSubmit={handleLoginSubmit}>
        <div className="flex flex-col">
          <label className="mx-2 text-slate-200" htmlFor="email">Email : </label>
          <input value={userData?.email} onChange={handleDataChange} className={`rounded-lg outline-none border p-3 ${inputStyle}`} type="email" name="email" id="email" placeholder='example@email.com' />
        </div>
        <div className="flex flex-col">
          <label className="mx-2 text-slate-200" htmlFor="email">Email : </label>

          <input value={userData?.password} onChange={handleDataChange} className={`rounded-lg outline-none border p-3 ${inputStyle}`} type="password" name="password" id="password" placeholder='Enter Password' />
        </div>

        <button disabled={loading} type='submit'
          className='bg-[#E58914] text-white disabled:opacity-20 py-1 w-3/4 md:w-full mx-auto md:p-3 rounded-lg hover:opacity-80'>{loading ? "Loading..." : "Login"}</button>

        <OAuth />
      </form>
      <div className='flex gap-3 mt-6'>
        <p>Don&apos;t have an account?</p>
        <Link to={'/sign-up'}> <span className='text-blue-600'>Sign Up</span> </Link>

      </div>
    </div>
  )
}

export default Login