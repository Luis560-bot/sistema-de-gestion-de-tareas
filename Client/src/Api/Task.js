/* se creo para manejar las solicitudes de actualización de tareas a la API utilizando axios */

import axios from "axios";

/* se define la URL base de la API utilizando una variable de entorno, lo que permite configurar fácilmente la URL sin modificar el código. Si la variable de entorno no está definida, se utiliza una URL por defecto. */

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const end_point = `${API_URL}/tasks`;

/* se creo para actualizar una tarea existente en la API, tomando el id de la tarea y los datos de la tarea como parámetros. */

export const updateTask = (id, task) => axios.put(`${end_point}/${id}` ,task)