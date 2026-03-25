# 🛒 Super-Wow

Sistema de supermercado inteligente que permite agregar productos a un carrito, generar facturas y calcular totales automáticamente.

---

## 📊 Modelo Entidad-Relación

![Modelo ER](DIAGRAMA_SUPERMERCADO.png)

---

## 📸 Evidencia del funcionamiento

### Interfaz del sistema
![Interfaz](INTERFAZ.png)

### Carrito de compras
![Carrito](CARRITO.png)

### Factura generada
![Factura](FACTURA.png)

### 🗄️ Base de datos en MySQL
![Base de datos](SQL1.png)



## 🗄️ Vista en MySQL

![Vista](SQL2.png)



## 🧠 Descripción del Sistema

El sistema permite:

- Agregar productos al carrito
- Modificar cantidades
- Eliminar productos
- Generar factura
- Descargar factura en PDF

---

## 🗂️ Base de Datos

El sistema utiliza MySQL con las siguientes tablas:

- clientes
- productos
- facturas
- detalle_factura

---

## 📘 Diccionario de Datos

### 🧾 Tabla: clientes

| Campo       | Tipo           | Descripción              |
|------------|---------------|--------------------------|
| id_cliente | INT (PK)      | Identificador único      |
| nombre     | VARCHAR(100)  | Nombre del cliente       |
| direccion  | VARCHAR(150)  | Dirección del cliente    |

---

### 🛒 Tabla: productos

| Campo        | Tipo           | Descripción              |
|-------------|---------------|--------------------------|
| id_producto | INT (PK)      | Identificador único      |
| nombre      | VARCHAR(100)  | Nombre del producto      |
| precio      | DECIMAL(10,2) | Precio del producto      |
| imagen      | VARCHAR(255)  | Ruta de la imagen        |

---

### 🧾 Tabla: facturas

| Campo       | Tipo           | Descripción              |
|------------|---------------|--------------------------|
| id_factura | INT (PK)      | Identificador de factura |
| id_cliente | INT (FK)      | Cliente asociado         |
| fecha      | DATETIME      | Fecha de compra          |
| total      | DECIMAL(10,2) | Total de la factura      |

---

### 📦 Tabla: detalle_factura

| Campo        | Tipo           | Descripción              |
|-------------|---------------|--------------------------|
| id_detalle  | INT (PK)      | Identificador            |
| id_factura  | INT (FK)      | Factura asociada         |
| id_producto | INT (FK)      | Producto                 |
| cantidad    | INT           | Cantidad comprada        |
| subtotal    | DECIMAL(10,2) | Precio por cantidad      |
---

## ⚙️ Tecnologías usadas

- HTML
- CSS
- JavaScript
- MySQL

---

## 🚀 Cómo ejecutar el proyecto

1. Clonar el repositorio
2. Abrir el archivo index.html en el navegador
3. (Opcional) configurar base de datos en MySQL

---
