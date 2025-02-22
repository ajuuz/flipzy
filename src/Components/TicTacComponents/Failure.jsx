"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

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

export const Failure = () => {

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