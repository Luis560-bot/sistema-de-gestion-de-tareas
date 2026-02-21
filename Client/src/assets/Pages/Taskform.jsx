import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Taskform = () => {
  // Lee el id de la URL para saber si estamos creando o editando una tarea.
  const params = useParams();

  // Estados controlados del formulario.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Permite redirigir al usuario después de guardar, borrar o volver.
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // Evita el refresco de página al enviar el formulario.
    e.preventDefault();

    // Reutiliza el mismo formulario:
    // - con id: actualiza la tarea (PUT)
    // - sin id: crea una nueva tarea (POST)

    const res = params.id
      ? await axios.put(`http://127.0.0.1:8000/api/tasks/${params.id}`, {
          title,
          description,
        })
      : await axios.post("http://127.0.0.1:8000/api/tasks", {
          title,
          description,
        });

    console.log(res.data);

    // Limpia campos y vuelve al listado principal.
    e.target.reset();

    navigate("/");
  };

  // Al entrar en modo edición, trae la tarea actual y precarga el formulario.
  useEffect(() => {
    if (params.id) {
      fetchTask();
    }

    async function fetchTask() {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/tasks/${params.id}`,
      );
      setTitle(res.data.title);
      setDescription(res.data.description);
    }
  }, []);

  return (
    <div className="flex items-center justify-center text-lg text-center mt-10 font-bold">
      <div>
        <button
          type="button"
          className="bg-gray-200 text-black py-2 px-4 rounded mb-4"
          onClick={() => navigate("/")}
        >
          {/* Vuelve al inicio sin guardar cambios. */}
          Volver
        </button>
        <form
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Title"
            className="block py-2 px-3 mb-4 w-full text-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <textarea
            placeholder="description"
            className="block py-2 px-3 mb-4 w-full text-black"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button className="bg-black text-white py-2 px-4 rounded">
            {params.id ? "Actualizar" : "Crear Tarea"}
          </button>
        </form>
        {/* Solo en edición: elimina la tarea actual y regresa al listado. */}
        {params.id && (
          <button
            className="bg-red-500 text-white py-2 px-4 rounded mt-4"
            onClick={async () => {
              await axios.delete(`http://127.0.0.1:8000/api/tasks/${params.id}`);
              navigate("/");
            }}
          >
            Borrar tarea
          </button>
        )}
      </div>
    </div>
  );
};

export default Taskform;
