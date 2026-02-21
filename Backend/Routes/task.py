# Acceso a datos para CRUD de tareas.
from database import get_all_tasks, create_task, get_one_task, get_one_task_id, delete_task, update_task
# Modelo de validacion para solicitudes y respuestas.
from models import Task
# Router y excepciones HTTP de FastAPI.
from fastapi import APIRouter, HTTPException


# Router dedicado a endpoints de tareas.
task = APIRouter()

# Ruta GET para listar todas las tareas.


@task.get('/api/tasks')
async def get_tasks():
    tasks = await get_all_tasks()
    return tasks


# Ruta POST para crear una tarea.

# `response_model=Task` indica que la respuesta se validará y serializará usando el modelo Task.

@task.post('/api/tasks', response_model=Task)
async def save_task(task: Task):

    # Verifica si ya existe una tarea con el mismo título.

    taskFound = await get_one_task(task.title)
    if taskFound:
        raise HTTPException(409, "La tarea ya existe")

    # `model_dump()` convierte el modelo Pydantic a un diccionario para insertar en MongoDB.
    response = await create_task(task.model_dump())
    if response:
        return response
    # Lanza un error HTTP 400 si falla la creacion de la tarea.
    # `HTTPException` permite devolver errores HTTP personalizados.
    raise HTTPException(400, "Error al crear la tarea")


# Ruta GET para obtener una tarea por ID.

# `response_model=Task` valida y serializa la respuesta usando el modelo Task.

@task.get('/api/tasks/{id}', response_model=Task)
# `id` es un parametro de ruta que se pasa a la funcion para buscar la tarea correspondiente.
async def get_task(id: str):
    task = await get_one_task_id(id)
    if task:
        return task
    raise HTTPException(404, f"Tarea no encontrada con ID: {id}")


# Ruta PUT para actualizar una tarea por ID.

@task.put('/api/tasks/{id}', response_model=Task)
async def put_task(id: str, task: Task):
    # Verifica si la tarea existe antes de intentar actualizarla.
    response = await update_task(id, task=task.model_dump())
    if response:
        return response
    raise HTTPException(404, f"Tarea no encontrada con ID: {id}")


# Ruta DELETE para eliminar una tarea por ID.

@task.delete('/api/tasks/{id}')
async def remove_task(id: str):
    response = await delete_task(id)
    if response:
        return "Tarea eliminada correctamente"
    raise HTTPException(404, f"Tarea no encontrada con ID: {id}")
