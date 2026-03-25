# 🛍️ Tienda de Ropa — API REST

Este proyecto es la segunda parte del sistema de gestión de la tienda de ropa. Consiste en una **API REST construida con Python + Flask + PyMongo** que permite realizar operaciones CRUD sobre la base de datos MongoDB `tienda_ropa`.

---

## ⚙️ Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| Python | Lenguaje principal |
| Flask | Framework web para la API |
| Flask-PyMongo | Conexión con MongoDB |
| Flask-CORS | Manejo de CORS |
| MongoDB | Base de datos NoSQL |
| Postman | Pruebas de endpoints |

---

## 📦 Colecciones de la Base de Datos

### 👤 Usuarios
```json
{
  "nombre": "Juan Perez",
  "correo": "juan@example.com",
  "rol": "cliente"
}
```

### 🏷️ Marcas
```json
{
  "nombre": "Nike",
  "pais": "Estados Unidos"
}
```

### 👗 Prendas
```json
{
  "nombre": "Camiseta Deportiva",
  "marca": "Nike",
  "precio": 25.00,
  "talla": "M",
  "stock": 50
}
```

### 🧾 Ventas
```json
{
  "cliente": "Juan Perez",
  "prenda": "Camiseta Deportiva",
  "cantidad": 2,
  "total": 50.00,
  "fecha": "2026-02-11"
}
```

---

## 🚀 Cómo ejecutar la API

```bash
# 1. Instalar dependencias
pip install flask flask-pymongo flask-cors

# 2. Entrar a la carpeta correcta
cd API/v1

# 3. Ejecutar
python run.py
```

La API quedará disponible en: `http://127.0.0.1:5000`

---

## 🔗 Endpoints — Usuarios

### 1. Obtener todos los usuarios
- **Método:** `GET`
- **URL:** `http://127.0.0.1:5000/tienda/api/v1/usuarios`

**Respuesta:**
```json
[
  { "_id": "abc123", "nombre": "Juan Perez", "correo": "juan@example.com", "rol": "cliente" }
]
```

---

### 2. Obtener usuario por ID
- **Método:** `GET`
- **URL:** `http://127.0.0.1:5000/tienda/api/v1/usuarios?id=<id>`

**Respuesta:**
```json
{ "_id": "abc123", "nombre": "Juan Perez", "correo": "juan@example.com", "rol": "cliente" }
```

---

### 3. Crear usuario
- **Método:** `POST`
- **URL:** `http://127.0.0.1:5000/tienda/api/v1/usuarios`

**Body (JSON):**
```json
{ "nombre": "Maria Lopez", "correo": "maria@example.com", "rol": "cliente" }
```

**Respuesta:**
```json
{ "mensaje": "Usuario creado exitosamente", "id": "abc123" }
```

---

### 4. Actualizar usuario
- **Método:** `PUT`
- **URL:** `http://127.0.0.1:5000/tienda/api/v1/usuarios?id=<id>`

**Body (JSON):**
```json
{ "nombre": "Maria Lopez Actualizada", "rol": "admin" }
```

**Respuesta:**
```json
{ "mensaje": "Usuario actualizado exitosamente" }
```

---

### 5. Eliminar usuario
- **Método:** `DELETE`
- **URL:** `http://127.0.0.1:5000/tienda/api/v1/usuarios?id=<id>`

**Respuesta:**
```json
{ "mensaje": "Usuario eliminado exitosamente" }
```

---

## 🔗 Endpoints — Marcas

### 1. Obtener todas las marcas
- **Método:** `GET`
- **URL:** `http://127.0.0.1:5000/tienda/api/v1/marcas`

**Respuesta:**
```json
[
  { "_id": "abc123", "nombre": "Nike", "pais": "Estados Unidos" }
]
```

---

### 2. Obtener marca por ID
- **Método:** `GET`
- **URL:** `http://127.0.0.1:5000/tienda/api/v1/marcas?id=<id>`

**Respuesta:**
```json
{ "_id": "abc123", "nombre": "Nike", "pais": "Estados Unidos" }
```

---

### 3. Crear marca
- **Método:** `POST`
- **URL:** `http://127.0.0.1:5000/tienda/api/v1/marcas`

**Body (JSON):**
```json
{ "nombre": "Adidas", "pais": "Alemania" }
```

**Respuesta:**
```json
{ "mensaje": "Marca creada exitosamente", "id": "abc123" }
```

---

### 4. Actualizar marca
- **Método:** `PUT`
- **URL:** `http://127.0.0.1:5000/tienda/api/v1/marcas?id=<id>`

**Body (JSON):**
```json
{ "pais": "Alemania Federal" }
```

