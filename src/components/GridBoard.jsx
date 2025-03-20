import dotLogo from '../assets/dot-icon.png';
import checkLogo from '../assets/check-icon.png';
import xLogo from '../assets/x-mark.png';

const GridBoard = ({playerBoard, playerWho, whosTurn, throwBomb, hitStart, path, threw, shipsCon}) => {

  return (
    <div className={`${hitStart && !threw ? '' : 'pointer-events-none'} ${whosTurn === playerWho && path === '/game/normal'  ? "hidden" : ""} w-fit mt-6`}>
        <h1 className='text-xl sm:text-2xl'>{playerWho}</h1>
        {playerBoard.map((row, rowIndex) => {
            return (
                <div className='grid grid-cols-10 cursor-pointer' key={rowIndex}>
                    {
                        row.map((column, columnIndex) => {
                            return (
                                <div key={`${rowIndex}-${columnIndex}`} 
                                className={`${shipsCon[rowIndex][columnIndex] === true ? 'bg-yellow-800' : 'bg-secondary'} w-6.5 h-6.5 md:w-8 md:h-8 border-2 border-primary 
                                rounded-[4px] hover:bg-yellow-800`} onClick={() => throwBomb(rowIndex, columnIndex)}>
                                    {(playerBoard[rowIndex][columnIndex] === 'ship' && playerWho === 'My Board' && 
                                    <img src={dotLogo}></img> ) ||
                                    (playerBoard[rowIndex][columnIndex] === 'hit' && <img src={checkLogo}></img>) ||
                                    (playerBoard[rowIndex][columnIndex] === 'miss' && <img src={xLogo}></img>)}
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