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

const CelebrationAnimation = () => {

  useEffect(() => {
    // Simulate winning the game after 2 seconds
    const timer = setTimeout(() => {
      setGameWon(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative h-screen w-screen bg-gray-900 flex items-center justify-center overflow-hidden">
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

export default CelebrationAnimation

