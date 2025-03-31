import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Timer from '../components/Timer';
import GridBoard from '../components/GridBoard';
import Alert from '../components/Alert';
import { HistoryContext } from '../context/HistoryContext';
import MoveableShips from '../components/MoveableShips';

const NormalGame = () => {
    const location = useLocation();
    
    const path = location.pathname;

    // enter game

    const [gameEnter, setGameEnter] = useState(false);


    // move ships to place them

    const [selectStart, setSelectStart] = useState(false);

    const boardRef = useRef(null);
        
    const [boardCo, setBoardCo] = useState({left: 0, right: 0, top: 0, bottom: 0});

    const [isDragging, setIsDragging] = useState('');


    // aircraft carrier info
    const airRef = useRef(null);
    const [airPos, setAirPos] = useState({x: 0, y: 0});
    const [airOffset, setAirOffset] = useState({x: 0, y: 0});
    const [airCo, setAirCo] = useState({left: 0, right: 0, top: 0, bottom: 0});
    const [airOnBoard, setAirOnBoard] = useState({row: 3, col: 2, direction: 'horizontal', length: 5});

    // battleship info
    const batRef = useRef(null);
    const [batPos, setBatPos] = useState({x: 0, y: 0});
    const [batOffset, setBatOffset] = useState({x: 0, y: 0});
    const [batCo, setBatCo] = useState({left: 0, right: 0, top: 0, bottom: 0});
    const [batOnBoard, setBatOnBoard] = useState({row: 0, col: 3, direction: 'horizontal', length: 4});

    // cruiser info
    const cruRef = useRef(null);
    const [cruPos, setCruPos] = useState({x: 0, y: 0});
    const [cruOffset, setCruOffset] = useState({x: 0, y: 0});
    const [cruCo, setCruCo] = useState({left: 0, right: 0, top: 0, bottom: 0});
    const [cruOnBoard, setCruOnBoard] = useState({row: 5, col: 5, direction: 'horizontal', length: 3});

    // submarine info
    const subRef = useRef(null);
    const [subPos, setSubPos] = useState({x: 0, y: 0});
    const [subOffset, setSubOffset] = useState({x: 0, y: 0});
    const [subCo, setSubCo] = useState({left: 0, right: 0, top: 0, bottom: 0});
    const [subOnBoard, setSubOnBoard] = useState({row: 7, col: 7, direction: 'horizontal', length: 3});

    // detroyer info
    const detRef = useRef(null);
    const [detPos, setDetPos] = useState({x: 0, y: 0});
    const [detOffset, setDetOffset] = useState({x: 0, y: 0});
    const [detCo, setDetCo] = useState({left: 0, right: 0, top: 0, bottom: 0});
    const [detOnBoard, setDetOnBoard] = useState({row: 9, col: 8, direction: 'horizontal', length: 2});
    

    const shipsInfo = {
        "Aircraft Carrier": [5, "grid-cols-5", "bg-cyan-900", airRef, airPos, setAirPos, airCo, setAirCo, airOffset, setAirOffset, airOnBoard, setAirOnBoard],
        "Battleship": [4, "grid-cols-4", "bg-emerald-900", batRef, batPos, setBatPos, batCo, setBatCo, batOffset, setBatOffset, batOnBoard, setBatOnBoard],
        "Cruiser": [3, "grid-cols-3", "bg-lime-900", cruRef, cruPos, setCruPos, cruCo, setCruCo, cruOffset, setCruOffset, cruOnBoard, setCruOnBoard],
        "Submarine": [3, "grid-cols-3", "bg-violet-900", subRef, subPos, setSubPos, subCo, setSubCo, subOffset, setSubOffset, subOnBoard, setSubOnBoard],
        "Detroyer": [2, "grid-cols-2", "bg-gray-600", detRef, detPos, setDetPos, detCo, setDetCo, detOffset, setDetOffset, detOnBoard, setDetOnBoard],
    };

    const [windowWidth, setWindowWidth] = useState(0);
    
    useEffect(() => {
        setWindowWidth(window.innerWidth);

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    },[]);


    useEffect(() => {

        const updateCoAndPos = () => {
            if(boardRef.current) {
                const boardRect = boardRef.current.getBoundingClientRect();
                setBoardCo({left: boardRect.left, right: boardRect.right, top: boardRect.top, bottom: boardRect.bottom});

                
                const cellSize = (boardRect.bottom - boardRect.top) / 10;
                Object.values(shipsInfo).forEach((shipInfo) => {
                    const shipOnBoard = shipInfo[10];
                    const newX = boardRect.left + shipOnBoard.col * cellSize;
                    const newY = boardRect.top + shipOnBoard.row * cellSize;
                    shipInfo[5]({x: newX, y: newY});
                });
            }
    
            Object.values(shipsInfo).forEach((shipInfo) => {
                if(shipInfo[3].current) {
                    const rect = shipInfo[3].current.getBoundingClientRect();
                    shipInfo[7]({left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom});
                }
            });
        }

        if(!placed) {
            updateCoAndPos();
        }
        

    }, [windowWidth, gameEnter]);
    

    const handleMousedown = (e, shipName) => {
        if(!shipsInfo[shipName][3].current) return;

        const shipRect = shipsInfo[shipName][3].current.getBoundingClientRect();
        shipsInfo[shipName][9]({
            x: e.clientX - shipRect.left,
            y: e.clientY - shipRect.top
        });

        setSelectStart(true);
        setIsDragging(shipName);
    }


    // so far it's just for horizontal ships
    const checkCollision = (newRow, newCol) => {
        let hasCollision = false;
        const keys = Object.keys(shipsInfo);
        const thisShipOnBoard = shipsInfo[isDragging][10];
        for(let key of keys) {
            if(key === isDragging) continue

            const otherShipOnBoard = shipsInfo[key][10];
            if(otherShipOnBoard.row === newRow && 
                ((newCol >= otherShipOnBoard.col && 
                newCol < otherShipOnBoard.col + otherShipOnBoard.length) ||
                (otherShipOnBoard.col >= newCol && otherShipOnBoard.col < newCol + thisShipOnBoard.length))) {
                    hasCollision = true;
                    break;
            }
        }

        return hasCollision;
    }

    const resolveCollision = (newRow, newCol) => {
        const length = shipsInfo[isDragging][10].length;
        let fixedRow = newRow, fixedCol = newCol;
        let breakOuter = false;
        for(let radius = 1; radius <= 9; radius++) {
            if(breakOuter === true) break;
            for(let dx = -radius; dx <= radius ; dx++) {
                if(breakOuter === true) break;
                for(let dy = -radius; dy <= radius; dy++) {
                    if(Math.abs(dx) === radius || Math.abs(dy) === radius) {
                        fixedRow = newRow + dy;
                        fixedCol = newCol + dx;

                        fixedRow = Math.min(Math.max(0, fixedRow), 9);
                        fixedCol = Math.min(Math.max(0, fixedCol), 9 - length + 1);

                        if(!checkCollision(fixedRow, fixedCol)) {
                            breakOuter = true;
                            break;
                        }
                    }
                }
            }
        }

        return {fixedRow, fixedCol};
    }
    


    const handleMousemove = (e) => {
        if(isDragging === '') return;

        const shipCo = shipsInfo[isDragging][6];

        const setShipPos = shipsInfo[isDragging][5];

        const shipPos = shipsInfo[isDragging][4];

        const oldX = shipPos.x;
        const oldY = shipPos.y;

        let movingX = e.clientX - shipsInfo[isDragging][8].x;
        let movingY = e.clientY - shipsInfo[isDragging][8].y;

        movingX = Math.max(boardCo.left, movingX);
        movingX = Math.min(boardCo.right - (shipCo.right - shipCo.left), movingX);

        movingY = Math.max(boardCo.top, movingY);
        movingY = Math.min(boardCo.bottom - (shipCo.bottom - shipCo.top), movingY);

        setShipPos({
            x: movingX, y: movingY
        });

        const handleMouseup = () => {
            const shipOnBoard = shipsInfo[isDragging][10];
            const setShipOnBoard = shipsInfo[isDragging][11];
            const cellSize = (boardCo.right - boardCo.left) / 10;

            const oldRow = shipOnBoard.row;
            const oldCol = shipOnBoard.col;

            const newCol = Math.floor((movingX - boardCo.left) / cellSize) ;
            const newRow = Math.floor((movingY - boardCo.top) / cellSize) ;
            const newX = Math.floor((movingX - boardCo.left) / cellSize) * cellSize + boardCo.left;
            const newY = Math.floor((movingY - boardCo.top) / cellSize) * cellSize + boardCo.top;

            if(checkCollision(newRow, newCol)) {
                const {fixedRow, fixedCol} = resolveCollision(newRow, newCol);
                if(fixedRow !== newRow || fixedCol !== newCol) {
                    const fixedX = fixedCol * cellSize + boardCo.left;
                    const fixedY = fixedRow * cellSize + boardCo.top;
                    
                    setShipPos({x: fixedX, y: fixedY});
                    setShipOnBoard({row: fixedRow, col: fixedCol, direction: shipOnBoard.direction, length: shipOnBoard.length});
                } else {
                    setShipPos({x: oldX, y: oldY});
                }
            } else {
                setShipPos({x: newX, y: newY});
                setShipOnBoard({row: newRow, col: newCol, direction:shipOnBoard.direction, length: shipOnBoard.length});
            }
            
            

            setIsDragging('');

            document.removeEventListener('mouseup', handleMouseup);
        }

        document.addEventListener('mouseup', handleMouseup);
    }

    

    useEffect(() => {
        if(isDragging !== '') {
            document.addEventListener('mousemove', handleMousemove);
        } else {
            document.removeEventListener('mousemove', handleMousemove);
        }

        return () => {
            document.removeEventListener('mousemove', handleMousemove);
        }

    }, [isDragging]);


    // start game

    const [hitStart, setHitStart] = useState(false);

    const [restart, setRestart] = useState(false);

    const [turn, setTurn] = useState('Enemy Board');

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

    const randomPlaceEnemyShips = () => {
        const newGrids = [...enemyGrids];
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

                        setEnemyShipsPosition(prev => [...prev, {
                            direction: direction,
                            shipSpace: shipSpace,
                            startRow: startRow,
                            startCol: startCol,
                        }]);
                      
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

                        setEnemyShipsPosition(prev => [...prev, {
                            direction: direction,
                            shipSpace: shipSpace,
                            startRow: startRow,
                            startCol: startCol,
                        }]);
                        
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

      
        setEnemyGrids(newGrids); 
    };


    const placeMyShips = () => {
        const newGrids = [...myGrids];
        Object.values(shipsInfo).forEach((shipInfo) => {
            const shipOnBoard = shipInfo[10];
            const startRow = shipOnBoard.row;
            const startCol = shipOnBoard.col;
            console.log(shipOnBoard.length, startRow, startCol);
            if(shipOnBoard.direction === 'horizontal') {
                for(let i = 0; i < shipOnBoard.length; i++) {
                    newGrids[startRow][startCol + i] = 'ship';
                }
            } else {
                for(let i = 0; i < shipOnBoard.length; i++) {
                    newGrids[startRow + i][startCol] = 'ship';
                }
            }
            setMyShipsPosition(prev => [...prev, {
                direction: shipOnBoard.direction,
                shipSpace: shipOnBoard.length,
                startRow,
                startCol
            }]);
        });
        setMyGrids(newGrids);
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
                setTimeout(() => setTurn("Enemy Board"), 500); 
                
            } else { 
                setMyThrew(false);
                setMyGrids(newGrids);
                setTimeout(() => setTurn("My Board"), 1000);
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
                    placeMyShips();
                    randomPlaceEnemyShips();
                } else {
                    const {latestMyGrid, latestEnemyGrid, latestMyPos, latestEnemyPos, latestMyShipsCon, latestEnemyShipsCon ,lastTime, lastThrew} = JSON.parse(getLastData(nameMode));
                    if(latestMyPos.length === 0 && latestEnemyPos.length === 0) {
                        placeMyShips();
                        randomPlaceEnemyShips();
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
                    setTimeout(() => throwBomb(throwRow, throwCol), 1000);
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
        <h1 className='mt-3 font-barrio text-2xl sm:text-3xl bg-yellow-800 w-fit px-3'>Normal Mode</h1>

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
                {!placed &&<MoveableShips shipsInfo={shipsInfo} handleMousedown={handleMousedown} isDragging={isDragging}/>}
                <GridBoard boardRef={boardRef} playerBoard={myGrids} playerWho={"My Board"} whosTurn={turn} path={path} shipsCon={myShipsCon}/>
                <GridBoard playerBoard={enemyGrids} playerWho={"Enemy Board"} whosTurn={turn} throwBomb={throwBomb} hitStart={hitStart} path={path} threw={myThrew} shipsCon={enemyShipsCon}/>
            </div>
        </div>
    </div>
  )
}

export default NormalGame;