**Respuesta:**
```json
{ "mensaje": "Marca actualizada exitosamente" }
```

---

### 5. Eliminar marca
- **Método:** `DELETE`
- **URL:** `http://127.0.0.1:5000/tienda/api/v1/marcas?id=<id>`

**Respuesta:**
```json
{ "mensaje": "Marca eliminada exitosamente" }
```

---

## 🔗 Endpoints — Prendas

### 1. Obtener todas las prendas
- **Método:** `GET`
- **URL:** `http://127.0.0.1:5000/tienda/api/v1/prendas`

**Respuesta:**
```json
[
  { "_id": "abc123", "nombre": "Camiseta Deportiva", "marca": "Nike", "precio": 25.00, "talla": "M", "stock": 50 }
]
```

---

### 2. Obtener prenda por ID
- **Método:** `GET`
- **URL:** `http://127.0.0.1:5000/tienda/api/v1/prendas?id=<id>`

**Respuesta:**
```json
{ "_id": "abc123", "nombre": "Camiseta Deportiva", "marca": "Nike", "precio": 25.00, "talla": "M", "stock": 50 }
```

---

### 3. Crear prenda
- **Método:** `POST`
- **URL:** `http://127.0.0.1:5000/tienda/api/v1/prendas`

**Body (JSON):**
```json
{ "nombre": "Pantalon Cargo", "marca": "Adidas", "precio": 40.00, "talla": "32", "stock": 30 }
```

**Respuesta:**
```json
{ "mensaje": "Prenda creada exitosamente", "id": "abc123" }
```

---

### 4. Actualizar prenda
- **Método:** `PUT`
- **URL:** `http://127.0.0.1:5000/tienda/api/v1/prendas?id=<id>`

**Body (JSON):**
```json
{ "precio": 45.00, "stock": 25 }
```

**Respuesta:**
```json
{ "mensaje": "Prenda actualizada exitosamente" }
```

---

### 5. Eliminar prenda
- **Método:** `DELETE`
- **URL:** `http://127.0.0.1:5000/tienda/api/v1/prendas?id=<id>`

**Respuesta:**
```json
{ "mensaje": "Prenda eliminada exitosamente" }
```

---

## 🔗 Endpoints — Ventas

### 1. Obtener todas las ventas
- **Método:** `GET`
- **URL:** `http://127.0.0.1:5000/tienda/api/v1/ventas`

**Respuesta:**
```json
[
  { "_id": "abc123", "cliente": "Juan Perez", "prenda": "Camiseta Deportiva", "cantidad": 1, "total": 25.00 }
]
```

---

### 2. Obtener venta por ID
- **Método:** `GET`
- **URL:** `http://127.0.0.1:5000/tienda/api/v1/ventas?id=<id>`

**Respuesta:**
```json
{ "_id": "abc123", "cliente": "Juan Perez", "prenda": "Camiseta Deportiva", "cantidad": 1, "total": 25.00 }
```

---

### 3. Crear venta
- **Método:** `POST`
- **URL:** `http://127.0.0.1:5000/tienda/api/v1/ventas`

**Body (JSON):**
```json
{ "cliente": "Maria Lopez", "prenda": "Pantalon Cargo", "cantidad": 2, "total": 80.00, "fecha": "2026-02-11" }
```

**Respuesta:**
```json
{ "mensaje": "Venta registrada exitosamente", "id": "abc123" }
```

---

### 4. Actualizar venta
- **Método:** `PUT`
- **URL:** `http://127.0.0.1:5000/tienda/api/v1/ventas?id=<id>`

**Body (JSON):**
```json
{ "estado": "completado" }
```

**Respuesta:**
```json
{ "mensaje": "Venta actualizada exitosamente" }
```

---

### 5. Eliminar venta
- **Método:** `DELETE`
- **URL:** `http://127.0.0.1:5000/tienda/api/v1/ventas?id=<id>`

**Respuesta:**
```json
{ "mensaje": "Venta eliminada exitosamente" }
```

---

## 📊 Reportes

### 1. Marcas con al menos una venta
- **Método:** `GET`
- **URL:** `http://127.0.0.1:5000/tienda/api/v1/reportes/marcas-con-ventas`
- **Descripción:** Lista todas las marcas que tienen al menos una venta registrada, junto con el total de transacciones y unidades vendidas.

**Respuesta:**
```json
[
  { "marca": "Nike", "total_ventas": 3, "cantidad_total": 5 },
  { "marca": "Adidas", "total_ventas": 1, "cantidad_total": 2 }
]
```

---

## 👤 Integrante del Proyecto

- Jhoantan Juarez Meza
