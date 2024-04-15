
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


export type InitialState = {
    isAuthenticated: boolean,
    currentUser: UserObject | null,
    error: string | null,
    loading: boolean
}

