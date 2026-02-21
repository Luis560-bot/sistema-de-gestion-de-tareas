import React from 'react'

/* importamos el componente TaskCard para mostrar cada tarea individualmente en la lista de tareas. */

import TaskCard from '../Components/TaskCard'


/* esta es la lista de tareas que se muestra en la página principal, y recibe las tareas como props 
desde el componente Homepage.*/

const TaskList = ({tasks}) => {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-5">
       {
        /* renderizamos la lista de tareas obtenidas desde la API */
        tasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))
      }
    </div>
  )
}

export default TaskList
