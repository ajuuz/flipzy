import React, { useEffect, useRef, useState } from 'react'
import wallpaper from '/wallpaper7.gif'
import useSound from 'use-sound';
import investmentsAudio from '/audio/Investments.mp3'
import CompletionPage from '../CompletionPage';
import MemoryTile from '../Components/FlipCardComponent/MemoryTile';

const FlipCard = () => {

  const [array,setArray] = useState([]);
  const [select,setSelect] = useState(null)
  const [secondSelect,setSecondSelect] = useState(null)
  const [matchedValues,setMatchedValues] = useState({});
  const [status,setStatus] = useState(null)
  const [countDown,setCountDown] = useState(60);
  const [retry,setRetry] = useState(false)

  const [play] = useSound(investmentsAudio)
  const timerRef = useRef(null)
  const countDownRef = useRef(null)

  useEffect(()=>{
      const arr =[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8]
      let shuffled = [...arr]; // Create a copy to avoid mutating the original array
      for (let i = shuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Get a random index
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
      }
      setArray(shuffled);
      //test2

      countDownRef.current = setInterval(()=>{
        setCountDown((prev)=>{
          if(prev<=1){
            clearInterval(countDownRef.current);
            setStatus("failed")
            setMatchedValues({})
            setSelect(null)
            setSecondSelect(null)
            return 0;
          }
          return prev-1;
        })
      },1000)
      

      return ()=> clearInterval(countDownRef.current);
  },[retry])

  useEffect(() => {
    const playAudio = async () => {
      try {
        await play(); // Attempt autoplay
        console.log("Autoplay successful!");
      } catch (err) {
        console.warn("Autoplay blocked. Retrying in 3 seconds...", err);
        setTimeout(play, 3000); // Retry after 3 seconds
      }
    };

    playAudio();
  }, [play]);

  const handleSelect=(index)=>{

    if(matchedValues[array[index]]) return

    if(select===null){
      setSelect(index)
    }else{

      if(select===index){
        setSelect(null)
        return
      }
      setSecondSelect(index)

      if(array[select]===array[index]){

        setMatchedValues((prev)=>({...prev,[array[index]]:true}))
          matchedValues[array[index]] = true;
          setSelect(null)
          setSecondSelect(null)

      }
      else if(secondSelect!==null){
        clearTimeout(timerRef.current)
        setSelect(index)
        setSecondSelect(null)
      }
      else
      {
        timerRef.current=setTimeout(()=>{
          setSelect(null)
          setSecondSelect(null)
        },1000)
      }
    }
  }


  useEffect(()=>{
    let timer;
    if(Object.keys(matchedValues).length===8){

      clearInterval(countDownRef.current) //clearing the countDown if you won

      timer = setTimeout(()=>{
        setStatus("success")
        setMatchedValues({})
      },1000)

    }
  
    return ()=>clearTimeout(timer)
  },[matchedValues])


  return (
    <div style={
      {
        backgroundImage: `url(${wallpaper})`,
        backgroundSize:"contain",
        backgroundPosition:"-400px center",
        filter: "brightness(100%)",    // Optional filter adjustment
      }
    } 
      className='bg-red-950 flex justify-center h-screen items-center'>
      {status==="success" 
      ?<CompletionPage isSuccess={true} setStatus={setStatus} setCountDown={setCountDown} setRetry={setRetry}/>
      :status==="failed"
      ?<CompletionPage isSuccess={false} setStatus={setStatus} setCountDown={setCountDown} setRetry={setRetry}/>
      :
      <div>
        <div className='absolute h-14 w-14 rounded-[50%] overflow-hidden  flex justify-center items-end top-2 right-10 border-[4px] border-purple-900  text-white font-bold'>
        <div style={{height:`${(countDown/60)*100}%`}} className='absolute  w-full  bg-gradient-to-b from-purple-500  via-purple-800 to-purple-950  flex  justify-center text-xs'></div>
        </div>
        <div className='grid grid-cols-4 gap-x-5 gap-y-3'>
        {array.map((value,index)=>
          <MemoryTile handleSelect={handleSelect} value={value} index={index} select={select} secondSelect={secondSelect} matchedValues={matchedValues}/>
        )}
        </div>
      </div>
      }
    </div>
  )
}

export default FlipCard
