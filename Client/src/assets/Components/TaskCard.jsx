import React from "react";

/* importamos useNavigate para poder navegar a la página de detalles de la tarea cuando se haga clic en la tarjeta. */

import { useNavigate } from "react-router-dom";

import { updateTask } from "../../Api/Task";

/* TaskCard es un componente que recibe una tarea como prop y la muestra en un formato de tarjeta. */

const TaskCard = ({ task }) => {
  const navigate = useNavigate();

  /* esta función se llama cuando se hace clic en el botón de completar tarea, y actualiza el estado de la tarea en la API utilizando la función updateTask importada desde src/Api/Task.js. */

  const handleToggleCompleted = async (event) => {
    event.stopPropagation();

    await updateTask(task._id, {
      title: task.title,
      description: task.description,
      completed: !task.completed,
    });

    {
      /* después de actualizar la tarea, se recarga la página para reflejar los cambios. */
    }

    if (response?.status === 200) {
      window.location.reload();
    }

    console.log("Tarea actualizada:", task._id);
  };

  return (
    /* cada tarea se muestra en un div con su título y descripción y el id para identificarla de forma única */
    <div
      key={task._id}
      className="p-4 bg-white rounded-lg shadow-md cursor-pointer"
      onClick={() => navigate(`/tasks/${task._id}`)}
    >
      {/* al hacer clic en la tarjeta, se navega a la página de detalles de la tarea utilizando el id de la tarea para construir la URL. */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <h2 className="text-2xl font-bold">{task.title}</h2>
        <button
          className=" text-black px-4 py-2 rounded flex items-center gap-2 shrink-0 hover:bg-gray-200 transition-colors duration-300"
          onClick={handleToggleCompleted}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`w-6 h-6 ${task.completed ? "text-green-500" : "text-gray-400"}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </button>
      </div>
      <p className="text-gray-600">{task.description}</p>
    </div>
  );
};

export default TaskCard;
