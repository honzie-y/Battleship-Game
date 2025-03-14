import { Link } from "react-router-dom";


const MobileNav = ({navRef}) => {
  return (
    <div className="fixed right-1 w-25 pb-2 text-center bg-yellow-800/95 rounded-2xl" ref={navRef}>
        <nav>
            <ul className="grid grid-rows-3 gap-3">
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                <li>
                    <Link to="/rules">Game Rules</Link>
                </li>
                <li>
                    <Link to={"/highscores"}>High Scores</Link>
                </li>
            </ul>
        </nav>
    </div>
  )
};

export default MobileNav;