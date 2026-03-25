from bson.objectid import ObjectId
from .. import mongo

class UsuarioModel:

    @staticmethod
    def _db():
        if mongo.db is None:
            raise RuntimeError("MongoDB no inicializado. Revisa MONGO_URI y create_app().")
        return mongo.db

    @staticmethod
    def obtener_todos():
        cursor = UsuarioModel._db().usuarios.find()
        usuarios = []
        for u in cursor:
            u["_id"] = str(u["_id"])
            usuarios.append(u)
        return usuarios

    @staticmethod
    def obtener_por_id(id):
        try:
            u = mongo.db.usuarios.find_one({"_id": ObjectId(id)})
            if u:
                u["_id"] = str(u["_id"])
            return u
        except:
            return None

    @staticmethod
    def crear(data):
        result = mongo.db.usuarios.insert_one(data)
        return str(result.inserted_id)

    @staticmethod
    def actualizar(id, data):
        try:
            result = mongo.db.usuarios.update_one(
                {"_id": ObjectId(id)},
                {"$set": data}
            )
            return result.modified_count
        except:
            return -1

    @staticmethod
    def eliminar(id):
        try:
            result = mongo.db.usuarios.delete_one({"_id": ObjectId(id)})
            return result.deleted_count
        except:
            return -1
