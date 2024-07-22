import { useState , useCallback , useEffect , useRef} from 'react'


function App() {
  const [length, setLength] = useState(7);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const[charAllowed, setCharAllowed] = useState(false);
  const[password,setPassword] = useState('')

const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed ) str += "0123456789"
    if(charAllowed ) str += "!@#$%^&*()_+[]{}\|"

    for (let index = 0; index < length; index++) {
      let char = Math.floor(Math.random()* str.length+1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)
  },[numberAllowed,charAllowed,length,setPassword])

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,79);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center my-3'> Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
         />
         <button 
         onClick={copyPassword}
         className='outline-none bg-blue-700 text-white px-3 py-1 shrink-00'
         >Copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1 m-2'>
          <input 
          type="range" 
          min={6} 
          max={80}
          value={length}
          className='cursor-pointer' 
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label> Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1 m-2'>
          
          <input 
          type="checkbox" 
           defaultChecked={numberAllowed}
           id="numberInput" 
           onChange={() =>{
            setNumberAllowed((prev)=>!prev);
           }}/>
           <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
           type="checkbox" 
          defaultChecked={charAllowed}
           id="characterInput" 
           onChange={() =>{setCharAllowed((prev)=>!prev);
           }}/>
           <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  
  )
}

export default App
