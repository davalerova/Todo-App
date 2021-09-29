import React, { useEffect, useReducer, useState } from 'react'
import TodoAdd from './TodoAdd';
import TodoList from './TodoList';
import { todoReducer } from './todoReducer'

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];

}

export const TodoApp = () => {

    const [ todos, dispatch ] = useReducer(todoReducer, [], init);
    const [ todosDeleted, setTodosDeleted] = useState(JSON.parse(localStorage.getItem('todosDeleted')) || []);
    const [ trashFlag, setTrashFlag ] = useState(false);

    const [filteredData, setFilteredData] = useState([todos])
 
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        setFilteredData(todos);
    }, [todos]);

    useEffect(()=>{
        localStorage.setItem('todosDeleted', JSON.stringify(todosDeleted));
    },[todosDeleted]);

    const handleDelete = (todoId) => {

        if(trashFlag){
            setTodosDeleted(todosDeleted.filter(todo=>todo.id !== todoId));
            handleFilterAll();
        }else{
            setTodosDeleted(todosDeleted.concat(todos.filter(todo=>todo.id === todoId)));
            const action = {
                type: 'delete',
                payload: todoId
            }
            dispatch(action);
        }

    }

    const handleToggle = (todoId) => {
        if(trashFlag){
            dispatch({
                type: 'add',
                payload: todosDeleted.filter(todo=>todo.id === todoId)[0]
            })
            setTodosDeleted(todosDeleted.filter(todo=>todo.id !== todoId));
            handleFilterAll();

        }else{
            dispatch({
                type: 'toggle',
                payload: todoId
            })
        }
        
    }

    const handleAddTodo = (newTodo) => {
        dispatch({
            type:'add',
            payload:newTodo
        })
    }

    const handleFilterAll = () => {
        setTrashFlag(false);
        setFilteredData(todos);
    }

    const handleFilterTodo = () => {
        setTrashFlag(false);
        setFilteredData(todos.filter(todo=>
            todo.done === false
            ))
    }

    const handleFilterDone = () => {
        setTrashFlag(false);
        setFilteredData(todos.filter(todo=>
            todo.done === true    
        ))
    }

    const handleFilterDeleted = () => {
        setFilteredData(todosDeleted);
        setTrashFlag(true);
    }

    return (
        <div className="md:w-6/12 md:mx-auto bg-second_blue min-h-screen box-border	p-5">
            <h2 className="text-center text-5xl text-white box-border">TODO App</h2>
            {!trashFlag?
                <TodoAdd handleAddTodo={handleAddTodo} todos={filteredData} trashFlag={trashFlag}/>
                :<p className="mt-4 text-center text-white bg-main_blue text-xl">Recycle Bin</p>}
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

