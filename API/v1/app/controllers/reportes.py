from flask import Blueprint, jsonify
from ..models.venta import VentaModel

reportes_endpoint = Blueprint('reportes_endpoint', __name__)

@reportes_endpoint.route('/reportes/marcas-con-ventas', methods=['GET'])
def marcas_con_ventas():
    resultado = VentaModel.marcas_con_ventas()
    return jsonify(resultado), 200
