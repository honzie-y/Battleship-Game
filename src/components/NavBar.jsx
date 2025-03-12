import { Link, useLocation } from "react-router-dom";

const links = [
    { 
        name: "Home",
        path: "/"
    },
    {
        name: "Game Rules",
        path: "/rules"
    },
    {
        name: "High Scores",
        path: "/highscores"
    }
]

const NavBar = () => {
    const location = useLocation();
    const currentPath = location.pathname;

  return (
    <nav className="flex gap-10 justify-end pt-5">
          {links.map((link, index) => {
            return <Link to={link.path} key={index} 
            className={`${link.path === currentPath && 
              "text-yellow-800 border-b-2 border-yellow-800"} hover:text-yellow-800`}>{link.path === currentPath && "⛴ "}{link.name}</Link>
          })}
    </nav>
  )
};

export default NavBar;