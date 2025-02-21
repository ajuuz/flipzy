"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const Confetti = ({ isVisible }) => {
  const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]
  const shapes = ["square", "circle"]

  const confettiPieces = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    size: Math.random() * 10 + 5,
  }))

  return (
    <>
      {isVisible &&
        confettiPieces.map((piece) => (
          <motion.div
            key={piece.id}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
              borderRadius: piece.shape === "circle" ? "50%" : "0%",
            }}
            initial={{ scale: 0 }}
            animate={{
              scale: [0, 1, 1, 0.5, 0],
              x: Math.random() * window.innerWidth - window.innerWidth / 2,
              y: Math.random() * window.innerHeight - window.innerHeight / 2,
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              ease: "easeOut",
              times: [0, 0.2, 0.5, 0.8, 1],
            }}
          />
        ))}
    </>
  )
}

const Celebration = () => {

  return (
    <div className="relative w-screen  flex items-center justify-center overflow-hidden">
      <Confetti isVisible />
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="text-6xl font-bold text-white text-center"
        >
          Congratulations!
          <br />
          You Won!
        </motion.div>
    </div>
  )
}


const FallingPiece = ({ delay }) => (
  <motion.div
    className="absolute w-8 h-8 bg-red-500 rounded-full"
    initial={{ y: -100, x: Math.random() * window.innerWidth }}
    animate={{
      y: window.innerHeight + 100,
      rotate: 360,
      scale: [1, 1.2, 0.8, 1],
    }}
    transition={{
      duration: 2,
      delay: delay,
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: 3,
    }}
  />
)

const LoseAnimation = () => {

  return (
    <div className="relative w-screen flex items-center justify-center overflow-hidden">
        <>
          {[...Array(10)].map((_, index) => (
            <FallingPiece key={index} delay={index * 0.2} />
          ))}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="text-center"
          >
            <motion.h1
              className="text-6xl font-bold text-red-500 mb-4"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Game Over
            </motion.h1>
            <motion.p
              className="text-3xl text-white"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Better luck next time!
            </motion.p>
          </motion.div>
        </>
    </div>
  )
}


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
     :<LoseAnimation/>
    }
     <button onClick={handlePlayAgain} class="absolute bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-3 text-lg font-semibold text-white rounded-full transition duration-300 bg-gradient-to-r from-pink-500 to-red-500 shadow-lg hover:scale-110 hover:shadow-2xl">
        Play Again
        <span class="absolute inset-0 bg-white opacity-10 rounded-full scale-0 transition-transform duration-500"></span>
    </button>
    </div>
  )
}

export default CompletionPage

