import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import GameRules from "./GameRules";
import HighScores from "./HighScores";
import Games from "./Games";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Header/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/game/easy" element={<Games/>}/>
          <Route path="/game/normal" element={<Games/>}/>
          <Route path="/rules" element={<GameRules/>}/>
          <Route path="/highscores" element={<HighScores />}/>
        </Route>
      </Routes>
    </>
  )
};

export default App;
