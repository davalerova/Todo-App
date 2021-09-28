import React from 'react'

import TrashIcon from '../assets/trash.svg'

const TodoListItem = ({todo, index, handleDelete, handleToggle}) => {
    return (
        <li className="flex w-full justify-between border-white border-b-2 m-1 p-1" key={todo.id}>
            <p  className={`${todo.done ? "line-through	w-3/4 text-white cursor-pointer": "w-3/4 text-white cursor-pointer"}`} 
                onClick={()=>handleToggle(todo.id)}>{todo.desc}</p>
            <button 
                type="submit" 
                className={`${todo.done?'flex justify-end visible  w-1/24':"invisible w-1/4"}`} 
                onClick={()=>handleDelete(todo.id)}>
                    <img className="h-8" src={TrashIcon} alt={TrashIcon}></img>
            </button>
        </li>
    )
}

export default TodoListItem
