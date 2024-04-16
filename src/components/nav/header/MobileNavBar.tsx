import { useAppSelector } from "@/redux/hooks/hooks";
import { RxCross2 } from "react-icons/rx"
import { Link } from "react-router-dom"


type Props = {
    setIsMenuToggled: (value: boolean) => void;
    isMenuToggled: boolean
}

const MobileNavBar = ({ setIsMenuToggled, isMenuToggled }: Props) => {
    const { isAuthenticated } = useAppSelector((store) => store?.user);
    return (

        <div className="fixed right-0 bottom-0 h-full z-40 w-[30%] bg-primary-100 bg-opacity-70 drop-shadow-xl">
            <div className="flex justify-end p-12">
                <button onClick={() => setIsMenuToggled(!isMenuToggled)} className="border-none bg-transparent">
                    <RxCross2 className="h-6 w-6 text-slate-600" />
                </button>
            </div>
            {/* Mobile Menu */}

            <div className={` w-full flex justify-center `}>
                <ul className={`flex flex-col   gap-4 font-semibold text-pink-800 text-xs sm:text-sm list-none`}>
                    <li className="text-pink-800 hover:text-white"><Link to={'/'}>Home</Link></li>
                    <li className="text-pink-800 hover:text-white"><Link to={'/about'}>About</Link></li>
                    <li className="text-pink-800 hover:text-white"><Link to={isAuthenticated ? "/profile" : '/login'}> {isAuthenticated ? "Profile" : "Login"}</Link></li>
                </ul>

            </div>
        </div>
    )
}

export default MobileNavBar