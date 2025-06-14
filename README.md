# 🛒 Ecommerce Full Stack App

Plataforma de comercio electrónico desarrollada con **Next.js**, **Express**, **MySQL** y **Cloudinary**.

El backend está desplegado en **Render**, mientras que el frontend se encuentra alojado en **Vercel**.

👉 Puedes acceder al proyecto aquí:  
🔗 [https://ecommerce-project-red-psi.vercel.app/](https://ecommerce-project-red-psi.vercel.app/)

---
Favor para acceder a la cuenta administrador favor de colocar:

correo: admin@gmail.com
password: admin
---

## 🚀 Tecnologías Utilizadas

- **Frontend:** Next.js + Tailwind CSS  
- **Backend:** Node.js + Express  
- **Base de datos:** MySQL (Clever Cloud)  
- **Almacenamiento de imágenes:** Cloudinary  
- **Autenticación:** JSON Web Tokens (JWT)  
- **Manejo de estado:** React Context API  

---

## 🧪 Instrucciones para Ejecutar el Proyecto

### Backend
```bash
cd backend
npm install
node server.js

```
### Frontend
```bash
cd frontend
npm install
npm run dev
```
## Deploy
```bash
npm run build
npm run start 

```
##  Detalles de configuración de base de datos (scripts), prueba personal.
CREATE DATABASE IF NOT EXISTS ecommerce;

USE ecommerce;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

