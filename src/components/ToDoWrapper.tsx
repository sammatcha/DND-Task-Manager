import { useState } from "react";
import ToDoForm from "./ToDoForm";
import { TrashIcon } from "@heroicons/react/16/solid";

interface Task {
    text:string,
    id: number,
}

interface Stage {
    title: string,
    tasks: Task[];
}

export default function ToDoWrapper() {
    const [stages, setStages] = useState<Stage[]> ([
        {title:"Todo", tasks: []},
        {title:"In Progress", tasks: []},
        {title:"Completed", tasks: []},
    ])
   

    function addTask(text:string, stageTitle:string) {
           setStages((prevStages) => {
            //attach id to task
            const newTaskId = Date.now()
            //create newStages array by mapping previous stages
        
            const newStages =  prevStages.map((stage)=> {
                //add new task if stage title matches stageTitle
                if (stage.title === stageTitle) {
                    return {
                        ...stage, tasks: [...stage.tasks, {text, id:newTaskId}]
                    };
                }
                            
                return stage;
            });
            //return newStages array to update state
            return newStages;
        });
    
    }

    function deleteTask(id:number) {
       setStages((prevStages) => {
      const newStages = prevStages.map((stage) => {
        return {
        ...stage, tasks: stage.tasks.filter((task) => task.id !== id)
    };
      });
    //   console.log('stages after deleting task:', newStages)
      return newStages
  
    });
    }

    const handleOnDragStart = (e, taskId) => {
        e.dataTransfer.setData("taskId", taskId)
        // console.log("handleOnDragStart", (taskId))
    }
  
    const handleOnDrop = (e, stageTitle) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("taskId")
        // console.log("data", data)
        // console.log("dropped on stage:", stageTitle)

        setStages((prevStages)=> {
            let movedTask;
            const updatedStages = prevStages.map(stage => {
                const filteredTasks = stage.tasks.filter(task => {
                    if (task.id === Number(data)){
                        movedTask = task;
                        return false;
                    }
                    return true;
                });
                return {...stage, tasks:filteredTasks}
            });
            return updatedStages.map(stage=> {
                if(stage.title === stageTitle ){
                    return {...stage,tasks: [...stage.tasks, movedTask]};
                }
                return stage;
            })
        })
    }
    const handleOnDragOver = (e) => {
        e.preventDefault();
        // console.log("dragging over")
        e.dataTransfer.dropEffect = "move";
    }
    return(
        <div className="min-h-screen flex flex-col lg:mt-10 overflow-hidden ">
            
                <div className="flex flex-col justify-center items-center ">
                    <h1 className="text-xl lg:text-6xl text-neutral-700 ">Task Manager </h1>
                    <ToDoForm addTask ={(TaskName) => addTask(TaskName, "Todo") }/>
                </div>
      
           
                <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl h-full place-self-center w-full lg:pb-20 xl:pb-18">
                    {stages.map((stage, index) => (
                    <div className="border shadow-lg rounded-xl h-full w-full flex flex-col " key={index}>
            
                        <p className="flex text-white rounded-t-xl p-5 justify-center bg-lightMysticBlue text-lg lg:text-2xl"> {stage.title}</p>
                        <div
                        onDragOver={handleOnDragOver}
                        onDrop= {(e)=>handleOnDrop(e, stage.title)}
                        className="bg-lightStoneGrey overflow-auto drop-shadow-lg h-full flex-grow shadow-torchOrange shadow-inner py-2 px-3"
                        >
                        {/* Render Tasks */}
                        {stage.tasks.map ((task) => (
                            <div 
                            key={task.id}  
                            draggable = "true"
                            onDragStart={(e)=>handleOnDragStart(e,task.id)}
                            className="border border-runestoneSilver rounded-2xl w-full px-2 py-1 inline-flex justify-between "
                            >
                                <p className="text-lg text-neutral-800 lg:text-xl">
                                {task.text}
                                </p>
                                
                            <div onClick={()=> deleteTask(task.id)}>
                                <TrashIcon className="w-6"/>
                            </div>
                        </div>
                    
                        ))}

                    </div>
                
                </div>
            ))}
            </div>
        </div>
    )
} 

