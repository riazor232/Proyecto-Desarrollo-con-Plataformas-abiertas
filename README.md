# Tienda de Ropa — Proyecto Desarrollo con Plataformas Abiertas

Proyecto universitario desarrollado con **MongoDB**, **Python/Flask** (API REST) y un **front-end HTML/JS/CSS** separado que consume la API mediante Ajax.

---

## Estructura del Repositorio

```
Proyecto-Desarrollo-con-Plataformas-abiertas/
├── API/            ← Backend Flask (API REST)
├── scripts/        ← Scripts de base de datos
├── front-end/      ← Front-end HTML/CSS/JS
└── README.md
```

---

## Parte I — Base de Datos

Base de datos NoSQL en **MongoDB Atlas** (`tienda_ropa`).

### Colecciones

| Colección | Campos principales |
|-----------|-------------------|
| `usuarios` | nombre, correo, contraseña, rol |
| `marcas`   | nombre, pais |
| `prendas`  | nombre, marca, precio, talla, color |
| `ventas`   | prenda, marca, cantidad |

### Scripts
Los scripts de base de datos se encuentran en la carpeta `scripts/`.

---

## Parte II — API REST

API REST construida con **Python + Flask + PyMongo** con CORS habilitado.

### Instalación y Ejecución

```bash
cd API/v1
pip install -r requirements.txt   # Si aplica
python run.py
```

API disponible en: `http://127.0.0.1:5000`

### Endpoints

#### Usuarios — `/tienda/api/v1/usuarios`
| Método | URL | Descripción |
|--------|-----|-------------|
| GET    | `/usuarios` | Obtener todos |
| GET    | `/usuarios?id={id}` | Obtener por ID |
| POST   | `/usuarios` | Crear |
| PUT    | `/usuarios?id={id}` | Actualizar |
| DELETE | `/usuarios?id={id}` | Eliminar |

#### Marcas — `/tienda/api/v1/marcas`
| Método | URL | Descripción |
|--------|-----|-------------|
| GET    | `/marcas` | Obtener todas |
| GET    | `/marcas?id={id}` | Obtener por ID |
| POST   | `/marcas` | Crear |
| PUT    | `/marcas?id={id}` | Actualizar |
| DELETE | `/marcas?id={id}` | Eliminar |

#### Prendas — `/tienda/api/v1/prendas`
| Método | URL | Descripción |
|--------|-----|-------------|
| GET    | `/prendas` | Obtener todas |
| GET    | `/prendas?id={id}` | Obtener por ID |
| POST   | `/prendas` | Crear |
| PUT    | `/prendas?id={id}` | Actualizar |
| DELETE | `/prendas?id={id}` | Eliminar |

#### Ventas — `/tienda/api/v1/ventas`
| Método | URL | Descripción |
|--------|-----|-------------|
| GET    | `/ventas` | Obtener todas |
| GET    | `/ventas?id={id}` | Obtener por ID |
| POST   | `/ventas` | Registrar |
| PUT    | `/ventas?id={id}` | Actualizar |
| DELETE | `/ventas?id={id}` | Eliminar |

#### Reportes — `/tienda/api/v1/reportes`
| Método | URL | Descripción |
|--------|-----|-------------|
| GET    | `/reportes/marcas-con-ventas` | Marcas con mayor volumen de ventas |

---

## Parte III — Front-end

Front-end **completamente separado** de la API, construido con HTML5, CSS3 y JavaScript vanilla con **Ajax (fetch API)**.

### Estructura

```
front-end/
├── index.html      ← Gestión de Prendas (pantalla principal)
├── marcas.html     ← Gestión de Marcas
├── ventas.html     ← Gestión de Ventas
├── css/
│   └── styles.css  ← Estilos (tema oscuro, glassmorphism, Inter font)
└── js/
    ├── api.js      ← Funciones Ajax centralizadas (GET/POST/PUT/DELETE)
    ├── prendas.js  ← CRUD de Prendas
    ├── marcas.js   ← CRUD de Marcas
    └── ventas.js   ← CRUD de Ventas
```

### Cómo usar

1. Asegurarse de que la API esté corriendo en `http://127.0.0.1:5000`
2. Abrir `front-end/index.html` directamente en el navegador

### Funcionalidades

- ✅ Listado de registros en tabla con búsqueda en tiempo real
- ✅ Agregar nuevos registros mediante modal con formulario
- ✅ Editar registros existentes (modal prellenado)
- ✅ Eliminar registros con ventana de confirmación
- ✅ Notificaciones toast de éxito/error tras cada operación
- ✅ Diseño responsive (mobile-first)
- ✅ Todas las peticiones realizadas con Ajax (`fetch` API)
