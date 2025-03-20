import { useNavigate } from "react-router-dom";


const Alert = ({text, leftButton, rightButton, handleRight, handleLeft}) => {
  

  return (
    <div className="fixed flex flex-col top-1/2 left-1/2 z-100 bg-yellow-800/95 w-80 h-40 sm:w-100 sm:h-50 -translate-1/2 items-center justify-center border-4 rounded-2xl">
      <h1 className="text-3xl sm:text-4xl">{text}</h1>
      <div className="absolute flex w-full px-7 justify-between items-center bottom-1 text-[15px] sm:text-xl">
        <button className="block border-2 px-2 rounded-xl cursor-pointer hover:border-amber-600" onClick={handleLeft}>{leftButton}</button>
        <button className="block border-2 px-2 rounded-xl cursor-pointer hover:border-amber-600" onClick={handleRight}>{rightButton}</button>
      </div>
    </div>
  )
}

export default Alert;