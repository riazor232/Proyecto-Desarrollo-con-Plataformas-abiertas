from flask import Blueprint, request, jsonify
from ..models.usuario import UsuarioModel

usuarios_endpoint = Blueprint('usuarios_endpoint', __name__)

@usuarios_endpoint.route('/usuarios', methods=['GET'])
def obtener_usuarios():
    id_usuario = request.args.get('id')
    if id_usuario:
        usuario = UsuarioModel.obtener_por_id(id_usuario)
        if usuario:
            return jsonify(usuario), 200
        return jsonify({"error": "Usuario no encontrado"}), 404
    usuarios = UsuarioModel.obtener_todos()
    return jsonify(usuarios), 200


@usuarios_endpoint.route('/usuarios', methods=['POST'])
def crear_usuario():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No se recibieron datos"}), 400
    nuevo_id = UsuarioModel.crear(data)
    return jsonify({"mensaje": "Usuario creado exitosamente", "id": nuevo_id}), 201


@usuarios_endpoint.route('/usuarios', methods=['PUT'])
def actualizar_usuario():
    id_usuario = request.args.get('id')
    if not id_usuario:
        return jsonify({"error": "Se requiere el parámetro id"}), 400
    data = request.get_json()
    resultado = UsuarioModel.actualizar(id_usuario, data)
    if resultado == -1:
        return jsonify({"error": "ID inválido"}), 400
    if resultado == 0:
        return jsonify({"mensaje": "No se realizaron cambios"}), 200
    return jsonify({"mensaje": "Usuario actualizado exitosamente"}), 200


@usuarios_endpoint.route('/usuarios', methods=['DELETE'])
def eliminar_usuario():
    id_usuario = request.args.get('id')
    if not id_usuario:
        return jsonify({"error": "Se requiere el parámetro id"}), 400
    resultado = UsuarioModel.eliminar(id_usuario)
    if resultado == -1:
        return jsonify({"error": "ID inválido"}), 400
    if resultado == 0:
        return jsonify({"error": "Usuario no encontrado"}), 404
    return jsonify({"mensaje": "Usuario eliminado exitosamente"}), 200
