import {  useState, useCallback, useEffect, useRef } from 'react'
// import React, { useCallback } from 'react';

import './App.css'

function App() {
  document.body.style.background="black";

  const [length, setLength] =useState(8);
  let [number, numberAllowed]= useState(false);
  let [charc,charcAllowed]=useState(false);
  const [password, setPassword]= useState("45");

  const passwordGenerator= useCallback(()=>{ 
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    if (number) str += "0123456789";
    if (charc) str += "!@#$%^&*()_+{}[]:";
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()* str.length+1)
      pass+=str.charAt(char);
    }
    setPassword(pass);
    // console.log(charc);
  },[length,number,charc,setPassword])

  useEffect(()=>{
    passwordGenerator()
  },[length,number,charc,passwordGenerator])


  const passwordRef = useRef(null);

  const copyToClipboard = () => {
    // Select the input field's text
    passwordRef.current.select();
    passwordRef.current.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the input field
    document.execCommand('copy');

    // Optionally, you can alert the user that the text has been copied
    // alert('Copied to clipboard: ' + passwordRef.current.value);
  };


  return (
    
    <>
      <h1 className='text-white justify-center flex'>Password Generator</h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3"
              placeholder="Password"
              readOnly
              ref={passwordRef}
          />
          <button
          onClick={copyToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
              <input type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e)=> setLength(e.target.value )}
              />
              <label> Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input 
              type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={()=>{
                numberAllowed((prev)=>!prev);
                // This method can also be used 🥂 beware of 🐞
                // numberAllowed(()=>{
                //   if(number==true){
                //     number=false;
                //   }
                //   else{
                //     number=true;
                //   }
                // })
                console.log(number)
              }}
              />
              <label> Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input 
              type="checkbox"
              defaultChecked={charcAllowed}
              id='charcterInput'
              onChange={()=>{
                charcAllowed((prev)=>!prev);
                console.log(charc)
              }}
              />
              <label>Character</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <button onClick={passwordGenerator}> Generate</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
