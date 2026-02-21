# Conexion a MongoDB con Motor (driver asincrono).
from motor.motor_asyncio import AsyncIOMotorClient
from decouple import config

# Modelo Task para mapear documentos a Pydantic.
from models import Task

# ObjectId para manejar identificadores de MongoDB.

from bson import ObjectId

# Cliente MongoDB (URL configurable segun entorno).
MONGODB_URI = config("MONGODB_URI", default="mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGODB_URI)

# Base de datos y coleccion.
database = client.taskdatabase

# Coleccion de tareas.
collection = database.tasks

# Operaciones CRUD asincronas sobre la coleccion de tareas.


async def get_one_task_id(id):
    # `find_one` busca un documento por su ID, convirtiendo el string a ObjectId.
    task = await collection.find_one({"_id": ObjectId(id)})
    return task

# Crea una tarea y devuelve el documento recien insertado.


async def create_task(task):
    # `insert_one` inserta y retorna el ID generado.
    new_task = await collection.insert_one(task)
    # `find_one` recupera el documento por ID.
    create_task = await collection.find_one({"_id": new_task.inserted_id})
    return create_task

# Obtiene todas las tareas recorriendo un cursor asincrono.


async def get_all_tasks():
    # Acumulador de tareas serializadas.
    tasks = []
    # `find` retorna un cursor; se recorre con `async for`.
    cursor = collection.find({})
    # Convierte cada documento a Task.
    async for document in cursor:
        tasks.append(Task(**document))
    return tasks


# Actualiza una tarea por ID con nuevos datos.
async def update_task(id: str, task):
    # `update_one` aplica `$set` solo a los campos enviados.
    # task es un diccionario con los campos a actualizar, obtenido de `model_dump()`.
    await collection.update_one({"_id": ObjectId(id)}, {"$set": task})
    # Recupera el documento actualizado para devolverlo.
    document = await collection.find_one({"_id": ObjectId(id)})
    return document

# Elimina una tarea por ID.


async def delete_task(id: str):
    # `delete_one` elimina el documento que coincide con el ID.
    await collection.delete_one({"_id": ObjectId(id)})
    # Retorna True si se ejecuto la operacion.
    return True


# Busca una tarea por titulo.
async def get_one_task(title):
    # `find_one` busca un documento que coincida con el titulo dado.
    task = await collection.find_one({"title": title})
    return task
