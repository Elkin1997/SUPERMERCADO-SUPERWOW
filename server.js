const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const config = {
    user: 'sa',
    password: '123456',
    server: 'localhost',
    database: 'superwow',
    options: {
        trustServerCertificate: true
    }
};

sql.connect(config)
    .then(() => console.log("✅ Conectado a SQL Server"))
    .catch(err => console.log(err));

app.get('/productos', async (req, res) => {
    try {
        const result = await sql.query("SELECT * FROM productos");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.delete('/productos/:id', async (req, res) => {
    try {
        await sql.query(`DELETE FROM productos WHERE id_producto = ${req.params.id}`);
        res.send("Eliminado");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/factura', async (req, res) => {
    const { cliente, direccion, carrito } = req.body;

    try {
        // 1. Insertar cliente
        const clienteResult = await sql.query(`
            INSERT INTO clientes (nombre, direccion)
            OUTPUT INSERTED.id_cliente
            VALUES ('${cliente}', '${direccion}')
        `);

        const id_cliente = clienteResult.recordset[0].id_cliente;

        // 2. Insertar factura
        const facturaResult = await sql.query(`
            INSERT INTO facturas (id_cliente, fecha, total)
            OUTPUT INSERTED.id_factura
            VALUES (${id_cliente}, GETDATE(), 0)
        `);

        const id_factura = facturaResult.recordset[0].id_factura;

        let total = 0;

       for (let item of carrito) {
    const precio = item.price;
    const cantidad = item.qty;
    const subtotal = precio * cantidad;

    total += subtotal;

    //  como no tienes id_producto, usamos 1 temporal
    await sql.query(`
        INSERT INTO detalle_factura (id_factura, id_producto, cantidad, subtotal)
        VALUES (${id_factura}, 1, ${cantidad}, ${subtotal})
    `);
}
        // 4. Actualizar total
        await sql.query(`
            UPDATE facturas SET total = ${total} WHERE id_factura = ${id_factura}
        `);

        res.send("Factura guardada");
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

app.post('/factura', async (req, res) => {
    console.log("🔥 LLEGÓ AL BACKEND");
    console.log(req.body);

    res.send("OK BACKEND");
});

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});