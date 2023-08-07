import { ChangeEvent, useState, useEffect } from 'react'
import './App.css'

function App() {

  const [wpmSpeed, setWpmSpeed] = useState<number>();
  const [task, setTask] = useState<string>("")
  const [score, setScore] = useState<number>();
  const [grade, setGrade] = useState<string>("")

  useEffect(() => {
    if (wpmSpeed) {
      const score_temp: number = 50 + (10 * (wpmSpeed - 40) / 16.7)
      // console.log(score_temp, wpmSpeed);
      setScore(() => {
          if (score_temp > 100) {
            return 100;
          } else {
            return round(score_temp);
          }
        }
      )
    }

    if (score) {
      setGrade(() => {
        if (score > 65) {
          return "A"
        } else if (score >= 60) {
          return "B+"
        } else if (score >= 55) {
          return "B"
        } else if (score >= 50) {
          return "C+"
        } else if (score >= 45) {
          return "C"
        } else if (score >= 40) {
          return "D+"
        } else if (score >= 35) {
          return "D"
        } else {
          return "F"
        }
      })
    }

  })


  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "task") {
      setTask(event.target.value)
    }
  }

  const setSpeed = () => {
    const trimmedTask = task.trim();
    if (trimmedTask !== "" && parseFloat(task) > 0) {
      setWpmSpeed(parseFloat(task));
    } 
  }

  const round = (value: number): number => {
    return Math.round(100 * value) / 100; // <----------
  };



  return (
    <div className="flex items-center justify-center h-screen bg-yellow-300">
      <div className="text-white flex flex-col items-center w-4/5 md:w-[45rem] min-h-[30rem] bg-yellow-800 p-5 rounded-lg gap-3">
        <h1 className="text-6xl">WPM Grading</h1>
        <p className="text-4xl">Let's evaluate your typing speed.</p>
        <div className="flex w-48">

          <input 
            type="text" 
            name="task" 
            value={task} 
            onChange={handleChange} 
            placeholder="Enter a new WPM" 
            className="text-2xl flex-1 rounded-l-lg p-1 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white w-5/6" 
          />

          <button 
            onClick={setSpeed} 
            className="text-2xl px-6 rounded-r-lg bg-blue-500 text-white font-bold p-1 uppercase border-blue-500 border-t border-b border-r hover:bg-blue-600"
          >
            Cal
          </button>

        </div>
        <div className="flex w-full h-[17rem] flex-col justify-center items-center gap-2 text-black">
          {
            wpmSpeed ? (
              <>
                <h4 className="text-5xl text-red-200 bg-red-900 p-1 rounded-lg max-w-max">Grade: {grade}</h4>  
                <h1 className="text-3xl text-red-200 bg-red-900 mt-10 p-1 rounded-lg max-w-max">Your Score is <span className="text-4xl">{score}/100 </span></h1>
              </>    
            ) : (
              <p className="text-2xl text-red-200 bg-red-900 p-1 rounded-lg max-w-max">Put your WPM Please</p>
            )
          }
          
                      
        </div>
        

      </div>
    </div>
  )
}

export default App
