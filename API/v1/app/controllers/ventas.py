from flask import Blueprint, request, jsonify
from ..models.venta import VentaModel

ventas_endpoint = Blueprint('ventas_endpoint', __name__)

@ventas_endpoint.route('/ventas', methods=['GET'])
def obtener_ventas():
    id_venta = request.args.get('id')
    if id_venta:
        venta = VentaModel.obtener_por_id(id_venta)
        if venta:
            return jsonify(venta), 200
        return jsonify({"error": "Venta no encontrada"}), 404
    ventas = VentaModel.obtener_todos()
    return jsonify(ventas), 200


@ventas_endpoint.route('/ventas', methods=['POST'])
def crear_venta():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No se recibieron datos"}), 400
    nuevo_id = VentaModel.crear(data)
    return jsonify({"mensaje": "Venta registrada exitosamente", "id": nuevo_id}), 201


@ventas_endpoint.route('/ventas', methods=['PUT'])
def actualizar_venta():
    id_venta = request.args.get('id')
    if not id_venta:
        return jsonify({"error": "Se requiere el parámetro id"}), 400
    data = request.get_json()
    resultado = VentaModel.actualizar(id_venta, data)
    if resultado == -1:
        return jsonify({"error": "ID inválido"}), 400
    if resultado == 0:
        return jsonify({"mensaje": "No se realizaron cambios"}), 200
    return jsonify({"mensaje": "Venta actualizada exitosamente"}), 200


@ventas_endpoint.route('/ventas', methods=['DELETE'])
def eliminar_venta():
    id_venta = request.args.get('id')
    if not id_venta:
        return jsonify({"error": "Se requiere el parámetro id"}), 400
    resultado = VentaModel.eliminar(id_venta)
    if resultado == -1:
        return jsonify({"error": "ID inválido"}), 400
    if resultado == 0:
        return jsonify({"error": "Venta no encontrada"}), 404
    return jsonify({"mensaje": "Venta eliminada exitosamente"}), 200
