import React from 'react'
import { useForm } from '../hooks/useForm';

const TodoAdd = ({handleAddTodo, todos}) => {
    const [ {description}, handleInputChanges, reset ] = useForm({
        description: ''
    });

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(description.trim().length <= 1 || todos.some(todo=>todo.desc===description)){
            return;
        }
        const newTodo = {
            id: new Date().getTime(),
            desc: description,
            done: false
        };

        handleAddTodo(newTodo);
        reset();

    }

    return (
        <form className="mt-2 py-4" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="description"
                    autoComplete="off" 
                    placeholder="New task..." 
                    className=" p-2 w-9/12	"
                    value={description}
                    onChange={handleInputChanges}>
                </input>
                <button className="bg-main_blue p-2 w-3/12 text-white ">Add</button>
            </form>
    )
}

export default TodoAdd
