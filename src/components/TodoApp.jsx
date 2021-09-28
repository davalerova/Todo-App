import React, { useEffect, useReducer, useState } from 'react'
import TodoAdd from './TodoAdd';
import TodoList from './TodoList';
import { todoReducer } from './todoReducer'

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const TodoApp = () => {

    const [ todos, dispatch ] = useReducer(todoReducer, [], init);

    const [filteredData, setFilteredData] = useState([todos])
 
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        setFilteredData(todos);
    }, [todos]);

    const handleDelete = (todoId) => {

        const action = {
            type: 'delete',
            payload: todoId
        }
        dispatch(action);
    }

    const handleToggle = (todoId) => {
        dispatch({
            type: 'toggle',
            payload: todoId
        })
    }

    const handleAddTodo = (newTodo) => {
        dispatch({
            type:'add',
            payload:newTodo
        })
    }

    const handleFilterAll = () => {
        setFilteredData(todos)
    }

    const handleFilterTodo = () => {
        setFilteredData(todos.filter(todo=>
            todo.done === false
            ))
    }

    const handleFilterDone = () => {
        setFilteredData(todos.filter(todo=>
            todo.done === true    
        ))
    }

    const handleFilterDeleted = () => {
        console.log("handleFilterDeleted");
    }

    return (
        <div className="md:w-6/12 md:mx-auto bg-second_blue min-h-screen box-border	p-5">
            <h2 className="text-center text-5xl text-white box-border">TODO App</h2>
            <TodoAdd handleAddTodo={handleAddTodo} todos={filteredData} />
            <div className="bg-third_blue h-96  overflow-x-hidden">
                <TodoList todos={filteredData} handleDelete={handleDelete} handleToggle={handleToggle} />
            </div>
            <div className="bg-main_blue text-white flex justify-around">
                <div className="cursor-pointer" onClick={handleFilterAll}>All</div>
                <div className="cursor-pointer" onClick={handleFilterTodo}>Todo</div>
                <div className="cursor-pointer" onClick={handleFilterDone}>Done</div>
                <div className="cursor-pointer" onClick={handleFilterDeleted}>Deleted</div>
            </div>
        </div>
    )
}

