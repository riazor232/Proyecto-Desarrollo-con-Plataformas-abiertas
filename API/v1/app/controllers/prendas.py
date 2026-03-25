from flask import Blueprint, request, jsonify
from ..models.prenda import PrendaModel

prendas_endpoint = Blueprint('prendas_endpoint', __name__)

@prendas_endpoint.route('/prendas', methods=['GET'])
def obtener_prendas():
    id_prenda = request.args.get('id')
    if id_prenda:
        prenda = PrendaModel.obtener_por_id(id_prenda)
        if prenda:
            return jsonify(prenda), 200
        return jsonify({"error": "Prenda no encontrada"}), 404
    prendas = PrendaModel.obtener_todos()
    return jsonify(prendas), 200


@prendas_endpoint.route('/prendas', methods=['POST'])
def crear_prenda():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No se recibieron datos"}), 400
    nuevo_id = PrendaModel.crear(data)
    return jsonify({"mensaje": "Prenda creada exitosamente", "id": nuevo_id}), 201


@prendas_endpoint.route('/prendas', methods=['PUT'])
def actualizar_prenda():
    id_prenda = request.args.get('id')
    if not id_prenda:
        return jsonify({"error": "Se requiere el parámetro id"}), 400
    data = request.get_json()
    resultado = PrendaModel.actualizar(id_prenda, data)
    if resultado == -1:
        return jsonify({"error": "ID inválido"}), 400
    if resultado == 0:
        return jsonify({"mensaje": "No se realizaron cambios"}), 200
    return jsonify({"mensaje": "Prenda actualizada exitosamente"}), 200


@prendas_endpoint.route('/prendas', methods=['DELETE'])
def eliminar_prenda():
    id_prenda = request.args.get('id')
    if not id_prenda:
        return jsonify({"error": "Se requiere el parámetro id"}), 400
    resultado = PrendaModel.eliminar(id_prenda)
    if resultado == -1:
        return jsonify({"error": "ID inválido"}), 400
    if resultado == 0:
        return jsonify({"error": "Prenda no encontrada"}), 404
    return jsonify({"mensaje": "Prenda eliminada exitosamente"}), 200
