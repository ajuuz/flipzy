import React, { useState } from "react";
import { motion } from "framer-motion";

import one from '/1.jpg'
import two from '/2.png'
import three from '/3.png'
import four from '/4.png'
import five from '/5.png'
import six from '/6.png'
import seven from '/7.jpg'
import eight from '/8.jpg'
import backSide from '/backSide32.gif'


const MemoryTile = ({handleSelect,value,index,select,secondSelect,matchedValues}) => {



  const images={
    1:one,
    2:two,
    3:three,
    4:four,
    5:five,
    6:six,
    7:seven,
    8:eight
  }

  return (
    <motion.div
      onClick={()=>handleSelect(index)}
      style={{
        perspective: "1000px", // Creates a 3D effect
        width: "115px",
        height: "155px",
      }}
    >
      <motion.div
        animate={{
          rotateY: [select,secondSelect].includes(index) || matchedValues[value]?  180 : 0, // Rotate on the Y-axis
        }}
        transition={{
          duration: 0.6, // Animation duration
          ease: "easeInOut",
        }}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d", // Required for 3D transforms
          cursor: "pointer",
        }}
      >
        {/* Front of the tile */}
        <div
          style={{
            position: "absolute",
            backgroundImage:`url(${backSide})`,
            backgroundPosition:"center",
            backgroundSize:"cover",
            filter:"brightness(100%)",
            width: "100%",
            height: "100%",
            backgroundColor: "lightblue",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "15px",
          }}
        >
        </div>

        {/* Back of the tile */}
        <div
          style={{
            position: "absolute",
            backfaceVisibility: "hidden", // Hide front when back is visible
            backgroundImage:`url(${images[value]})`,
            backgroundPosition:"center",
            backgroundSize:"cover",
            filter:"brightness(100%)",
            width: "100%",
            height: "100%",
            backgroundColor: "lightcoral",
            transform: "rotateY(180deg)", // Flip the back side
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
          }}
        >
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MemoryTile;
