import { useRef } from "react";


const Ships = () => {

    const shipsSpaces = {
        "Aircraft Carrier": [5, "grid-cols-5"],
        "Battleship": [4, "grid-cols-4"],
        "Cruiser": [3, "grid-cols-3"],
        "Submarine": [3, "grid-cols-3"],
        "Detroyer": [2, "grid-cols-2"],
    };


  return (
    <div className="mt-6 bg-yellow-800/70 rounded-[3px] px-4 py-2">
        <div className="flex flex-wrap gap-3 sm:flex-col ">
            {Object.entries(shipsSpaces).map(([shipName, shipSpace]) => {
                return (
                    <div key={shipName}>
                        <h1>{shipName}</h1>
                        <div className={`grid w-fit ${shipSpace[1]}`}>
                            {Array.from({length: shipSpace[0]}).map((_, index) => {
                                return (
                                    <div key={index} className="border-2 rounded-[4px] border-yellow-800 w-6.5 h-6.5 
                                    md:w-8 md:h-8 bg-gray-600">&nbsp;</div>
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

export default Ships;