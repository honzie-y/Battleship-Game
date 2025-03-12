import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import GameRules from "./GameRules";
import HighScores from "./HighScores";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<Home />}/>
          <Route path="/easy" />
          <Route path="/normal"/>
          <Route path="/rules" element={<GameRules/>}/>
          <Route path="/highscores" element={<HighScores />}/>
        </Route>
      </Routes>
    </>
  )
};

export default App;
