import axios from "axios";
import { getCookie } from "typescript-cookie";
import { FormInputDataType } from "@/utils/types.ts";
import { useState } from "react";


const useCreateListings = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const config = {
        headers: {
            Authorization: getCookie('token'),
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:5173',
        }
    }
    const createListingsFromHook = async (formData: FormInputDataType) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}api/properties/listings/create`, JSON.stringify(formData), config)

            return response.data;
        } catch (error) {
            setErrorMessage(error?.message);
            throw new Error(error.message);
        }
    }


    const updateListingsFromHook = async (formData: FormInputDataType, lid: string) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}api/properties/listings/update/${lid}`, JSON.stringify(formData), config)
            return response.data;
        } catch (error) {
            setErrorMessage('Error While Updating Listings')
            throw new Error(error.message);
        }
    }

    return {
        createListingsFromHook, updateListingsFromHook, errorMessage
    }
}

export default useCreateListings