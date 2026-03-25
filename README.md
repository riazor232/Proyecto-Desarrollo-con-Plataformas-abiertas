

##  Segunda Parte — API REST

La segunda parte del proyecto es una API REST construida con **Python + Flask + PyMongo**.


### Endpoints disponibles por modelo

#### Modelo: Usuarios
1 Obtener todos los usuarios:
    Método: GET
    URL: http://127.0.0.1:5000/tienda/api/v1/usuarios
2. Obtener usuario por ID:
   Método: GET
    URL: http://127.0.0.1:5000/tienda/api/v1/usuarios?id={id}
3. Crear usuario:
   Método: POST
    URL: http://127.0.0.1:5000/tienda/api/v1/usuarios
4. Actualizar usuario:
    Método: PUT
    URL: http://127.0.0.1:5000/tienda/api/v1/usuarios?id={id}
5. Eliminar usuario:
   Método: DELETE
   URL: http://127.0.0.1:5000/tienda/api/v1/usuarios?id={id}

#### Modelo: Marcas
1. Obtener todas las marcas:
   Método: GET
   URL: http://127.0.0.1:5000/tienda/api/v1/marcas
2. Obtener marca por ID:
   Método: GET
   URL: http://127.0.0.1:5000/tienda/api/v1/marcas?id={id}
3. Crear marca:
   Método: POST
   URL: http://127.0.0.1:5000/tienda/api/v1/marcas
4. Actualizar marca:
   Método: PUT
   URL: http://127.0.0.1:5000/tienda/api/v1/marcas?id={id}
5. Eliminar marca:
   Método: DELETE
   URL: http://127.0.0.1:5000/tienda/api/v1/marcas?id={id}

#### Modelo: Prendas
1. Obtener todas las prendas:
   Método: GET
   URL: http://127.0.0.1:5000/tienda/api/v1/prendas
2. Obtener prenda por ID:
   Método: GET
   URL: http://127.0.0.1:5000/tienda/api/v1/prendas?id={id}
3. Crear prenda:
   Método: POST
   URL: http://127.0.0.1:5000/tienda/api/v1/prendas
4. Actualizar prenda:
   Método: PUT
   URL: http://127.0.0.1:5000/tienda/api/v1/prendas?id={id}
5. Eliminar prenda:
   Método: DELETE
   URL: http://127.0.0.1:5000/tienda/api/v1/prendas?id={id}

#### Modelo: Ventas
1. Obtener todas las ventas:
   Método: GET
   URL: http://127.0.0.1:5000/tienda/api/v1/ventas
2. Obtener venta por ID:
   Método: GET
   URL: http://127.0.0.1:5000/tienda/api/v1/ventas?id={id}
3. Crear venta:
   Método: POST
   URL: http://127.0.0.1:5000/tienda/api/v1/ventas
4. Actualizar venta:
   Método: PUT
   URL: http://127.0.0.1:5000/tienda/api/v1/ventas?id={id}
5. Eliminar venta:
   Método: DELETE
   URL: http://127.0.0.1:5000/tienda/api/v1/ventas?id={id}

#### Modelo: Reportes
1. Obtener reporte de marcas con ventas:
   Método: GET
   URL: http://127.0.0.1:5000/tienda/api/v1/reportes/marcas-con-ventas
