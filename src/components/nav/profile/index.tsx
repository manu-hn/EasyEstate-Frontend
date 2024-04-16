import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import DeleteSignOut from "./DeleteSignOut";
import FetchListings from "./FetchListings";

const Profile = () => {
  const [userListings, setUserListings] = useState([]);
  const [deleteListings, setDeleteListings] = useState([]);
  const [file, setFile] = useState(null);

  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const dispatch = useAppDispatch();
  const { currentUser, loading } = useAppSelector((store) => store?.user);


  return (
    <div className='p-4 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-8'>Profile</h1>
      <Form />
      <DeleteSignOut />
      <FetchListings />
    </div>
  )
}

export default Profile