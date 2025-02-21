import React, { useEffect, useRef, useState } from 'react'
import MemoryTile from './MemoryTile';
import wallpaper from '/wallpaper.gif'
import useSound from 'use-sound';
import investmentsAudio from '/audio/Investments.mp3'
import CompletionPage from './CompletionPage';

const App = () => {


  

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
      },1000)

      setMatchedValues({})
    }
  
    return ()=>clearTimeout(timer)
  },[matchedValues])


  return (
    <div style={{backgroundImage:`url(${wallpaper})`,filter:"brightness(100%)"}} className='bg-red-950 flex justify-center h-screen items-center'>
      {status==="success" 
      ?<CompletionPage isSuccess={true} setStatus={setStatus} setCountDown={setCountDown} setRetry={setRetry}/>
      :status==="failed"
      ?<CompletionPage isSuccess={false} setStatus={setStatus} setCountDown={setCountDown} setRetry={setRetry}/>
      :
      <div>
        <div className='absolute py-5 px-6 rounded-[50%] border  top-2 right-10 bg-black text-white font-bold'>
          {countDown}
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

export default App
