from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS

mongo = PyMongo()

def create_app():
    app = Flask(__name__)

    app.config["MONGO_URI"] = "mongodb+srv://JuarezAdmin:voE2eYWCTOj0B1ef@cluster0.5pnbjne.mongodb.net/tienda_ropa"

    mongo.init_app(app)
    CORS(app)

    @app.route('/')
    def index():
        return "API en ejecución. Usa /tienda/api/v1/usuarios, /marcas, /prendas, /ventas, /reportes."

    from .controllers.usuarios import usuarios_endpoint
    from .controllers.marcas import marcas_endpoint
    from .controllers.prendas import prendas_endpoint
    from .controllers.ventas import ventas_endpoint
    from .controllers.reportes import reportes_endpoint

    app.register_blueprint(usuarios_endpoint, url_prefix="/tienda/api/v1")
    app.register_blueprint(marcas_endpoint,   url_prefix="/tienda/api/v1")
    app.register_blueprint(prendas_endpoint,  url_prefix="/tienda/api/v1")
    app.register_blueprint(ventas_endpoint,   url_prefix="/tienda/api/v1")
    app.register_blueprint(reportes_endpoint, url_prefix="/tienda/api/v1")

    return app