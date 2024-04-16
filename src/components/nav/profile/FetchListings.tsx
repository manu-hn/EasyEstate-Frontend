import useProfileHelper from '@/utils/helpers/useProfileHelper'
import useListings from '@/utils/hooks/useListings.ts';
import { Link } from 'react-router-dom'
import DeleteListing from '@/components/Listings/delete';

const FetchListings = () => {
    const { handleFetchListings, userListings, message, deleteListings, setDeleteListings, setUserListings } = useProfileHelper();
    const { showListingsError, } = useListings();

    return (
        <div>
            <span className='text-green-500'>{message}</span>
            <button onClick={handleFetchListings} className='text-green-700 w-full font-semibold text-center'>Show Listings</button>
            <p>{showListingsError}</p>
            {
                userListings && userListings.length > 0 &&
                <div className='flex flex-col gap-3'>
                    <h1 className='text-center mt-7 text-xl font-semibold '>Your Listings</h1>
                    <p>{deleteListings}</p>
                    {userListings.map((listing) => {
                        return (
                            <div key={listing?._id} className='flex gap-4 border items-center justify-between overflow-hidden px-3 py-2'>
                                <Link to={`/listing/${listing?._id}`}>
                                    <img src={listing?.imageURLs[0]} alt="Listing cover"
                                        className='size-20 object-contain ' />
                                </Link>
                                <Link className='w-[60%]' to={`/listing/${listing._id}`}>
                                    <p className='font-semibold text-slate-800 flex-1 hover:underline line-clamp-1'>{listing?.title}</p>
                                </Link>
                                <div className='flex flex-col items-center'>
                                    <DeleteListing userListings={userListings} deleteListingStatus={(status) => setDeleteListings(status)} updateListings={(listings) => setUserListings(listings)} lid={listing._id} />
                                    <Link to={`/update-listing/${listing?._id}`}><button className='text-green-700'>Edit</button></Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default FetchListings