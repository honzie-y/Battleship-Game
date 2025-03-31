import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import GameRules from "./GameRules";
import HighScores from "./HighScores";
import EasyGame from "./games/EasyGame";
import NormalGame from "./games/NormalGame";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Header/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/game/easy" element={<EasyGame/>}/>
          <Route path="/game/normal" element={<NormalGame/>}/>
          <Route path="/rules" element={<GameRules/>}/>
          <Route path="/highscores" element={<HighScores />}/>
        </Route>
      </Routes>
    </>
  )
};

export default App;
