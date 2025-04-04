import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Timer from '../components/Timer';
import GridBoard from '../components/GridBoard';
import StaticShips from '../components/StaticShips';
import Alert from '../components/Alert';
import { HistoryContext } from '../context/HistoryContext';

const EasyGame = () => {
    const location = useLocation();
    
    const path = location.pathname;

    const [gameEnter, setGameEnter] = useState(false);

    const [hitStart, setHitStart] = useState(false);

    const [restart, setRestart] = useState(false);

    const [turn, setTurn] = useState('');

    const [placed, setPlaced] = useState(false);

    const [myShipsPosition, setMyShipsPosition] = useState([]);

    const [enemyShipsPosition, setEnemyShipsPosition] = useState([]);

    const [username, setUsername] = useState('');

    const [someoneWins, setSomeoneWins] = useState(false);

    const [time, setTime] = useState(0);

    const [myThrew, setMyThrew] = useState(false);

    const [winner, setWinner] = useState('');

    const {nameMode, setNameMode, hasHistory, setHasHistory ,storeLastData, getLastData, removeData} = useContext(HistoryContext);

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

    const columns = 10;

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

    const setNoHitBoard = () => {
        const initialValue = [];
        for(let i = 0; i < rows; i++) {
            const row = [];
            for(let j = 0; j < columns; j++) {
                row.push(false);
            }
            initialValue.push(row);
        }
        return initialValue;
    }

    const [myGrids, setMyGrids] = useState(() => setBlankBoard());

    const [enemyGrids, setEnemyGrids] = useState(() => setBlankBoard());

    const [myShipsCon, setMyShipsCon] = useState(() => setNoHitBoard());

    const [enemyShipsCon, setEnemyShipsCon] = useState(() => setNoHitBoard());

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
                    let startRow = getRandomInt(rows);
                    let startCol = getRandomInt(columns + 1 - shipSpace);
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
                    let startRow = getRandomInt(rows + 1 - shipSpace);
                    let startCol = getRandomInt(columns);
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
                setMyThrew(true);
                setEnemyGrids(newGrids);
                setTurn("Enemy Board");
            } else { 
                setMyThrew(false);
                setMyGrids(newGrids);
                setTurn("My Board");             
            }
        }
    };

    const hitOrPause = () => {
        //if(placed === true) {
            setHitStart(!hitStart);
            setRestart(false);
            if(myThrew === false) {
                setTurn("My Board");
            } else {
                setTurn("Enemy Board");
            }
        //}   
    };

    const clickToPlace = () => {
            //if(placed === false) {
                if(getLastData(nameMode) === null) {
                    randomPlaceShips(myGrids);
                    randomPlaceShips(enemyGrids);
                } else {
                    const {latestMyGrid, latestEnemyGrid, latestMyPos, latestEnemyPos, latestMyShipsCon, latestEnemyShipsCon ,lastTime, lastThrew} = JSON.parse(getLastData(nameMode));
                    if(latestMyPos.length === 0 && latestEnemyPos.length === 0) {
                        randomPlaceShips(myGrids);
                        randomPlaceShips(enemyGrids);
                    } else {
                        setMyGrids(latestMyGrid);
                        setEnemyGrids(latestEnemyGrid);
                        setMyShipsPosition(latestMyPos);
                        setEnemyShipsPosition(latestEnemyPos);
                        setMyShipsCon(latestMyShipsCon);
                        setEnemyShipsCon(latestEnemyShipsCon);
                        setTime(lastTime);
                        setMyThrew(lastThrew);
                        setHasHistory(true);
                    }
                }
                setPlaced(true);
            //} 
        }

    const clickReset = () => {
        setHitStart(false);
        setPlaced(false);
        setRestart(true);
        setSomeoneWins(false);
        setMyThrew(false);
        setHasHistory(false);
        setTime(0);
        setMyGrids(() => setBlankBoard());
        setEnemyGrids(() => setBlankBoard());
        setMyShipsPosition([]);
        setEnemyShipsPosition([]);
        setMyShipsCon(() => setNoHitBoard());
        setEnemyShipsCon(() => setNoHitBoard());
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

    const calcSunkShip = (shipsPosition, gridBoard, shipsCon) => {
        const newShipsCon = [...shipsCon];
        for(const shipPos of shipsPosition) {
            if(shipPos.direction === 'horizontal') {
                let sink = true;
                const startRow = shipPos.startRow;
                const startCol = shipPos.startCol;
                for(let i = 0; i < shipPos.shipSpace; i++) {
                    if(gridBoard[startRow][startCol + i] === 'ship') {
                      sink = false;
                    }
                }
                if(sink) {
                    for(let i = 0; i < shipPos.shipSpace; i++) {
                        newShipsCon[startRow][startCol + i] = true;
                    }
                }
            } else {
                let sink = true;
                const startRow = shipPos.startRow;
                const startCol = shipPos.startCol;
                for(let i = 0; i < shipPos.shipSpace; i++) {
                    if(gridBoard[startRow + i][startCol] === 'ship') {
                      sink = false;
                    }
                }
                if(sink) {
                    for(let i = 0; i < shipPos.shipSpace; i++) {
                        newShipsCon[startRow + i][startCol] = true;
                    }
                }
            }
        }
        if(shipsCon === myShipsCon) {
            setMyShipsCon(newShipsCon);
        } else {
            setEnemyShipsCon(newShipsCon);
        }
    }

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
                let throwRow = getRandomInt(rows);
                let throwCol = getRandomInt(columns);
                if(myGrids[throwRow][throwCol] !== 'hit' && myGrids[throwRow][throwCol] !== 'miss') {
                    throwBomb(throwRow, throwCol);
                    tryThrow = false;
                }
            }  
        }

    }, [turn]);

    // The function monitors my board and decides if computer wins
    useEffect(() => {

        if(placed === true && hitStart === true && calcWinner(myShipsPosition, myGrids) === true) {
            setHitStart(false);
            setSomeoneWins(true);
            setTimeout(() => setTurn("Enemy Board"), 1000);
            setWinner('Computer');
        }

        if(placed === true && hitStart === true) {
            calcSunkShip(myShipsPosition, myGrids, myShipsCon);
        }

        if(nameMode && (hitStart || restart)) {
            storeLastData(myGrids, enemyGrids, myShipsPosition, enemyShipsPosition, myShipsCon, enemyShipsCon ,time, myThrew);
        }


    }, [myGrids]);

    // The function monitors enemy's board and decides if I win
    useEffect(() => {
        if(placed === true && hitStart === true && calcWinner(enemyShipsPosition, enemyGrids) === true) {
            setHitStart(false);
            setSomeoneWins(true);
            setTimeout(() => setTurn("My Board"), 1000);
            setWinner('You');
        }

        if(placed === true && hitStart === true) {
            calcSunkShip(enemyShipsPosition, enemyGrids, enemyShipsCon);
        }

        if(nameMode && (hitStart || restart)) {
            storeLastData(myGrids, enemyGrids, myShipsPosition, enemyShipsPosition, myShipsCon, enemyShipsCon, time, myThrew);
        }
    }, [enemyGrids]);


    // The function clears the game data when there is a winner
    useEffect(() => {
        if(someoneWins) {
            removeData(nameMode);
        }
    },[someoneWins]);

    const navigate = useNavigate();
    
    const handleExit = () => {
        navigate('/');
    };

  return (
    <div className='flex flex-col items-center justify-center pb-15 min-h-[calc(100vh-200px)]'>
        <h1 className='mt-3 font-barrio text-2xl sm:text-3xl bg-yellow-800 w-fit px-3'>Easy Mode</h1>

        <form onSubmit={handleSubmit} className={`${gameEnter === true && 'hidden'} flex-col gap-4 mt-5 bg-secondary/30 w-100 h-100 sm:w-150 sm:h-100 flex items-center justify-center rounded-2xl border-2 border-yellow-800`}>
            <input id='username' type="text" value={username} onChange={handleUsernameInput} className='border-3 text-black border-secondary text-center focus:border-yellow-800 focus:outline-none' placeholder='enter a username'/>
            <button className='border-3 px-2 h-fit w-fit hover:bg-yellow-800 cursor-pointer text-[15px] sm:text-xl' onClick={clickStartGame} type='submit'>Enter Game</button>
        </form>

        <div className={`${gameEnter ? 'block' : 'hidden'} flex flex-col items-center`}>
            {/* !!!!!!design problem with game start */}
            {hasHistory && <Alert text={'Your history is restored'} leftButton={'Start a new game'} rightButton={'Continue'} handleLeft={clickReset} handleRight={() => setHasHistory(false)}/>}
            {someoneWins && <Alert text={winner === 'You' ? 'You win!' : 'Computer wins😭'} leftButton={'Exit'} rightButton={'Start a new game'} handleLeft={handleExit} handleRight={clickReset}/>}
            <div className='fixed flex flex-col gap-2 items-center left-5 top-17 sm:top-30 bg-yellow-800/50 px-2 py-2 rounded-[5px] text-[15px] sm:text-xl'>
                <Timer time={time}/>
                <button className='border-3 px-2 hover:bg-yellow-800 cursor-pointer' onClick={hitOrPause} disabled={someoneWins || !placed}>{hitStart ? "Pause Game" : "Start Hit"}</button>
                <button className='border-3 px-2 hover:bg-yellow-800 cursor-pointer' onClick={clickToPlace} disabled={placed}>Place Ships</button>
                <button className='border-3 px-2 hover:bg-yellow-800 cursor-pointer' onClick={clickReset}>Reset</button>
            </div>

            <h1 className="mt-3 w-80 sm:w-100 md:w-150">Notice: I will try to make computer's algorithm better.</h1>

            <div className='flex flex-col items-center sm:flex-row sm:justify-center sm:gap-4 md:gap-10'>
                <StaticShips />
                <GridBoard playerBoard={enemyGrids} playerWho={"Enemy Board"} whosTurn={turn} throwBomb={throwBomb} hitStart={hitStart} path={path} threw={myThrew} shipsCon={enemyShipsCon}/>
            </div>
        </div>
            
    </div>
  )
}

export default EasyGame;