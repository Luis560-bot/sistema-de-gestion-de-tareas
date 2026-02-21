# Pydantic define esquemas y valida la entrada/salida de la API.
from pydantic import BaseModel, Field, ConfigDict
from pydantic_core import core_schema

# Optional marca campos que pueden omitirse.
from typing import Optional

# ObjectId de MongoDB para validar identificadores nativos.
from bson import ObjectId


# Adaptador de ObjectId compatible con Pydantic.
class PyObjectId(ObjectId):
    # Pydantic v2 usa este esquema para validar el tipo personalizado.
    @classmethod
    def __get_pydantic_core_schema__(cls, _source_type, _handler):
        return core_schema.no_info_plain_validator_function(cls.validate)

    # Convierte a str para serializacion JSON estable.
    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("ObjectId inválido")
        return str(v)


class Task(BaseModel):
    # Alias de MongoDB para mapear _id al modelo.
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    # Titulo obligatorio para identificar la tarea.
    title: str
    # Descripcion opcional para detalles adicionales.
    description: Optional[str] = None
    # Estado por defecto: pendiente.
    completed: bool = False

    # Configuracion Pydantic v2 para compatibilidad con MongoDB y JSON.
    model_config = ConfigDict(
        from_attributes=True,
        validate_by_name=True,
        json_encoders={ObjectId: str},
    )
