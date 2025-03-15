const GridBoard = ({playerBoard, playerWho}) => {
  return (
    <div className='w-fit mt-6'>
        <h1 className='text-xl sm:text-2xl'>{playerWho}</h1>
        {playerBoard.map((row, rowIndex) => {
            return (
                <div className='grid grid-cols-9 cursor-pointer' key={rowIndex}>
                    {
                        row.map((column, columnIndex) => {
                            return (
                                <div key={columnIndex} className='bg-secondary 
                                w-6.5 h-6.5 md:w-8 md:h-8 border-2 border-primary 
                                rounded-[4px]'>&nbsp;</div>
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