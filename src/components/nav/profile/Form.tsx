import { app } from '@/Firebase';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { updateUserFailure, updateUserStart, updateUserSuccess } from '@/redux/slices/userSlice';
import axios from 'axios';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { FormEvent, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getCookie } from 'typescript-cookie';



const Form = () => {
  const { currentUser, loading } = useAppSelector((store) => store?.user);

  const inputStyle = `my-2 outline-none rounded-lg px-4 py-2`
  const [message, setMessage] = useState<string>('');
  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || '',
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    avatar: currentUser?.avatar || '',
    mobile: currentUser?.mobile || '',

  });
  // const [userListings, setUserListings] = useState([]);
  // const [deleteListings, setDeleteListings] = useState([]);
  const [file, setFile] = useState<FileList | null>();

  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const dispatch = useAppDispatch();


  function handleFormDataChange(e: FormEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target?.id]: e.target?.value })
  }
  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      dispatch(updateUserStart());

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}api/easy-estates/user/update/${currentUser?._id}`, JSON.stringify(formData), {
        headers: {
          Authorization: getCookie('token'),
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:5173',
        }
      })
      console.log("response profile", response)
      setMessage(response.data.message)
      dispatch(updateUserSuccess(response.data.data))
    } catch (error) {
      console.log(error)
      dispatch(updateUserFailure(error))
    }
  }
  console.log(formData)
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  async function handleFileUpload(file) {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadFile = uploadBytesResumable(storageRef, file);

    uploadFile.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setFilePercentage(Math.round(progress))
      },

      (error) => {
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadFile.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl })
        })
      },
    )

  }

  console.log(currentUser)
  return (
    <form className='flex flex-col' onSubmit={handleFormSubmit} >
      <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e?.target?.files[0])} type="file" ref={fileRef} hidden accept='image/*' />
      <img onClick={() => fileRef?.current?.click()} className='h-28 w-28 rounded-full cursor-pointer object-cover self-center mt-4'
        src={formData?.avatar || currentUser?.avatar} alt="" />
      <p className='text-center text-xs'>
        {
          fileUploadError ?
            (<span className='text-red-500 '>Error While Uploading (size must be less than 2MB)</span>)
            : (
              filePercentage > 0 && filePercentage < 100 ? (
                <span className='text-slate-600 '>{`Uploading ${filePercentage}%`}</span>
              ) : (
                filePercentage === 100 ? (
                  <span className='text-green-600 '>Image Successfully uploaded</span>
                ) : ("")
              )
            )
        }
      </p>
      <input value={formData?.fullName}  type="text" name="fullName" id='fullName' placeholder='Full Name' className={`${inputStyle}`} onChange={handleFormDataChange} />
      <input value={formData?.username}  type="text" name="username" id='username' placeholder='Username' className={`${inputStyle}`} onChange={handleFormDataChange} />
      <input value={formData?.email}     type="text" name="email" id='email' placeholder='email' className={`${inputStyle}`} onChange={handleFormDataChange} />
      <input defaultValue={formData?.avatar}    type="text" name="mobile" id='mobile' placeholder='mobile' className={`${inputStyle}`} onChange={handleFormDataChange} />
      <input type="password" name="password" id='password' placeholder='password' className={`${inputStyle}`} onChange={handleFormDataChange} />
      <button disabled={loading} type='submit' className='bg-orange-600 uppercase my-2 py-2 rounded-lg text-white hover:opacity-90 disabled:opacity-60'>{loading ? "Updating" : "Update"}</button>
      <Link to={'/create-listing'} className='bg-blue-950 text-white uppercase rounded-lg text-center p-3 hover:opacity-95'>Create Listing</Link>
    </form>
  )
}

export default Form;