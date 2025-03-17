import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Timer from './components/Timer';
import GridBoard from './components/GridBoard';
import Ships from './components/Ships';

const Games = () => {
    const location = useLocation();
    const path = location.pathname;

    const [gameStart, setGameStart] = useState(false);

    const rows = 10;
    const columns = 9;

    const [myGrids, setMyGrids] = useState(() => {
        const initialValue = [];
        for(let i = 0; i < rows; i++) {
            const row = [];
            for(let j = 0; j < columns; j++) {
                row.push("blank");
            }
            initialValue.push(row);
        }
        return initialValue;
    });

    const [enemyGrids, setEnemyGrids] = useState(() => {
        const initialValue = [];
        for(let i = 0; i < rows; i++) {
            const row = [];
            for(let j = 0; j < columns; j++) {
                row.push("blank");
            }
            initialValue.push(row);
        }
        return initialValue;
    });

    const valueTypes = ["blank", "ship", "hit", "miss"];


    const clickStartGame = () => {
        alert("Game started");
    }

  return (
    <div className='flex flex-col items-center justify-center pb-15 min-h-[calc(100vh-200px)]'>
        {path === "/game/easy" && <h1 className='mt-3 font-barrio text-2xl sm:text-3xl bg-yellow-800 w-fit px-3'>Easy Mode</h1>}
        {path === "/game/normal" && <h1 className='mt-3 font-barrio text-2xl sm:text-3xl bg-yellow-800 w-fit px-3'>Normal Mode</h1>}
        
        <div className='fixed left-5 top-18 sm:top-30 bg-yellow-800/50 px-2 rounded-[5px] sm:text-xl'><Timer isRunning={false}/></div>

        <button className='text-xl sm:text-2xl mt-5 border-3 px-2 hover:bg-yellow-800 cursor-pointer' onClick={clickStartGame}>Start Game</button>

        <div className='flex flex-col items-center sm:flex-row sm:justify-center sm:gap-2 md:gap-10'>
            <GridBoard playerBoard={enemyGrids} playerWho={"Enemy Board"}/>
            <Ships />
            <GridBoard playerBoard={myGrids} playerWho={"My Board"}/>
        </div>
     
    </div>
  )
}

export default Games;