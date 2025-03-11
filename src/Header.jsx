import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

const Header = () => {
  return (
    <>
    <header className="pt-[20px] flex flex-row justify-between mb-6">
        <div className="flex gap-2">
            <img className="filter-(--filter-logo) rounded-xl" src="/src/assets/battleshiponline-logo.png" alt="battleship-logo"/>
            <h1 className="text-5xl font-rubik-pixels mt-auto">BattleShip Game</h1>
        </div>
        <NavBar />
    </header>

    <Outlet />
    </>
  )
};

export default Header;