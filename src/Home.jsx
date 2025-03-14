import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto flex flex-col justify-center items-center min-h-[calc(100vh-150px)]">
      <h1 className="text-center font-barrio text-4xl sm:text-5xl">Welcome to the Game!</h1>
      <p className="mt-10 text-xl sm:text-2xl text-center">Choose your difficulty level:</p>
      <div className="flex gap-40 justify-center text-3xl sm:text-4xl mt-4">
        <Link to={"/easy"} className="hover:bg-yellow-800/50 rounded-2xl px-5 text-center">Easy</Link>
        <Link to={"/normal"} className="hover:bg-yellow-800/50 rounded-2xl px-5 text-center">Normal</Link>
      </div>
      <p className="mt-10 text-xl sm:text-2xl text-center">Check out the game rules:</p>
      <Link to={"/rules"} className="mt-4 text-xl sm:text-2xl text-center hover:bg-yellow-800/50 rounded-2xl px-5">GAME RULES</Link>
    </div>
  )
};

export default Home;