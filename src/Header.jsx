import { Link, Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useState } from "react";
import MobileNav from "./components/MobileNav";

const Header = () => {
  const [showNav,setShowNav] = useState(false);

  const handleClick = () => {
    setShowNav(!showNav);
  }

  return (
    <>
    {/* header for desktop */}
    <header className="pt-[20px] hidden sm:flex sm:flex-col md:flex-row md:justify-between mb-6 items-center">
        <div className="flex gap-2 ">
            <img className="filter-(--filter-logo) rounded-xl h-fit" src="/src/assets/battleshiponline-logo.png" alt="battleship-logo"/>
            <h1 className="text-4xl md:text-5xl font-rubik-pixels mt-auto text-yellow-800">BattleShip Game</h1>
        </div>
        <NavBar />
    </header>


    {/* header for mobile */}
    <header className="mt-5 sm:hidden flex items-center">
      <Link className="flex-grow text-center" to={"/"}>
        <h1 className="text-3xl font-rubik-pixels text-yellow-800">Battleship Game</h1>
      </Link>
      <button className="cursor-pointer" onClick={handleClick}>
        <img className="h-8" src="/src/assets/navigation-bar.png" alt="nav-bar"/>
      </button>
    </header>
    {showNav && <MobileNav />}
    <Outlet />
    </>
  )
};

export default Header;