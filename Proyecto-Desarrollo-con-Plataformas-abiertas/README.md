# 🛍️ Tienda de Ropa — Base de Datos MongoDB

## Descripción del Proyecto

Este proyecto consiste en el diseño e implementación de una base de datos NoSQL utilizando MongoDB para gestionar una tienda de ropa. Fue desarrollado como parte del curso Desarrollo con Plataformas Abiertas de la Universidad Florencio del Castillo.

La base de datos tienda_ropa permite administrar:

- Usuarios — Registro de clientes y administradores de la tienda.
- Marcas — Catálogo de marcas de ropa disponibles.
- Prendas — Inventario detallado de productos, con precios, tallas y stock.
- Ventas — Registro de transacciones realizadas por los usuarios.

### Funcionalidades implementadas

- Creación de la base de datos y 4 colecciones.
- Operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en cada colección.
- Consulta de agregación significativa: cantidad vendida de prendas filtrada por fecha.

### Tecnologías utilizadas

 Tecnología -  Uso 

 MongoDB - Motor de base de datos NoSQL 
 mongosh - Shell para ejecutar los scripts 
 JavaScript - Lenguaje de los scripts de operaciones 

---

 📦 Tablas de la Base de Datos

 1. Tabla: usuarios

Almacena la información de los usuarios registrados en la tienda (clientes y administradores).

{
  "_id": '1',
  "nombre": "Juan Perez",
  "correo": "juan@example.com",
  "rol": "cliente",
  "fecha_registro": "2026-02-11T10:00:00Z"
}


2. Tabla: marcas

Contiene el catálogo de marcas de ropa disponibles en la tienda.

{
  "_id": '1',
  "nombre": "Nike",
  "pais_origen": "Estados Unidos"
}




3. Tabla: `prendas`

Registra el inventario de productos disponibles, incluyendo precio, talla y stock.


{
  "_id": '1',
  "nombre": "Camiseta Deportiva",
  "marca": "Nike",
  "precio": 25.00,
  "talla": "M",
  "stock": 50
}

4. Tabla: ventas

Almacena las transacciones de venta, vinculando usuarios con las prendas adquiridas.


{
  "_id": '100',
  "usuario_id":'1',
  "prendas": [
    {
      "nombre": "Camiseta Deportiva",
      "cantidad": 1,
      "subtotal": 25.00
    }
  ],
  "total": 25.00,
  "estado": "completado",
  "fecha": "2026-02-11T10:00:00Z"
}

Integrantes del Proyecto

- Jhoantan Juarez Meza
