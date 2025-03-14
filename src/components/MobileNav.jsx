import { Link } from "react-router-dom";


const MobileNav = ({navRef}) => {
  return (
    <div className="fixed right-1 px-2 py-2 text-center bg-yellow-800/95 rounded-2xl" ref={navRef}>
        <nav>
            <ul className="grid grid-rows-3 gap-3">
                <li>
                    <Link to={"/"} className="hover:bg-yellow-900 rounded-xl px-2">Home</Link>
                </li>
                <li>
                    <Link to="/rules" className="hover:bg-yellow-900 rounded-xl px-2">Game Rules</Link>
                </li>
                <li>
                    <Link to={"/highscores"} className="hover:bg-yellow-900 rounded-xl px-2">High Scores</Link>
                </li>
            </ul>
        </nav>
    </div>
  )
};

export default MobileNav;