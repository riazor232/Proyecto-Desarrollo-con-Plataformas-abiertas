from bson.objectid import ObjectId
from .. import mongo

class PrendaModel:

    @staticmethod
    def obtener_todos():
        cursor = mongo.db.prendas.find()
        prendas = []
        for p in cursor:
            p["_id"] = str(p["_id"])
            prendas.append(p)
        return prendas

    @staticmethod
    def obtener_por_id(id):
        try:
            p = mongo.db.prendas.find_one({"_id": ObjectId(id)})
            if p:
                p["_id"] = str(p["_id"])
            return p
        except:
            return None

    @staticmethod
    def crear(data):
        result = mongo.db.prendas.insert_one(data)
        return str(result.inserted_id)

    @staticmethod
    def actualizar(id, data):
        try:
            result = mongo.db.prendas.update_one(
                {"_id": ObjectId(id)},
                {"$set": data}
            )
            return result.modified_count
        except:
            return -1

    @staticmethod
    def eliminar(id):
        try:
            result = mongo.db.prendas.delete_one({"_id": ObjectId(id)})
            return result.deleted_count
        except:
            return -1
