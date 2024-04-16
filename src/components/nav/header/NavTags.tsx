import { Link } from "react-router-dom";

import { useAppSelector } from "@/redux/hooks/hooks.ts";

const NavTags = () => {

    const { currentUser, isAuthenticated } = useAppSelector((store) => store.user);

    return (
        <div className="">

            <ul className="flex gap-6 items-center ">
                <li className="hidden sm:inline-block text-pink-800 hover:text-white  hover:underline font-semibold">
                    <Link to="/">Home</Link>
                </li>
                <li className="hidden sm:inline-block text-pink-800 hover:text-white  hover:underline font-semibold">
                    <Link to="/about">About</Link>
                </li>
                <Link to="/profile">
                    {isAuthenticated && currentUser ? (
                        <img
                            className="rounded-full w-8 h-8 object-cover"
                            src={currentUser.avatar}
                            alt="Profile Photo"
                        />
                    ) : (
                        <li className=" hover:underline text-pink-800 hover:text-white font-semibold">
                            Login
                        </li>
                    )}
                </Link>
            </ul>
        </div>
    )
}

export default NavTags;