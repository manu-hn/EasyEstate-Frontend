import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpData } from "@/utils/types";
import axios from "axios";
import OAuth from '@/components/auth/OAuth.tsx';



const SignUp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState<SignUpData>({
    fullName: '',
    username: '',
    email: "",
    mobile: "",
    password: ""
  });

  const inputStyle = `rounded-lg outline-none border border-gray-300 p-1 md:p-2 bg-black bg-opacity-25 text-white focus:bg-black focus:bg-opacity-55  placeholder:text-white`
  // const errorStyle = `text-red-400 text-xs font-semibold mt-1`

  const handleSignUpFormDataChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.id]: e.target.value });

  }

  async function handleSignUpSubmit(e) {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}api/easy-estates/user/sign-up`, JSON.stringify(signUpData), {
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:5173',
        },
      });
      setMessage(response?.data?.message);

      setIsLoading(false);
      setTimeout(() => {
        setMessage('');
        navigate('/login');
      }, 1500)

    } catch (error) {
      setIsLoading(false)
      console.log(error);

    }
  }
  console.log(signUpData)
  return (

    <div className='p-3 max-w-lg mx-auto flex flex-col items-center '>
      <h1 className='font-semibold text-2xl text-center my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4 w-5/6 bg-black bg-opacity-55 px-4 py-6 rounded-lg' onSubmit={handleSignUpSubmit}>
        <div className="flex flex-col ">
          <label className="mx-2 text-slate-200" htmlFor="fullName">Full Name : </label>
          <input onChange={handleSignUpFormDataChange} value={signUpData?.fullName}
            className={`${inputStyle}`} type="text" name="fullName" id="fullName" placeholder='John Doe' />

        </div>
        <div className="flex flex-col">
          <label className="mx-2 text-slate-200" htmlFor="username">Username :</label>
          <input onChange={handleSignUpFormDataChange} value={signUpData?.username}
            className={`${inputStyle}`} type="text" name="username" id="username" placeholder='john123' />

        </div>
        <div className="flex flex-col">
          <label className="mx-2 text-slate-200" htmlFor="email">Email : </label>
          <input onChange={handleSignUpFormDataChange} value={signUpData?.email}
            className={`${inputStyle}`} type="email" name="email" id="email" placeholder='example@email.com' />

        </div>
        <div className="flex flex-col">
          <label className="mx-2 text-slate-200" htmlFor="mobile">Mobile : </label>
          <input onChange={handleSignUpFormDataChange} value={signUpData?.mobile}
            className={`${inputStyle}`} type="number" name="mobile" id="mobile" placeholder='9876543210' />

        </div>
        <div className="flex flex-col">
          <label className="mx-2 text-slate-200" htmlFor="password">Password :</label>
          <input onChange={handleSignUpFormDataChange} value={signUpData?.password}
            className={`${inputStyle}`} type="password" name="password" id="password" placeholder='john@Doe1' />

        </div>
        <button disabled={isLoading} type='submit' className='bg-[#E58914] text-white disabled:opacity-20 p-2 rounded-lg hover:opacity-80'>{isLoading ? "Loading..." : "Sign Up"}</button>
        <div>
          <OAuth />
        </div>
        <p className="text-sm text-violet-50 font-semibold">{message}</p>
      </form>

      <div className='flex gap-3 mt-6'>
        <p>Already have an Account?</p>
        <Link to={'/login'}> <span className='text-blue-600'>Login</span> </Link>

      </div>
    </div>
  )
}

export default SignUp;