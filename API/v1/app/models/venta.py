from bson.objectid import ObjectId
from .. import mongo

class VentaModel:

    @staticmethod
    def obtener_todos():
        cursor = mongo.db.ventas.find()
        ventas = []
        for v in cursor:
            v["_id"] = str(v["_id"])
            ventas.append(v)
        return ventas

    @staticmethod
    def obtener_por_id(id):
        try:
            v = mongo.db.ventas.find_one({"_id": ObjectId(id)})
            if v:
                v["_id"] = str(v["_id"])
            return v
        except:
            return None

    @staticmethod
    def crear(data):
        result = mongo.db.ventas.insert_one(data)
        return str(result.inserted_id)

    @staticmethod
    def actualizar(id, data):
        try:
            result = mongo.db.ventas.update_one(
                {"_id": ObjectId(id)},
                {"$set": data}
            )
            return result.modified_count
        except:
            return -1

    @staticmethod
    def eliminar(id):
        try:
            result = mongo.db.ventas.delete_one({"_id": ObjectId(id)})
            return result.deleted_count
        except:
            return -1

    @staticmethod
    def marcas_con_ventas():
        pipeline = [
            {
                "$lookup": {
                    "from": "prendas",
                    "localField": "prenda",
                    "foreignField": "nombre",
                    "as": "prenda_info"
                }
            },
            { "$unwind": "$prenda_info" },
            {
                "$group": {
                    "_id": "$prenda_info.marca",
                    "total_ventas": { "$sum": 1 },
                    "cantidad_total": { "$sum": "$cantidad" }
                }
            },
            { "$sort": { "total_ventas": -1 } }
        ]
        cursor = mongo.db.ventas.aggregate(pipeline)
        resultado = []
        for r in cursor:
            resultado.append({
                "marca": r["_id"],
                "total_ventas": r["total_ventas"],
                "cantidad_total": r["cantidad_total"]
            })
        return resultado
