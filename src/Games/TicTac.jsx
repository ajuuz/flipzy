import React, { useEffect, useState } from 'react'
import { Celebration } from '../Components/TicTacComponents/Celebration';

const TicTac = () => {
    const [matrix, setMatrix] = useState([
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ]);
    const [player1Array,setPlayer1Array] = useState([])
    const [player2Array,setPlayer2Array] = useState([])
    const [turn,setTurn] = useState(1)
    const [winner,setWinner] = useState(null)

    

    const handleClick=(value)=>{

        if(matrix[value[0]][value[1]]) return;
        if(turn===1){
            setPlayer1Array((prev)=>([...prev,value]))
            setMatrix((prev)=>{
                const newMatrix = [...prev];
                newMatrix[value[0]][value[1]] = "X"
                return newMatrix;
            })
        }else{
            setPlayer2Array((prev)=>([...prev,value]))
            setMatrix((prev)=>{
                const newMatrix = [...prev];
                newMatrix[value[0]][value[1]] = "O"
                return newMatrix;
            })
        }
        setTurn(prev=>prev===1?2:1)
    }

    useEffect(()=>{
        if(player1Array.length>2){
           
            for(let i=0;i<player1Array.length;i++){
                const slopeCount={}
                const [x1,y1] = player1Array[i];
                for(let j=i+1;j<player1Array.length;j++){
                    const [x2,y2] = player1Array[j];
                    const slope = (y2-y1)/(x2-x1);
                    slopeCount[slope] ? slopeCount[slope]++ : slopeCount[slope] = 1;
                }
                
                for(let x in slopeCount){
                    if(slopeCount[x]>=2) setWinner("player 1")
                }
            }

            for(let i=0;i<player2Array.length;i++){
                const slopeCount={}
                const [x1,y1] = player2Array[i];
                for(let j=i+1;j<player2Array.length;j++){
                    const [x2,y2] = player2Array[j];
                    const slope = (y2-y1)/(x2-x1);
                    slopeCount[slope] ? slopeCount[slope]++ : slopeCount[slope] = 1;
                }
                
                for(let x in slopeCount){
                    if(slopeCount[x]>=2) setWinner("player 2")
                }
            }

            if(player1Array.length+player2Array.length===9){
                console.log("both lose")
            }
        }
    },[player1Array,player2Array])


    const handlePlayAgain=()=>{
        setWinner(null);
        setMatrix([
            [null, null, null],
            [null, null, null],
            [null, null, null],
          ])
          setPlayer1Array([])
          setPlayer2Array([])
    }

  
  return (
    <div className='flex justify-center h-screen items-center'>
     {winner 
      ?
        <div className=" bg-black h-screen grid">
          <Celebration winner={winner}/>
          <button onClick={handlePlayAgain} class="absolute bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-3 text-lg font-semibold text-white rounded-full transition duration-300 bg-gradient-to-r from-pink-500 to-red-500 shadow-lg hover:scale-110 hover:shadow-2xl">
                Play Again
            <span class="absolute inset-0 bg-white opacity-10 rounded-full scale-0 transition-transform duration-500"></span>
        </button>
      </div>
      :
      <div className=' grid grid-cols-3 '>
        {matrix.map((_,i)=>
        <div  className={` grid `}>
            {matrix[i].map((_,j)=><div onClick={()=>handleClick([i,j])}
             className={
                `${i === 0 ? "border-l-0": i===2 ?"border-r-0": ""} 
                ${j === 0 ? "border-t-0" :j===2?"border-b-0":""}  
             border-4  h-40 w-40 flex items-center justify-center text-3xl font-bold`}>{matrix[i][j]}</div>)}
        </div>)}
      </div>
    }
    </div>
  )
}

export default TicTac
