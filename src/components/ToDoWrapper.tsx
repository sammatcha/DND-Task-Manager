import { useState } from "react";
import ToDoForm from "./ToDoForm";

interface Todo {
    id: number,
    text:string,
    completed: boolean,
    category: string
}
const categories = [
    {title: "To Do"},
    {title: "In Progress"},
    {title: "Completed"},

];
export default function ToDoWrapper() {
    const [todos, setTodos] = useState<Todo[]>([]);

    function addTodo(text:string){
           const newTodos = {
                id: Date.now(),
                text,
                completed:false,
                category: "To Do"
           };
           setTodos([...todos, newTodos]);
    }
    
    return(
        <div className="flex flex-col justify-center items-center max-w-screen-2xl">
            <h1 className="text-3xl mt-10">to do list</h1>
            <ToDoForm addTodo={addTodo}/>
        <div className="flex space-x-10 w-full ml-32">
            {categories.map((category, index) =>(
                <div className="border min-h-[300px] w-full shadow-lg" key={index}>
                    <p className="flex justify-center mt-4"> {category.title}</p>
                   {todos.filter((todo) => todo.id === category.title) }
                </div>
            ))}
        </div>
        </div>
    )
}