import { useState } from "react"

interface ToDoFormProps {
    addTask: (text:string) => void
}

export default function ToDoForm({addTask}: ToDoFormProps){
    const [tasks,setTasks] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (tasks) {
            addTask(tasks);
            setTasks('');
            alert('it works')
            // console.log("added to do:", tasks)
        }
       
    }
   
    return(
        <form className="max-w-md my-5" onSubmit={handleSubmit}>
            <div className="flex mt-10 space-x-10">
                <label >
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input className="block flex-1 py-1.5 pl-1 rounded-md border-0 bg-transparent" type="text" name="todo" id="todo" value={tasks} placeholder="add tasks" onChange={(e) => setTasks(e.target.value)} />
                    </div>
                </label>
                <button type="submit">Submit</button>
               
            </div>
           
        </form>
    )
}