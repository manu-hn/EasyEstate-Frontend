import { useAppDispatch } from "@/redux/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "@/Firebase.ts";
import axios from "axios";
import { loginSuccess } from "@/redux/slices/userSlice";
import useMediaQuery from "@/utils/hooks/useMediaQuery";


const OAuth = () => {
  const isAboveMedium = useMediaQuery('(min-width : 768px)')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleGoogleAuthentication = async () => {
    try {
      const authProvider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const response = await signInWithPopup(auth, authProvider)
      console.log(response)
      const backendResponse = await axios.post(`${import.meta.env.VITE_BASE_URL}api/easy-estates/user/google-auth`,
        { name: response.user.displayName, email: response.user.email, image: response.user.photoURL },
        {
          headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:5173',
          },
        });

      console.log(backendResponse?.data?.data)
      console.log(backendResponse.data)

      dispatch(loginSuccess(backendResponse.data.data));
      navigate('/')


    } catch (error) {
      console.log('Google auth failed ', error)
    }
  }

  return (
    <button type='button' onClick={handleGoogleAuthentication}
      className='bg-red-900 text-white disabled:opacity-20 py-1 w-3/4 md:w-full mx-auto md:p-3 rounded-lg hover:opacity-80'>{!isAboveMedium ? 'Google' : ' Continue With Google'}
    </button>
  )
}

export default OAuth