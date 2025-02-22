"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Celebration } from "./Components/TicTacComponents/Celebration"
import { Failure } from "./Components/TicTacComponents/Failure"


const CompletionPage = ({isSuccess,setStatus,setCountDown,setRetry}) => {

  const handlePlayAgain=()=>{
    setCountDown(60)
    setStatus(null);
    setRetry((prev)=>!prev)
  }
  return (
    <div className=" bg-black h-screen grid">
    {isSuccess
     ?<Celebration/>
     :<Failure/>
    }
     <button onClick={handlePlayAgain} class="absolute bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-3 text-lg font-semibold text-white rounded-full transition duration-300 bg-gradient-to-r from-pink-500 to-red-500 shadow-lg hover:scale-110 hover:shadow-2xl">
        Play Again
        <span class="absolute inset-0 bg-white opacity-10 rounded-full scale-0 transition-transform duration-500"></span>
    </button>
    </div>
  )
}

export default CompletionPage

