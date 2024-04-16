import useProfileHelper from "@/utils/helpers/useProfileHelper"


const DeleteSignOut = () => {

    const { handleDeleteUserAccount, handleSignOut } = useProfileHelper()

    return (

        <div className='flex justify-between mt-6'>
            <span onClick={handleDeleteUserAccount} className='cursor-pointer font-medium text-red-700'>Delete account</span>
            <span onClick={handleSignOut} className='cursor-pointer font-medium text-red-700'>Sign Out</span>
        </div>

    )
}

export default DeleteSignOut