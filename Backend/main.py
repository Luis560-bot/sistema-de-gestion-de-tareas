# Ejecuta el servidor con: "uvicorn main:app --reload".
# Importa FastAPI para crear la aplicacion web.
from Routes.task import task
from fastapi import FastAPI


# Importa CORSMiddleware para permitir solicitudes desde otros dominios.
from fastapi.middleware.cors import CORSMiddleware

# Importa config de decouple para manejar variables de entorno (como la URL del frontend).

# se instala con: pip install python-decouple

from decouple import config


# Instancia principal de la aplicacion.
app = FastAPI()

# Define los orígenes permitidos para CORS. En este caso, se obtiene la URL del frontend desde las variables de entorno.

origins = [
    config('FRONTEND_URL', default='http://localhost:5173'),
    'http://127.0.0.1:5173',
]

# Configura CORS para permitir solicitudes desde el frontend (por ejemplo, Vite).
# Los Cors son necesarios para permitir que el frontend (que corre en un puerto diferente) pueda hacer solicitudes a este backend sin ser bloqueado por el navegador.

app.add_middleware(
    CORSMiddleware,
    # Permite solicitudes desde los orígenes definidos en la variable de entorno.
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Importa el router de tareas.
# Registra el router en la aplicacion principal.
app.include_router(task)

# Ruta GET raiz ("/").


@app.get('/')
def welcome():
    return {'Mensaje': 'Bienvenido a FastAPI!'}
