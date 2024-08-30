import { useState } from "react";
import ToDoForm from "./ToDoForm";

interface Task {
    text:string,
}

interface Stage {
    title: string,
    tasks: Task[];
}
export default function ToDoWrapper() {
    const [stages, setStages] = useState<Stage[]> ([
        {title:"todo", tasks: []},
        {title:"in progress", tasks: []},
        {title:"completed", tasks: []},
    ])
    function addTask(text:string, stageTitle:string) {
           setStages((prevStages) => {
            //create newStages array by mapping previous stages
            const newStages =  prevStages.map((stage)=> {
                //add new task if stage title matches stageTitle
                if (stage.title === stageTitle) {
                    return {
                        ...stage, tasks: [...stage.tasks, {text}]
                    };
                }
                
                console.log("addTask", text)
                
                return stage;
            });
            console.log("updated stages after adding tasks:", newStages);
            //return newStages array to update state
            return newStages;
        });
    
    }

    // const deleteTodo = (id:number) => {
    //     setTodos(todos.filter((todo) => todo.id != id ));
    
    return(
        <div className="flex flex-col justify-center items-center max-w-screen-2xl">
            <h1 className="text-3xl mt-10">to do list</h1>
            <ToDoForm addTask ={(TaskName)=> addTask(TaskName, "todo")}/>
        <div className="flex space-x-10 w-full ml-32">
            {stages.map((stage, index) => (
                <div className="border min-h-[300px] w-full shadow-lg" key={index}>
                    <p className="flex justify-center mt-4"> {stage.title}</p>
                   
                {stage.tasks.map ((task, index)=> (
                    <div key={index}>{task.text}</div>
                ))}
                </div>
            ))}
        </div>
        </div>
    )
}