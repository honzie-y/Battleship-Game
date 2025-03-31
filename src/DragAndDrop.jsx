import { useEffect, useRef, useState } from "react";
import dotLogo from './assets/dot-icon.png';
import checkLogo from './assets/check-icon.png';
import xLogo from './assets/x-mark.png';


const DragAndDrop = () => {
    
    const [isDragging, setIsDragging] = useState(false);
    const [draggingShip, setDraggingShip] = useState({});

    const airRef = useRef(null);
    const aCellRef = useRef(null);
    const [aPosition, setAPosition] = useState({x: 0, y: 0});
    const [aCellPos, setACellPos] = useState({x: 0, y: 0});
    const [aOnBoard, setAOnBoard] = useState({row: -1, col: -1});

    const battleRef = useRef(null);
    const bCellRef = useRef(null);
    const [bPosition, setBPosition] = useState({x: 0, y: 0});
    const [bCellPos, setBCellPos] = useState({x: 0, y: 0});
    const [bOnBoard, setBOnBoard] = useState({row: -1, col: -1});

    const cruiserRef = useRef(null);
    const cCellRef = useRef(null);
    const [cPosition, setCPosition] = useState({x: 0, y: 0});
    const [cCellPos, setCCellPos] = useState({x: 0, y: 0});
    const [cOnBoard, setCOnBoard] = useState({row: -1, col: -1});

    const submarineRef = useRef(null);
    const sCellRef = useRef(null);
    const [sPosition, setSPosition] = useState({x: 0, y: 0});
    const [sCellPos, setSCellPos] = useState({x: 0, y: 0});
    const [sOnBoard, setSOnBoard] = useState({row: -1, col: -1});

    const destroyerRef = useRef(null);
    const dCellRef = useRef(null);
    const [dPosition, setDPosition] = useState({x: 0, y: 0});
    const [dCellPos, setDCellPos] = useState({x: 0, y: 0});
    const [dOnBoard, setDOnBoard] = useState({row: -1, col: -1});


    const shipsSpaces = {
        "Aircraft Carrier": [5, "grid-cols-5", airRef, aPosition, setAPosition, aCellRef, aCellPos, aOnBoard, setAOnBoard],
        "Battleship": [4, "grid-cols-4", battleRef, bPosition, setBPosition, bCellRef, bCellPos, bOnBoard, setBOnBoard],
        "Cruiser": [3, "grid-cols-3", cruiserRef, cPosition, setCPosition, cCellRef, cCellPos, cOnBoard, setCOnBoard],
        "Submarine": [3, "grid-cols-3", submarineRef, sPosition, setSPosition, sCellRef, sCellPos, sOnBoard, setSOnBoard],
        "Detroyer": [2, "grid-cols-2", destroyerRef, dPosition, setDPosition, dCellRef, dCellPos, dOnBoard, setDOnBoard],
    };

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

    const [myGrids, setMyGrids] = useState(() => setBlankBoard());


    useEffect(() => {

        if(aCellRef.current && bCellRef.current && cCellRef.current && sCellRef.current && dCellRef.current) {
            const aRect = aCellRef.current.getBoundingClientRect();
            const bRect = bCellRef.current.getBoundingClientRect();
            const cRect = cCellRef.current.getBoundingClientRect();
            const sRect = sCellRef.current.getBoundingClientRect();
            const dRect = dCellRef.current.getBoundingClientRect();
            setACellPos({x: aRect.left, y: aRect.top});
            setBCellPos({x: bRect.left, y: bRect.top});
            setCCellPos({x: cRect.left, y: cRect.top});
            setSCellPos({x: sRect.left, y: sRect.top});
            setDCellPos({x: dRect.left, y: dRect.top});
        }
    });

    const handleDragStart = (e, shipLength ,shipRef, setShipPosition, setShipOnBoard) => {
        if(!shipRef.current) return;

        setShipOnBoard({row: -1, col: -1});
        setDraggingShip({shipLength, shipRef, setShipPosition, setShipOnBoard});
        setIsDragging(true);
    }

    const handleDropToBoard = (e, rowIndex, columnIndex) => {
        if(!isDragging) return;
        e.preventDefault();
        if((draggingShip.shipRef === airRef && columnIndex <= 5) || 
        (draggingShip.shipRef === battleRef && columnIndex <= 6) || 
        ((draggingShip.shipRef === cruiserRef || draggingShip.shipRef === submarineRef) && columnIndex <= 7) || 
        (draggingShip.shipRef === destroyerRef && columnIndex <= 8)) {
            draggingShip.setShipPosition({x: 0, y: 0});
            draggingShip.setShipOnBoard({row: rowIndex, col: columnIndex});
            e.target.appendChild(draggingShip.shipRef.current);
        }

        setIsDragging(false);
    }

    const handleDropback = (e, shipRef, shipPosChange) => {
        if(!isDragging) return;
        e.preventDefault();

        shipPosChange({
            x: 0,
            y: 0
        });

        e.target.appendChild(shipRef.current);
        setIsDragging(false);
    }


  return (
    <div className="flex flex-row gap-8">
        <div className="mt-6 bg-yellow-800/70 rounded-[3px] px-4 py-2">
            <div className="flex flex-wrap gap-3 sm:flex-col">
                {Object.entries(shipsSpaces).map(([shipName, shipSpace]) => {
                    return (
                        <div key={shipName} className="">
                            <h1>{shipName}</h1>
                            <div ref={shipSpace[5]} className="relative w-42 h-10" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDropback(e, shipSpace[2], shipSpace[4])}>
                                <div ref={shipSpace[2]}
                                style={{left:`${shipSpace[3].x}px`, top:`${shipSpace[3].y}px`}}
                                className={`grid w-max ${shipSpace[1]} absolute z-20`}
                                draggable onDragStart={(e) => handleDragStart(e, shipSpace[0] ,shipSpace[2], shipSpace[4], shipSpace[8])}>
                                    {Array.from({length: shipSpace[0]}).map((_, index) => {
                                        return (
                                            <div key={index} className="border-2 rounded-[4px] border-yellow-800 w-6.5 h-6.5 
                                            md:w-8 md:h-8 bg-gray-600">&nbsp;</div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        <div className={`w-max mt-6 h-max relative`}>
            {myGrids.map((row, rowIndex) => {
                        return (
                            <div className='grid grid-cols-10 cursor-pointer' key={rowIndex}>
                                {
                                    row.map((column, columnIndex) => {
                                        return (
                                            <div key={`${rowIndex}-${columnIndex}`}
                                            onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDropToBoard(e, rowIndex, columnIndex)}
                                            className={`bg-secondary w-6.5 h-6.5 md:w-8 md:h-8 border-2 border-primary 
                                            rounded-[4px] hover:bg-yellow-800 relative`}>
                                                {(myGrids[rowIndex][columnIndex] === 'ship' && <img src={dotLogo}></img> ) ||
                                                (myGrids[rowIndex][columnIndex] === 'hit' && <img src={checkLogo}></img>) ||
                                                (myGrids[rowIndex][columnIndex] === 'miss' && <img src={xLogo}></img>)}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                })}
        </div>
        <div>a: {aOnBoard.row} {aOnBoard.col} b: {bOnBoard.row} {bOnBoard.col}</div>
    </div>
  )
};

export default DragAndDrop;