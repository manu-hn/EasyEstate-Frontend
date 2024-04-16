import { SignUpData } from "@/utils/types";


type ErrorsType = {
    fullName: string;
    username: string;
    password: string;
    email: string;
    mobile: string;

}

export const validate = (values: SignUpData) => {
    const errors: ErrorsType = {
        fullName: "",
        username: '',
        password: '',
        email: '',
        mobile: '',
    };
    if (!values.fullName) {
        errors.fullName = "Full name is required."
    }
    if (!values.username) {
        errors.username = 'Username is Required';
    } else if (!/^[a-zA-Z0-9]+$/.test(values.username)) {
        errors.username = 'Username can only contain letters and numbers';
    }
    if (!values.email) {
        errors.email = 'Email is Required';
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.mobile) {
        errors.mobile = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(values.mobile)) {
        errors.mobile = 'Mobile number must be exactly 10 digits';
    }
    if (!values.password) {
        errors.password = "Password is required"
    } else if (
        !/(?=.*[a-z])/.test(values.password) ||
        !/(?=.*[A-Z])/.test(values.password) ||
        !/(?=.*\d)/.test(values.password) ||
        !/(?=.*[!@#$%^&*()_+])/.test(values.password)
    ) {
        errors.password = `Password must contain at  least one uppercase letter, one lowercase letter, one number, and one symbol`;
    }
    return errors;
}