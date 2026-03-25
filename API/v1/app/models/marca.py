from bson.objectid import ObjectId
from .. import mongo

class MarcaModel:

    @staticmethod
    def obtener_todos():
        cursor = mongo.db.marcas.find()
        marcas = []
        for m in cursor:
            m["_id"] = str(m["_id"])
            marcas.append(m)
        return marcas

    @staticmethod
    def obtener_por_id(id):
        try:
            m = mongo.db.marcas.find_one({"_id": ObjectId(id)})
            if m:
                m["_id"] = str(m["_id"])
            return m
        except:
            return None

    @staticmethod
    def crear(data):
        result = mongo.db.marcas.insert_one(data)
        return str(result.inserted_id)

    @staticmethod
    def actualizar(id, data):
        try:
            result = mongo.db.marcas.update_one(
                {"_id": ObjectId(id)},
                {"$set": data}
            )
            return result.modified_count
        except:
            return -1

    @staticmethod
    def eliminar(id):
        try:
            result = mongo.db.marcas.delete_one({"_id": ObjectId(id)})
            return result.deleted_count
        except:
            return -1
