import useListings from "@/utils/hooks/useListings";
import { ListingType } from "@/utils/types";

type Props = {
    lid: string;
    userListings: Array<ListingType>;
    deleteListingStatus: (value: string) => void;
    updateListings: (value: Array<ListingType>) => void;
}

const DeleteListing = ({ lid, deleteListingStatus, userListings, updateListings }: Props) => {

    const { deleteListing } = useListings()
    const handleListingDelete = async (lid: string) => {
        try {
            const res = await deleteListing(lid)
            deleteListingStatus(res?.message);
            const filteredListings = userListings.filter((listing) => listing?._id !== lid);
            updateListings(filteredListings)
            setTimeout(() => {
                deleteListingStatus(" ")
            }, 2000)
        } catch (error) {
            deleteListingStatus('Delete Listing Failed');

            setTimeout(() => {
                deleteListingStatus(" ")
            }, 2000)
        }
    }

    return (
        <><button onClick={() => handleListingDelete(lid)} className='text-red-700'>Delete</button></>
    )
}

export default DeleteListing