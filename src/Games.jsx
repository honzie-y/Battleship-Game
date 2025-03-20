import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Timer from './components/Timer';
import GridBoard from './components/GridBoard';
import Ships from './components/Ships';

const Games = () => {
    const location = useLocation();
    
    const path = location.pathname;

    const [gameEnter, setGameEnter] = useState(false);

    const [restart, setRestart] = useState(false);

    const [hitStart, setHitStart] = useState(false);

    const [turn, setTurn] = useState("Enemy Board");

    const [placed, setPlaced] = useState(false);

    const [myShipsPosition, setMyShipsPosition] = useState([]);

    const [enemyShipsPosition, setEnemyShipsPosition] = useState([]);

    const [username, setUsername] = useState('');

    const [nameMode, setNameMode] = useState('');

    const [someoneWins, setSomeoneWins] = useState(false);

    const [time, setTime] = useState(0);

    const [myThrew, setMyThrew] = useState(false);

    useEffect(() => {
        let intervalId;

        if (hitStart) {
            intervalId = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [hitStart]);
    
    const rows = 10;

    const columns = 9;

    const setBlankBoard = () => {
        const initialValue = [];
        for(let i = 0; i < rows; i++) {
            const row = [];
            for(let j = 0; j < columns; j++) {
                row.push("blank");
            }
            initialValue.push(row);
        }
        return initialValue;
    }

    const [myGrids, setMyGrids] = useState(() => setBlankBoard());

    const [enemyGrids, setEnemyGrids] = useState(() => setBlankBoard());
    

    // const valueTypes = ["blank", "ship", "hit", "miss"];

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    };

    const randomPlaceShips = (playerGrids) => {
        const newGrids = [...playerGrids];
        const directions = ['horizontal', 'vertical'];

        const placeOneShip = (shipSpace) => {
            let cannotPlace = false;
            while(!cannotPlace) {
                let direction = directions[getRandomInt(2)];
                let placeable = true;
                if(direction === 'horizontal') {
                    let startRow = getRandomInt(10);
                    let startCol = getRandomInt(10 - shipSpace);
                    for(let i = 0; i < shipSpace ; i++ ) {
                        if(newGrids[startRow][startCol + i] === 'ship') {
                            placeable = false;
                            break;
                        }
                    }
                    if(placeable) {
                        for(let i = 0; i < shipSpace; i++) {
                            newGrids[startRow][startCol + i] = 'ship';
                        }

                        if(playerGrids === myGrids) {
                            setMyShipsPosition(prev => [...prev, {
                                direction: direction,
                                shipSpace: shipSpace,
                                startRow: startRow,
                                startCol: startCol,
                            }]);
                        } else {
                            setEnemyShipsPosition(prev => [...prev, {
                                direction: direction,
                                shipSpace: shipSpace,
                                startRow: startRow,
                                startCol: startCol,
                            }]);
                        }
                        cannotPlace = true;
                    }
                } else {
                    let startRow = getRandomInt(11 - shipSpace);
                    let startCol = getRandomInt(9);
                    for(let i = 0; i < shipSpace; i++) {
                        if(newGrids[startRow + i][startCol] === 'ship') {
                            placeable = false;
                            break;
                        }
                    }
                    if(placeable) {
                        for(let i = 0; i < shipSpace; i++) {
                            newGrids[startRow + i][startCol] = 'ship';
                        }
                        if(playerGrids === myGrids) {
                            setMyShipsPosition(prev => [...prev, {
                                direction: direction,
                                shipSpace: shipSpace,
                                startRow: startRow,
                                startCol: startCol,
                            }]);
                        } else {
                            setEnemyShipsPosition(prev => [...prev, {
                                direction: direction,
                                shipSpace: shipSpace,
                                startRow: startRow,
                                startCol: startCol,
                            }]);
                        }
                        cannotPlace = true;
                    }
                }
            }
            
        }

        placeOneShip(5);
        placeOneShip(4);
        placeOneShip(3);
        placeOneShip(3);
        placeOneShip(2);

        if(playerGrids === myGrids) {
            setMyGrids(newGrids);
        } else {
            setEnemyGrids(newGrids);
        }
    };
    
    const clickStartGame = () => {
        setGameEnter(true);
    };

    const throwBomb = (rowIdx, colIdx) => {
        
        const newGrids = turn === "My Board" ?  [...enemyGrids] : [...myGrids];

        if(newGrids[rowIdx][colIdx] !== 'miss' && newGrids[rowIdx][colIdx] !== 'hit') {
            if(newGrids[rowIdx][colIdx] === 'blank') {
                newGrids[rowIdx][colIdx] = 'miss';
            } else if(newGrids[rowIdx][colIdx] === 'ship'){
                newGrids[rowIdx][colIdx] = 'hit';
            }
    
           
            if(turn === "My Board") {
                setEnemyGrids(newGrids);
                if(path === '/game/normal') {
                    setMyThrew(true);
                    setTimeout(() => setTurn("Enemy Board"), 1000); 
                } else {
                    setTurn("Enemy Board");
                }
            } else {
                if(path === '/game/normal') {
                    setTimeout(() => setMyGrids(newGrids), 1000);
                    setMyThrew(false);
                    setTimeout(() => setTurn("My Board"), 2000);
                } else {
                    setMyGrids(newGrids);
                    setTurn("My Board");
                }
                
            }
        }
    };

    const hitOrPause = () => {
        //if(placed === true) {
            setHitStart(!hitStart);
            setRestart(false);
            if(turn === 'Enemy Board') setTurn('My Board');
        //}   
    };

    const clickToPlace = () => {
            //if(placed === false) {
                if(localStorage.getItem(nameMode) === null) {
                    randomPlaceShips(myGrids);
                    randomPlaceShips(enemyGrids);
                } else {
                    const {latestMyGrid, latestEnemyGrid, latestMyPos, latestEnemyPos, time} = JSON.parse(localStorage.getItem(nameMode));
                    if(latestMyPos.length === 0 && latestEnemyPos.length === 0) {
                        randomPlaceShips(myGrids);
                        randomPlaceShips(enemyGrids);
                    } else {
                        setMyGrids(latestMyGrid);
                        setEnemyGrids(latestEnemyGrid);
                        setMyShipsPosition(latestMyPos);
                        setEnemyShipsPosition(latestEnemyPos);
                        setTime(time);
                    }
                }
                setPlaced(true);
            //} 
        }

    const clickReset = () => {
        setRestart(true);
        setHitStart(false);
        setPlaced(false);
        setSomeoneWins(false);
        setTime(0);
        setMyGrids(() => setBlankBoard());
        setEnemyGrids(() => setBlankBoard());
        setMyShipsPosition([]);
        setEnemyShipsPosition([]);
        setTurn("Enemy Board");
    };

    const calcWinner = (positions, gridBoard) => {
        for(const position of positions) {
            const startRow = position.startRow;
            const startCol = position.startCol;
            if(position.direction === 'horizontal') {
                for(let i = 0; i < position.shipSpace; i++) {
                   if(gridBoard[startRow][startCol + i] !== 'hit') {
                    return false;
                   }
                }
            } else {
                for(let i = 0; i < position.shipSpace; i++) {
                    if(gridBoard[startRow + i][startCol] !== 'hit') {
                        return false;
                    }
                }
            }
        }
        return true;
    };

    const handleUsernameInput = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = (e) => {
       e.preventDefault();
       setNameMode(username+'-'+path);
    }

    // computer attacks
    useEffect(() => {
        if(turn === 'Enemy Board' && hitStart) {
            let tryThrow = true;
            while(tryThrow) {
                let throwRow = getRandomInt(10);
                let throwCol = getRandomInt(9);
                if(myGrids[throwRow][throwCol] !== 'hit' && myGrids[throwRow][throwCol] !== 'miss') {
                    throwBomb(throwRow, throwCol);
                    tryThrow = false;
                }
            }  
        }

    }, [turn]);


    const storeLastData = (latestMyGrid, latestEnemyGrid, latestMyPos, latestEnemyPos, time) => {
        const latestData = {latestMyGrid, latestEnemyGrid, latestMyPos, latestEnemyPos, time};
        localStorage.setItem(nameMode, JSON.stringify(latestData));
    };

    // The function monitors my board and decides if computer wins
    useEffect(() => {
        if(placed === true && hitStart === true && calcWinner(myShipsPosition, myGrids) === true) {
            setHitStart(false);
            setSomeoneWins(true);
            setTimeout(() => setTurn("Enemy Board"), 2000);
            setTimeout(() => alert("Computer wins"), 2000);
        }
        if(nameMode) {
            storeLastData(myGrids, enemyGrids, myShipsPosition, enemyShipsPosition, time);
        }
    }, [myGrids]);

    // The function monitors enemy's board and decides if I win
    useEffect(() => {
        if(placed === true && hitStart === true && calcWinner(enemyShipsPosition, enemyGrids) === true) {
            setHitStart(false);
            setSomeoneWins(true);
            setTimeout(() => setTurn("My Board"), 2000);
            setTimeout(() => alert("You win"), 2000);
        }
        if(nameMode) {
            storeLastData(myGrids, enemyGrids, myShipsPosition, enemyShipsPosition, time);
        }
    }, [enemyGrids]);


    // The function clears the game data when there is a winner
    useEffect(() => {
        if(someoneWins) {
            localStorage.removeItem(username);
        }
    },[someoneWins]);

  return (
    <div className='flex flex-col items-center justify-center pb-15 min-h-[calc(100vh-200px)]'>
        {path === "/game/easy" && <h1 className='mt-3 font-barrio text-2xl sm:text-3xl bg-yellow-800 w-fit px-3'>Easy Mode</h1>}
        {path === "/game/normal" && <h1 className='mt-3 font-barrio text-2xl sm:text-3xl bg-yellow-800 w-fit px-3'>Normal Mode</h1>}
        
        <form onSubmit={handleSubmit} className={`${gameEnter === true && 'hidden'} flex-col gap-4 mt-5 bg-secondary/30 w-100 h-100 sm:w-150 sm:h-100 flex items-center justify-center rounded-2xl border-2 border-yellow-800`}>
            <input id='username' type="text" value={username} onChange={handleUsernameInput} className='border-3 text-black border-secondary text-center focus:border-yellow-800 focus:outline-none' placeholder='enter a username'/>
            <button className='border-3 px-2 h-fit w-fit hover:bg-yellow-800 cursor-pointer text-[15px] sm:text-xl' onClick={clickStartGame} type='submit'>Enter Game</button>
        </form>

        <div className={`${gameEnter ? 'block' : 'hidden'} flex flex-col items-center`}>
            {/* !!!!!!design problem with game start */}
            <div className='fixed flex flex-col gap-2 items-center left-5 top-17 sm:top-30 bg-yellow-800/50 px-2 py-2 rounded-[5px] text-[15px] sm:text-xl'>
                <Timer time={time}/>
                <button className='border-3 px-2 hover:bg-yellow-800 cursor-pointer' onClick={hitOrPause} disabled={someoneWins || !placed}>{hitStart ? "Pause Game" : "Start Hit"}</button>
                <button className='border-3 px-2 hover:bg-yellow-800 cursor-pointer' onClick={clickToPlace} disabled={placed}>Place Ships</button>
                <button className='border-3 px-2 hover:bg-yellow-800 cursor-pointer' onClick={clickReset}>Reset</button>
            </div>

            <h1 className="mt-3 w-80 sm:w-100 md:w-150">Notice: Due to the time limit for this project and the game creator's current capability, the ships on both boards will only be generated randomly by the website. Maybe it'll be upgraded in the future so you can choose the positions as you wish.</h1>

            <div className='flex flex-col items-center sm:flex-row sm:justify-center sm:gap-4 md:gap-10'>
                <Ships />
                {path === '/game/normal' && <GridBoard playerBoard={myGrids} playerWho={"My Board"} whosTurn={turn} path={path}/>}
                <GridBoard playerBoard={enemyGrids} playerWho={"Enemy Board"} whosTurn={turn} throwBomb={throwBomb} hitStart={hitStart} path={path} threw={myThrew}/>
            </div>
        </div>
            
    </div>
  )
}

export default Games;