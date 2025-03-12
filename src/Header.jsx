import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

const Header = () => {
  return (
    <>
    <header className="pt-[20px] hidden sm:flex flex-row justify-between mb-6">
        <div className="flex gap-2">
            <img className="filter-(--filter-logo) rounded-xl h-fit" src="/src/assets/battleshiponline-logo.png" alt="battleship-logo"/>
            <h1 className="text-5xl font-rubik-pixels mt-auto text-yellow-800">BattleShip Game</h1>
        </div>
        <NavBar />
    </header>

    <Outlet />
    </>
  )
};

export default Header;