
// Logged In Data
export interface UserObject {
    _id: string;
    fullName: string;
    username: string;
    email: string;
    mobile: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
    __v: string;

}




// initial State
export type InitialState = {
    isAuthenticated: boolean,
    currentUser: UserObject | null,
    error: string | null,
    loading: boolean
}


// Data For Signup
export interface SignUpData {
    fullName: string;
    username: string;
    email: string;
    mobile: string;
    password: string;
}


type ZipCode = {
    code: string | number,
    location_type: string,
}
interface AddressType {
    zipcode: ZipCode,
    street: string;
    city: string;
    state: string;
}
type BedRoomsType = {
    total: number,
    guest: number,
}
export interface ListingType {
    address: AddressType;
    bedrooms: BedRoomsType;
    _id: string;
    title: string;
    description: string;
    regularPrice: number;
    discountPrice: number;
    furnished: boolean;
    bathrooms: number;
    parking: boolean;
    offer?: boolean;
    type: string;
    imageURLs: string[];
    userRef: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number
}
export interface FormInputDataType {
    address: AddressType;
    bedrooms: BedRoomsType;
    
    title: string;
    description: string;
    regularPrice: number;
    discountPrice: number;
    furnished: boolean;
    bathrooms: number;
    parking: boolean;
    offer?: boolean;
    type: string;
    imageURLs: string[];
    userRef: string;
    
    
}