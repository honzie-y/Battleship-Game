import React, { useEffect, useRef, useState } from 'react'

const MoveOnBoard = () => {

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

    const testRef = useRef(null);
    const [dragOffset, setDragOffset] = useState({x: 0, y: 0});
    const [testPos, setTestPos] = useState({x: 60, y: 100});
    const [isDragging, setIsDragging] = useState(false);
    const boardRef = useRef(null);
    const [boardCo, setBoardCo] = useState({left: 0, right: 0, top: 0, bottom: 0});
    const [testCo, setTestCo] = useState({left: 0, right: 0, top: 0, bottom: 0});

    useEffect(() => {
        if(boardRef.current) {
            const boardRect = boardRef.current.getBoundingClientRect();

            setBoardCo({left: boardRect.left, right: boardRect.right, 
                top: boardRect.top, bottom: boardRect.bottom});
        }

        if(testRef.current) {
            const testRect = testRef.current.getBoundingClientRect();

            setTestCo({left: testRect.left, right: testRect.right, 
                top: testRect.top, bottom: testRect.bottom});
        }

    });

    const handleMousedown = (e) => {
        const test = testRef.current;
        if(!test) return;

        const rect = test.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });

        setIsDragging(true);
    };


    const handleMousemove = (e) => {
        if(!isDragging) return;

        e.preventDefault();

        let newX = e.clientX - dragOffset.x;
        let newY = e.clientY - dragOffset.y;

        newX = Math.max(boardCo.left, newX);
        newX = Math.min(boardCo.right - (testCo.right - testCo.left), newX);

        newY = Math.max(boardCo.top, newY);
        newY = Math.min(boardCo.bottom - (testCo.bottom - testCo.top), newY);

        setTestPos({
            x: newX, y: newY
        });    

        const handleMouseup = (e) => {
            e.preventDefault();
            let fixedX = Math.floor((newX - boardCo.left) / 32) * 32 + boardCo.left;
            let fixedY = Math.floor((newY - boardCo.top) / 32) * 32 + boardCo.top;
    
            setTestPos({x: fixedX, y: fixedY});
    
            setIsDragging(false);

            document.removeEventListener('mouseup', handleMouseup);
        }

        document.addEventListener('mouseup', handleMouseup);
    }


    useEffect(() => {

        if(isDragging) {
            document.addEventListener('mousemove', handleMousemove);
        } else {
            document.removeEventListener('mousemove', handleMousemove);
        }

        return () => {
            document.removeEventListener('mousemove', handleMousemove);
        }


    }, [isDragging]);



  return (
    <div>
        <div ref={testRef} style={{left: `${testPos.x}px`, top: `${testPos.y}px`}} 
        onMouseDown={(e) => handleMousedown(e)}
        className='absolute w-[64px] h-[32px] text-center text-xl bg-yellow-800 cursor-grab rounded-[4px] border-2'></div>
        <div ref={boardRef} className={`w-max mt-6 h-max`}>
            {myGrids.map((row, rowIndex) => {
                        return (
                            <div className='grid grid-cols-10 cursor-pointer' key={rowIndex}>
                                {
                                    row.map((column, columnIndex) => {
                                        return (
                                            <div key={`${rowIndex}-${columnIndex}`}
                                            className={`bg-secondary w-6.5 h-6.5 md:w-8 md:h-8 border-2 border-primary 
                                            rounded-[4px] hover:bg-yellow-800`}>
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
        {boardCo.left} {boardCo.right}
    </div>
  )
};

export default MoveOnBoard;