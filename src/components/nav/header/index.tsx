import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks/hooks.ts";
import useMediaQuery from '@/utils/hooks/useMediaQuery.ts';
import { FaSearch } from 'react-icons/fa';
import NavTags from "./NavTags";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import MobileNavBar from "./MobileNavBar";


const Header = () => {
  const [search, setSearch] = useState<string>('');
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false)
  const isAboveMediumScreen = useMediaQuery('(min-width : 768px)');
  const navigate = useNavigate();
  const location = useLocation();


  const handleHeaderFormSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('search', search);
    const searchQuery = urlParams.toString();
    navigate(`/fetch?${searchQuery}`);
  };


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromURL = urlParams.get('search');
    if (searchTermFromURL) {
      setSearch(searchTermFromURL);
    }
  }, [location.search]);

  return (
    <header className="bg-primary-300 w-full">
      <div className="flex justify-between items-center w-full md:max-w-7xl p-4 mx-auto  ">
        <Link className="flex  w-1/6 " to="/">
          <h1 className="font-bold text-xs md:text-xl sm:text-lg flex flex-wrap">
            <span className=" text-gray-700">easy</span>
            <span className=" text-orange-700">Estates</span>
          </h1>
        </Link>

        <form action="" className="flex justify-center w-3/4 " onSubmit={handleHeaderFormSubmit}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-5/6 sm:w-5/6 px-2 sm:px-6 rounded-lg placeholder:text-black border-b border-b-gray-700
            bg-transparent outline-none placeholder:text-xs md:placeholder:text-[1rem] sm:placeholder:text-sm  sm:text-lg   sm:placeholder::text-lg"
            placeholder="Apartments near Me...."
          />
          <button className="-ml-4 sm:-ml-8" type="submit">
            <FaSearch className="text-sm sm:text-lg" />
          </button>
        </form>

        {
          isAboveMediumScreen ? (<NavTags />) : (
            <button className="rounded-full   p-2 border-none" onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <FaBars className="h-5   w-5 sm:h-6 sm:w-6  text-white" />
            </button>
          )
        }
      </div>
      {
        !isAboveMediumScreen && isMenuToggled && (
          <MobileNavBar isMenuToggled={isMenuToggled} setIsMenuToggled={setIsMenuToggled} />
        )
      }
    </header>
  )
}

export default Header