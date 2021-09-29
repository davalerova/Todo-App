import React from 'react'
import TodoListItem from './TodoListItem'

const TodoList = ({todos, handleDelete, handleToggle}) => {
    return (
        <ul className="flex justify-between	align-center flex-wrap">
            {todos.map((todo, i)=>(
                <TodoListItem todo={todo} index={i} handleDelete={handleDelete} handleToggle={handleToggle} key={i} />
            ))}
        </ul>
    )
}

export default TodoList
