import { useAppSelector } from "@/redux/hooks/hooks";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCreateListings from "@/utils/hooks/useCreateListings";
import { FormInputDataType } from "@/utils/types.ts";
import Input from "./Input";


const CreateListing = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormInputDataType>({
        title: "",
        description: "",
        address: {
            street: "",
            city: "",
            state: "",
            zipcode: {
                code: 0,
                location_type: "",
            }
        },
        regularPrice: 1500,
        discountPrice: 0,
        bathrooms: 1,
        bedrooms: {
            total: 1,
            guest: 0,
        },
        type: "rent",
        offer: false,
        parking: false,
        furnished: false,
        imageURLs: [],
        userRef: "",
    });
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);
    const [imageUploadFailure, setImageUploadFailure] = useState(false);
    const { currentUser } = useAppSelector((store) => store?.user)
    const { createListingsFromHook, errorMessage, updateListingsFromHook } = useCreateListings();

    const handleFormDataChange = (e: FormEvent<HTMLInputElement>) => {
        setFormData({ ...formData, type: e?.target?.id });
    }
    return (
        <div>
            <h1 className='text-3xl font-semibold text-center my-7'>Create Listing</h1>
            <form action="">

                <Input Id="title" PlaceHolder="New Villa" Type="text" Value={formData?.title} 
                classNames={`border p-3 rounded-lg `} onChangeHandle={(value : string)=>setFormData(string)} />
            </form>
        </div>
    )
}

export default CreateListing