import React, { useState } from 'react'
import FlipCard from './Games/FlipCard'
import TicTac from './Games/TicTac'
const App = () => {
  const [selectedGame,setSelectedGame] = useState(null)
  return (
    <div>
      {
        selectedGame==="FlipCard"
        ?<FlipCard/>
        :selectedGame==="TicTac"
        ?<TicTac/>
        :<div className='flex items-center justify-center h-screen'>
          <div className='flex gap-3'>
            <div onClick={()=>setSelectedGame("TicTac")} className="div border-4 hover:bg-black hover:text-white transition-all duration-500 h-40 w-40 flex justify-center items-center rounded-xl font-mono text-2xl font-bold">Tic Tac</div>
            <div onClick={()=>setSelectedGame("FlipCard")} className="div border-4 hover:bg-black hover:text-white transition-all duration-500 h-40 w-40 flex justify-center items-center rounded-xl font-mono text-2xl font-bold">Flip Card</div>
          </div>
        </div>
      }
    </div>
  )
}

export default App
