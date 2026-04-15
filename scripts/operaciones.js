db = db.getSiblingDB('tienda_ropa');

db.usuarios.insertOne({ nombre: "Juan Perez", correo: "juan@example.com", rol: "cliente" });
db.usuarios.insertMany([
    { nombre: "Maria Lopez", correo: "maria@example.com", rol: "cliente" },
    { nombre: "Carlos Admin", correo: "carlos@tienda.com", rol: "admin" }
]);
db.usuarios.updateOne({ correo: "juan@example.com" }, { $set: { nombre: "Juan Perez Silva" } });
db.usuarios.deleteOne({ correo: "carlos@tienda.com" });

db.marcas.insertOne({ nombre: "Nike", pais: "USA" });
db.marcas.insertMany([
    { nombre: "Adidas", pais: "Alemania" },
    { nombre: "Zara", pais: "España" }
]);
db.marcas.updateOne({ nombre: "Nike" }, { $set: { pais: "Estados Unidos" } });
db.marcas.deleteOne({ nombre: "Zara" });

db.prendas.insertOne({ nombre: "Camiseta", marca: "Nike", precio: 25, talla: "M", stock: 50 });
db.prendas.insertMany([
    { nombre: "Pantalon", marca: "Adidas", precio: 40, talla: "32", stock: 30 },
    { nombre: "Sudadera", marca: "Nike", precio: 60, talla: "L", stock: 20 }
]);
db.prendas.updateOne({ nombre: "Camiseta" }, { $inc: { stock: -1 } });
db.prendas.deleteOne({ nombre: "Sudadera" });

db.ventas.insertOne({ cliente: "Juan Perez", prenda: "Camiseta", cantidad: 1, total: 25, fecha: new Date("2026-02-11") });
db.ventas.insertMany([
    { cliente: "Maria Lopez", prenda: "Pantalon", cantidad: 2, total: 80, fecha: new Date("2026-02-11") },
    { cliente: "Juan Perez", prenda: "Sudadera", cantidad: 1, total: 60, fecha: new Date("2026-02-12") }
]);
db.ventas.updateOne({ total: 25 }, { $set: { estado: "completado" } });
db.ventas.deleteOne({ total: 60 });

db.ventas.aggregate([
    { $match: { fecha: new Date("2026-02-11") } },
    { $group: { _id: "$prenda", totalVendido: { $sum: "$cantidad" } } }
]);
