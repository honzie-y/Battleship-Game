import { useRef } from "react";


const StaticShips = () => {

    const shipsInfo = {
        "Aircraft Carrier": [5, "grid-cols-5", "bg-cyan-900"],
        "Battleship": [4, "grid-cols-4", "bg-emerald-900"],
        "Cruiser": [3, "grid-cols-3", "bg-lime-900"],
        "Submarine": [3, "grid-cols-3", "bg-violet-900"],
        "Detroyer": [2, "grid-cols-2", "bg-gray-600"],
    };


  return (
    <div className="mt-6 bg-yellow-800/70 rounded-[3px] px-4 py-2">
        <div className="flex flex-wrap gap-3 sm:flex-col ">
            {Object.entries(shipsInfo).map(([shipName, shipSpace]) => {
                return (
                    <div key={shipName}>
                        <h1>{shipName}</h1>
                        <div className={`grid w-fit ${shipSpace[1]}`}>
                            {Array.from({length: shipSpace[0]}).map((_, index) => {
                                return (
                                    <div key={index} className={`border-2 rounded-[4px] border-[#342f2f] w-6.5 h-6.5 
                                        md:w-8 md:h-8 ${shipSpace[2]}`}>&nbsp;</div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
};

export default StaticShips;