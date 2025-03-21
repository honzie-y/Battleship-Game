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

const MobileNav = ({navRef}) => {

    const location = useLocation();
    const currentPath = location.pathname;

  return (
    <div className="fixed right-1 px-2 py-2 text-center bg-yellow-800/95 rounded-2xl" ref={navRef}>
        <nav>
            <ul className="grid grid-rows-3 gap-3">
                {
                    links.map((link, index) => {
                        return <li><Link to={link.path} key={index} className={`${link.path === currentPath && 'bg-yellow-900'} hover:bg-yellow-900 rounded-xl px-2`}>{link.name}</Link></li>
                    })
                }
            </ul>
        </nav>
    </div>
  )
};

export default MobileNav;