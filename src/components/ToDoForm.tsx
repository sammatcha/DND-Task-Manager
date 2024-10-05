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
            // alert('it works')
            // console.log("added to do:", tasks)
        }
       
    }

   
    return(
        <form className="my-10" onSubmit={handleSubmit}>
            <div className="flex mt-10 space-x-8">
                    <div className="flex shadow-sm ring-1 ring-inset ring-gray-300  sm:max-w-md">
                        <input className="block flex-1 py-1.5 pl-1 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:border-blue-500" type="text" name="todo" id="todo" value={tasks} placeholder="add task" onChange={(e) => setTasks(e.target.value)} />
                    </div>
              
                <button type="submit" className="border rounded-xl p-1 bg-lightMysticBlue text-white hover:cursor-pointer  hover:bg-[#1da1f2]/90 focus:ring-4 transition ease-in-out focus:outline-none focus:bg-mysticBlue ">Submit</button>
               
            </div>
           
        </form>
    )
}