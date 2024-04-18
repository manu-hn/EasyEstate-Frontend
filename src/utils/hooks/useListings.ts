import axios from 'axios';
import { useState } from 'react'
import { getCookie } from 'typescript-cookie';

const useListings = () => {
    const [showListingsError, setShowListingsError] = useState<string | null>(null);
    const optionsAPI = {
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        Authorization: getCookie('token'),
        'Content-type': 'application/json'
    }

    const getAllListings = async (uid: string) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/properties/listings/get-listings/${uid}`, { headers: optionsAPI });

            return response.data;
        } catch (error) {
            setShowListingsError(error?.message)
        }
    }

    const deleteListing = async (lid: string) => {
        try {
            const token = getCookie('token');  //retrieve the jwt token stored in cookies

            if (!token) {
                throw new Error("No Authorization Token Found!");
            } else {

                const config = {
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:5173',
                        "Authorization": `Bearer ${token}`,
                        'Content-type': 'application/json'
                    }
                };
                const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}api/properties/listings/delete/${lid}`, config);

                return response.data;
            }

        } catch (error) {
            setShowListingsError(error?.message);
            alert(`Delete Listing Failed! `);
        }
    }

    const fetchListingById = async (lid: string) => {

        try {

            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/properties/listings/get-listing/${lid}`);
            return response.data;
        } catch (error) {
            throw new Error(error.message);

        }
    }



    return {
        getAllListings, showListingsError, deleteListing, fetchListingById,
    }
}

export default useListings;