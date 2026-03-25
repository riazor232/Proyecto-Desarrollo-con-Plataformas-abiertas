from flask import Blueprint, request, jsonify
from ..models.marca import MarcaModel

marcas_endpoint = Blueprint('marcas_endpoint', __name__)

@marcas_endpoint.route('/marcas', methods=['GET'])
def obtener_marcas():
    id_marca = request.args.get('id')
    if id_marca:
        marca = MarcaModel.obtener_por_id(id_marca)
        if marca:
            return jsonify(marca), 200
        return jsonify({"error": "Marca no encontrada"}), 404
    marcas = MarcaModel.obtener_todos()
    return jsonify(marcas), 200


@marcas_endpoint.route('/marcas', methods=['POST'])
def crear_marca():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No se recibieron datos"}), 400
    nuevo_id = MarcaModel.crear(data)
    return jsonify({"mensaje": "Marca creada exitosamente", "id": nuevo_id}), 201


@marcas_endpoint.route('/marcas', methods=['PUT'])
def actualizar_marca():
    id_marca = request.args.get('id')
    if not id_marca:
        return jsonify({"error": "Se requiere el parámetro id"}), 400
    data = request.get_json()
    resultado = MarcaModel.actualizar(id_marca, data)
    if resultado == -1:
        return jsonify({"error": "ID inválido"}), 400
    if resultado == 0:
        return jsonify({"mensaje": "No se realizaron cambios"}), 200
    return jsonify({"mensaje": "Marca actualizada exitosamente"}), 200


@marcas_endpoint.route('/marcas', methods=['DELETE'])
def eliminar_marca():
    id_marca = request.args.get('id')
    if not id_marca:
        return jsonify({"error": "Se requiere el parámetro id"}), 400
    resultado = MarcaModel.eliminar(id_marca)
    if resultado == -1:
        return jsonify({"error": "ID inválido"}), 400
    if resultado == 0:
        return jsonify({"error": "Marca no encontrada"}), 404
    return jsonify({"mensaje": "Marca eliminada exitosamente"}), 200
