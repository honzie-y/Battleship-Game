import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useEffect, useRef, useState } from "react";
import MobileNav from "./components/MobileNav";
import gameLogo from './assets/battleshiponline-logo.png';
import navLogo from './assets/navigation-bar.png';

const Header = () => {
  const [showNav,setShowNav] = useState(false);
  const navRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const toggleNav = () => {
    setShowNav(!showNav);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && 
        !navRef.current.contains(event.target) && 
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)) {
          setShowNav(false);
        }
    }

    const handleWindowResize = () => {
      if(window.innerWidth > 600) {
        setShowNav(false);
      }
    }

    if(showNav) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("resize", handleWindowResize);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleWindowResize);
    }
  }, [showNav]);

  return (
    <>
    {/* header for desktop */}
    <header className="pt-[20px] hidden sm:flex sm:flex-col md:flex-row md:justify-between mb-6 items-center">
        <div className="flex gap-2 ">
            <img className="filter-(--filter-logo) rounded-xl h-fit" src={gameLogo} alt="battleship-logo"/>
            <h1 className="text-4xl md:text-5xl font-rubik-pixels mt-auto text-yellow-800">BattleShip Game</h1>
        </div>
        <NavBar />
    </header>


    {/* header for mobile */}
    <header className="mt-5 sm:hidden flex items-center">
        <h1 className="text-3xl font-rubik-pixels text-yellow-800 flex-grow text-center">Battleship Game</h1>
      <button className="cursor-pointer" onClick={toggleNav} ref={toggleButtonRef}>
        <img className="h-6" src={navLogo} alt="nav-bar"/>
      </button>
    </header>
    {showNav && <MobileNav navRef={navRef}/>}
    <Outlet />
    </>
  )
};

export default Header;