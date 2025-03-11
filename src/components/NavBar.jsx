import { Link, useLocation } from "react-router-dom";

const links = [
    { 
        name: "Home",
        path: "/"
    },
    {
        name: "Game Rules",
        path: "/game-rules"
    },
    {
        name: "High Scores",
        path: "/high-scores"
    }
]

const NavBar = () => {
    const location = useLocation();
    const currentPath = location.pathname;

  return (
    <nav className="flex gap-10 justify-end">
          {links.map((link, index) => {
            return <Link to={link.path} key={index} 
            className={`${link.path === currentPath && 
              "text-yellow-800 border-yellow-800"} hover:text-yellow-800`}>{link.name}</Link>
          })}
    </nav>
  )
};

export default NavBar;