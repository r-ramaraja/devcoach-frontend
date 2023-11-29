import React, {useEffect, useState, useRef} from "react";
import { getPythonInterpretor } from "../utils/pyodide";
export default function Terminal(props) {
  const [pythonRunner, setPythonRunner] = useState(null);
  const [output, setOutput] = useState([]);
  const [takingPkgName, setTakingPkgName] = useState(false);
  const [pkgName, setPkgName] = useState("");
  const bottomOutputRef = useRef(null);

  useEffect(() => {
    const instance = getPythonInterpretor();
    console.log(instance)
    instance.ready.then(() => {
      setPythonRunner(instance);
    });
  }, []);

  useEffect(()=>{
    bottomOutputRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  const handleInstall = async () => {
    if (pythonRunner) {
      try {
        if (pkgName.trim() === "") {
          setOutput([...output, {text: "Error installing Python Package: Package name cannot be empty", date: new Date()}]);
          return;
        }
        var message = await pythonRunner.installPackage(pkgName.trim());
        console.log(message)
        if (message) {
          setOutput([...output, {text: "Failed to install Python Package: Pip error", date: new Date()}]);
        }
        else {
          //Need a way to check if the package is already installed
          setOutput([...output, {text: "Successfully installed Python Package: " + pkgName.trim(), date: new Date()}]);
        }
        setPkgName("");
        setTakingPkgName(false);
      }
      catch (e){
        setOutput([...output, {text: "Error installing Python Package: " + e.message, date: new Date()}]);
      }   
    } else {
      console.error("Python interpreter not ready");
    }
  }

  const handleRun = () => {
    if (pythonRunner) {
      try {
        pythonRunner.setOutput((text) => {
          console.log(text)
        });
        //setOutput([...output, outPutLineRef.current]);
        const result = pythonRunner.run(props.code);
        setOutput([...output, {text: result, date: new Date()}]);
      }
      catch (e){
        console.log(e);
        setOutput([...output, {text: "Error running Python code: " + e.message, date: new Date()}]);
        console.error("Error running Python code:", e);
      }   
    } else {
      console.error("Python interpreter not ready");
    }
  };
  
  return (
    <div className="flex flex-col w-full h-full items-start justify-start p-3 gap-2">
      <div className="flex flex-row gap-1">
        <button
          onClick={handleRun}
          className="
              button 
              py-1 
              px-2 
              bg-blue-500
              text-white 
              rounded-md
              hover:bg-blue-700 
              disabled:bg-gray-500 
              disabled:cursor-not-allowed 
              focus:outline-none 
              focus:bg-blue-700 
              transition-colors 
              duration-300 
          "
          disabled={!pythonRunner}
        >
          Run
        </button>
        <button 
          onClick={()=>{setOutput([])}} 
          className="
            button 
            px-2 
            border-2
            border-blue-500
            bg-transparent
              
            rounded-md
            hover:border-blue-700 
            disabled:bg-gray-500 
            disabled:cursor-not-allowed 
            focus:outline-none 
            focus:border-blue-700 
            transition-colors 
            duration-300
          "
        >
            Clear
        </button>
        <button 
          className="
            button 
            px-2 
            border-2
            border-blue-500
            bg-transparent
                
            rounded-md
            hover:border-blue-700 
            disabled:bg-gray-500 
            disabled:cursor-not-allowed 
            focus:outline-none 
            focus:border-blue-700 
            transition-colors 
            duration-300
          "
          onClick={()=> {
            console.log("install");
            setTakingPkgName(!takingPkgName);
          }}
          disabled={!pythonRunner}
        >
          Install
        </button>
      </div>
      {takingPkgName && 
        <form onSubmit={(e) => {e.preventDefault();handleInstall() }}>
          <input type="text" className=" border-blue-500 border-2" value={pkgName} onChange={(e)=> setPkgName(e.target.value)}></input>
          <button type="submit">Submit</button>
        </form>
      }
      <div className='flex flex-col overflow-auto w-full max-w-full h-full max-h-full'>
          {output.map((line, index) => (
            <div
              key={index}
              ref={output.length - 1 === index ? bottomOutputRef : null}
              className=" text-sm border-b-2 border-blue-300 w-full px-2 py-1"
                
            >
              <pre style={{whiteSpace: "pre-wrap", overflowWrap: "anywhere"}}>{line.text}</pre>
            </div>
          ))}
      </div>
        
    </div>
  )
}