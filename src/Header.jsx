import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

const Header = () => {
  return (
    <>
    <header className="pt-[20px] flex flex-row justify-between">
        <img className="filter-(--filter-logo)" src="/src/assets/battleshiponline-logo.png" alt="battleship-logo"/>
        <NavBar />
    </header>

    <Outlet />
    </>
  )
};

export default Header;