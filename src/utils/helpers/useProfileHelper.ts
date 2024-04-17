import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks'
import { deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutUserFailure, signOutUserSuccess, signOutUserStart } from '@/redux/slices/userSlice';
import axios, { AxiosResponse } from 'axios';
import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from 'typescript-cookie'

import { ListingType } from '@/utils/types.ts';

const useProfileHelper = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState<string>('');
    const [userListings, setUserListings] = useState<Array<ListingType>>([]);
    const [deleteListings, setDeleteListings] = useState<string>('');


    const optionsAPI = {
        'Content-type': 'application/json',
        Authorization: `Bearer ${getCookie("token")}`,
        'Access-Control-Allow-Origin': 'http://localhost:5173',


    }

    const dispatch = useAppDispatch();
    const { currentUser } = useAppSelector((store) => store?.user);


    const handleDeleteUserAccount = async (e: MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        try {
            dispatch(deleteUserStart())
            await axios.delete(`${import.meta.env.VITE_BASE_URL}api/easy-estates/user/delete/${currentUser?._id}`, {
                headers: optionsAPI
            });

            removeCookie('token');
            dispatch(deleteUserSuccess());
            navigate('/sign-up');

        } catch (error) {
            console.log(error);
            dispatch(deleteUserFailure(error));
        }

    }


    const handleSignOut = async () => {
        try {
            dispatch(signOutUserStart())
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}api/easy-estates/user/sign-out`);
            setMessage(res.data.message);
            removeCookie('token');
            localStorage.removeItem('persist:root')
            dispatch(signOutUserSuccess(res.data));


        } catch (error) {
            dispatch(signOutUserFailure(error))
        }
    }

    const handleFetchListings = async () => {
        try {

            //    const res = await getAllListings(currentUser.uid);
            const response: AxiosResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}api/properties/listings/get-listings/${currentUser?._id}`,
                { headers: optionsAPI });

            setUserListings(response?.data?.listings);
            return response.data;

        } catch (error) {
            console.log(error)
        }
    }
    return {
        handleDeleteUserAccount, handleSignOut, message, setMessage,
        userListings, setUserListings, deleteListings, setDeleteListings, handleFetchListings
    }
}
export default useProfileHelper;