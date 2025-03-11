import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

const Header = () => {
  return (
    <>
    <header className="pt-[20px] flex flex-row justify-between mb-6">
        <img className="filter-(--filter-logo) rounded-xl" src="/src/assets/battleshiponline-logo.png" alt="battleship-logo"/>
        <NavBar />
    </header>

    <Outlet />
    </>
  )
};

export default Header;