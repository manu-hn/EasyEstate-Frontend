
import Form from "./Form";
import DeleteSignOut from "./DeleteSignOut";
import FetchListings from "./FetchListings";

const Profile = () => {
  


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