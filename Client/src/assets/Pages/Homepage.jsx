import React from "react";

/* importamos useEffect para manejar efectos secundarios en el componente */

/* useEffect es un hook de React que nos permite realizar efectos secundarios en nuestros componentes, 
como por ejemplo, hacer solicitudes a una API, manipular el DOM, etc. En este caso, lo utilizamos para obtener 
las tareas desde la API cuando el componente se monta. */

import { useEffect } from "react";

/* importamos useState para manejar el estado del componente */

/* useState es un hook de React que nos permite agregar estado a nuestros componentes funcionales.
 En este caso, lo utilizamos para almacenar las tareas obtenidas desde la API en el estado del componente. */

import { useState } from "react";

/* importamos axios para hacer solicitudes HTTP a la API */

import axios from "axios";

/* importamos el componente TaskList para mostrar la lista de tareas */

import TaskList from "../Components/TaskList";

import { useNavigate } from "react-router-dom";

/* definimos el componente Homepage */

const Homepage = () => {

  /* esto nos permite navegar a la página de creación de tareas al hacer clic en un botón o enlace. */

  const navigate = useNavigate();

  /* definimos el estado de las tareas como un array vacío inicialmente */

  /* es vacio porque aún no hemos obtenido las tareas desde la API, 
  y se actualizará con los datos obtenidos una vez que se haga la solicitud. */
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    /* definimos una función asíncrona para obtener las tareas desde la API */
    async function fetchTask() {
      /* hacemos una solicitud GET a la API para obtener las tareas */
      const res = await axios.get("http://127.0.0.1:8000/api/tasks");
      /* actualizamos el estado de las tareas con los datos obtenidos de la API */
      setTasks(res.data);
    }
    /* llamamos a la función para obtener las tareas cuando el componente se monta */
    fetchTask();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-10">
        Bienvenido a Task-P
      </h1>

      <button className="hover-underline bg-black font-bold text-white py-2 px-4 rounded mt-4 ml-5 flex items-center gap-2" onClick={() => navigate("/tasks/new")}>
         Crear nueva tarea
         <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M14.36 4.07L19.93 9.64L21.34 8.23C22.12 7.45 22.12 6.18 21.34 5.4L18.6 2.66C17.82 1.88 16.55 1.88 15.77 2.66L14.36 4.07Z" fill="#FBC02D"/>
           <path d="M5 16.5L10.5 10.5L13.5 13.5L7.5 19L5 16.5Z" fill="#FFAB91"/>
           <path d="M18.6 2.66L14.36 4.07L19.93 9.64L15.5 14L10 8.5L2.5 16L4 17.5L11.5 10L17 15.5L21.34 5.4C22.12 4.62 22.12 3.35 21.34 2.57L18.6 2.66Z" fill="#FFCC80"/>
           <path d="M3 21L5 16.5L7.5 19L3 21Z" fill="#795548"/>
           <path d="M19.93 9.64L15.5 14L10 8.5L15.5 3L19.93 9.64Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
         </svg>
      </button>

      {/* renderizamos el componente TaskList y le pasamos las tareas como props */}

      {/* props es un objeto que contiene los datos que se pasan a un componente desde su padre.
      En este caso, estamos pasando el estado de las tareas al componente TaskList para que pueda
      mostrar la lista de tareas. */}

      {/*task es lo obtenemos del useState*/}

      <TaskList tasks={tasks} />
    </div>
  );
};

export default Homepage;
