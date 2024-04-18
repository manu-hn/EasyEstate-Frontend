import { useFormik } from 'formik'


type ErrorsType = {
    fullName: string;
    username: string;
    password: string;
    email: string;
    mobile: string;

}

 const validate = (values : ErrorsType) => {
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

const initialValues = {

    fullName: '',
    username: '',
    email: "",
    mobile: "",
    password: ""

}

const Form = () => {
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
           
        },
        validate
    });


    const inputStyle = `rounded-lg outline-none border border-gray-300 p-1 md:p-2 bg-black bg-opacity-25 text-white focus:bg-black focus:bg-opacity-55  placeholder:text-gray-300`

    // const errorStyle = `text-red-400 text-xs font-semibold mt-1`
    return (
        <div>
            <form className='flex flex-col gap-4 w-5/6 bg-black bg-opacity-55 px-4 py-6 rounded-lg' onSubmit={formik?.handleSubmit}>
                <div className="flex flex-col ">
                    <label className="mx-2 text-slate-200" htmlFor="fullName">Full Name : </label>
                    <input onChange={formik?.handleChange} value={formik?.values?.fullName} onBlur={formik?.handleBlur}
                        className={`${inputStyle}`} type="text" name="fullName" id="fullName" placeholder='John Doe' />

                </div>
                <div className="flex flex-col">
                    <label className="mx-2 text-slate-200" htmlFor="username">Username :</label>
                    <input onChange={formik?.handleChange} value={formik?.values?.username} onBlur={formik?.handleBlur}
                        className={`${inputStyle}`} type="text" name="username" id="username" placeholder='john123' />

                </div>
                <div className="flex flex-col">
                    <label className="mx-2 text-slate-200" htmlFor="email">Email : </label>
                    <input onChange={formik?.handleChange} value={formik?.values?.email} onBlur={formik?.handleBlur}
                        className={`${inputStyle}`} type="email" name="email" id="email" placeholder='example@email.com' />

                </div>
                <div className="flex flex-col">
                    <label className="mx-2 text-slate-200" htmlFor="mobile">Mobile : </label>
                    <input onChange={formik?.handleChange} value={formik?.values?.mobile} onBlur={formik?.handleBlur}
                        className={`${inputStyle}`} type="number" name="mobile" id="mobile" placeholder='9876543210' />

                </div>
                <div className="flex flex-col">
                    <label className="mx-2 text-slate-200" htmlFor="password">Password :</label>
                    <input onChange={formik?.handleChange} value={formik?.values?.password} onBlur={formik?.handleBlur}
                        className={`${inputStyle}`} type="password" name="password" id="password" placeholder='john@Doe1' />

                </div>
                <button  type='submit' className='bg-[#E58914] text-white disabled:opacity-20 p-2 rounded-lg hover:opacity-80'>SignUp</button>
                {/* <div>
                    <OAuth />
                </div> */}
                {/* <p className="text-sm text-violet-50 font-semibold">{message}</p> */}
            </form>
        </div>
    )
}

export default Form