import { useRef } from "react";


const MoveableShips = ({shipsInfo, handleMousedown, isDragging}) => {

  return (
    <>
        {Object.entries(shipsInfo).map(([shipName, shipInfo]) => {
            return (
                    <div key={shipName} ref={shipInfo[3]} onMouseDown={(e) => handleMousedown(e, shipName)} style={{left: `${shipInfo[4].x}px`, top: `${shipInfo[4].y}px`}} className={`grid w-max ${shipInfo[1]} absolute cursor-grab`}>
                        {Array.from({length: shipInfo[0]}).map((_, index) => {
                            return (
                                <div key={index} className={`border-2 rounded-[4px] border-[#342f2f] w-6.5 h-6.5 
                                    md:w-8 md:h-8 ${shipInfo[2]} ${isDragging === shipName ? 'z-20' : ''}`}></div>
                            )
                        })}
                    </div>
            )
        })}
    </>
  )
};

export default MoveableShips;