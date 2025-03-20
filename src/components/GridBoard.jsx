const GridBoard = ({playerBoard, playerWho, whosTurn, throwBomb, hitStart, path, threw}) => {
  return (
    <div className={`${hitStart && !threw ? '' : 'pointer-events-none'} ${whosTurn === playerWho && path === '/game/normal'  ? "hidden" : ""} w-fit mt-6`}>
        <h1 className='text-xl sm:text-2xl'>{playerWho}</h1>
        {playerBoard.map((row, rowIndex) => {
            return (
                <div className='grid grid-cols-9 cursor-pointer' key={rowIndex}>
                    {
                        row.map((column, columnIndex) => {
                            return (
                                <div key={`${rowIndex}-${columnIndex}`} 
                                className='bg-secondary w-6.5 h-6.5 md:w-8 md:h-8 border-2 border-primary 
                                rounded-[4px] hover:bg-yellow-800' onClick={() => throwBomb(rowIndex, columnIndex)}>
                                    {(playerBoard[rowIndex][columnIndex] === 'ship' && playerWho === 'My Board' && 
                                    <img src="/src/assets/dot-icon.png"></img> ) ||
                                    (playerBoard[rowIndex][columnIndex] === 'hit' && <img src="/src/assets/check-icon.png"></img>) ||
                                    (playerBoard[rowIndex][columnIndex] === 'miss' && <img src="/src/assets/x-mark.png"></img>)}
                                </div>
                            )
                        })
                    }
                </div>
            )
        })}
    </div>
  )
};

export default GridBoard;