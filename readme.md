# GRAPHQLDESK — DeskSharing con GraphQL

> Proyecto didáctico para gestionar la **reserva de puestos** (desk sharing) con **GraphQL** en el backend y un **cliente web** sencillo.

## 📌 Índice

* [Descripción](#descripción)
* [Arquitectura](#arquitectura)
* [Tecnologías](#tecnologías)
* [Requisitos previos](#requisitos-previos)
* [Arranque rápido](#arranque-rápido)

  * [1) Backend `server`](#1-backend-server)
  * [2) Frontend `client`](#2-frontend-client)
* [Configuración de base de datos](#configuración-de-base-de-datos)
* [Variables de entorno](#variables-de-entorno)
* [Scripts útiles](#scripts-útiles)
* [Endpoint y Playground](#endpoint-y-playground)
* [Ejemplos de consultas GraphQL](#ejemplos-de-consultas-graphql)
* [Estructura del repositorio](#estructura-del-repositorio)
* [Referencia y recursos](#referencia-y-recursos)
* [Contribuir](#contribuir)
* [Licencia](#licencia)

---

## Descripción

**GRAPHQLDESK** es una app sencilla para **gestionar reservas de puestos** en una oficina (alta, baja, edición y consulta de reservas y puestos). El objetivo principal es **aprender y practicar** GraphQL + TypeORM con una base de datos MySQL (XAMPP) y un cliente web mínimo para probar el flujo end‑to‑end.

> En el repo hay una presentación de diapositivas: `desk_presentacion.pptx`.

## Arquitectura

```mermaid
flowchart LR
    A[Navegador / Cliente Web] -- HTTP --> B[/API GraphQL/]
    B -- Resolvers --> C[Servicios]
    C -- TypeORM --> D[(MySQL)]
    subgraph Backend (Node.js + TypeScript)
    B
    C
    end
```

## Tecnologías

* **Node.js**, **TypeScript**
* **Express** + **GraphQL** (Apollo Server o similar)
* **TypeORM** (ORM)
* **MySQL** (via **XAMPP**) como motor de BD
* Cliente web con **HTML/CSS/JS** (y/o framework ligero)
* Utilidades: **ts-node**, **nodemon**, **cors**, **yarn**

## Requisitos previos

* **Node.js 18+** y **npm**
* **Yarn** (opcional pero recomendado)
* **XAMPP** (para MySQL/MariaDB) o un servidor MySQL equivalente
* **Git**

## Arranque rápido

Clona el repositorio y entra en él:

```bash
git clone https://github.com/ajgarciarias10/GRAPHQLDESK.git
cd GRAPHQLDESK
```

### 1) Backend `server`

Instala dependencias y configura la BD.

```bash
cd server
# con yarn
yarn install
# o con npm
npm install
```

Crea la BD `reservadepuestos` en MySQL (ver sección de [Configuración de base de datos](#configuración-de-base-de-datos)).

Arranca en desarrollo:

```bash
# con yarn
yarn dev
# o con npm
npm run dev
```

Por defecto el servidor expone GraphQL en **[http://localhost:3001/GRAPHQL](http://localhost:3001/GRAPHQL)**.

> **Nota importante (TypeORM)**: en `DataSource`/`AppDataSource` asegúrate de usar `synchronize: true` **solo** cuando vayas a crear/alterar entidades. En producción debe estar en `false` para evitar cambios no controlados.

### 2) Frontend `client`

En otra terminal:

```bash
cd client
# con yarn
yarn install && yarn dev
# o con npm
npm install && npm run dev
```

Sigue la URL que te muestre el dev‑server (p. ej. `http://localhost:5173/`).

## Configuración de base de datos

1. Abre **XAMPP** y arranca **MySQL**.
2. Crea una BD vacía llamada **`reservadepuestos`**.
3. Ajusta usuario/contraseña en las variables de entorno del backend.

Si necesitas un usuario local típico:

```sql
CREATE DATABASE reservadepuestos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'desk'@'localhost' IDENTIFIED BY 'desk123';
GRANT ALL PRIVILEGES ON reservadepuestos.* TO 'desk'@'localhost';
FLUSH PRIVILEGES;
```

## Variables de entorno

Crea un archivo `.env` en `server/` (o usa tu sistema de variables) con, por ejemplo:

```dotenv
# server/.env
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_NAME=reservadepuestos
DB_USER=desk
DB_PASS=desk123
NODE_ENV=development
```

Ejemplo de configuración TypeORM (pseudo‑código):

```ts
// server/src/config/data-source.ts
import { DataSource } from 'typeorm';
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: false,
});
```

## Scripts útiles

En `server/package.json` (los nombres pueden variar):

* `dev`: inicia el servidor con `nodemon`/`ts-node`.
* `build`: compila TypeScript a JavaScript.
* `start`: ejecuta el build compilado.

En `client/package.json`:

* `dev`: arranca el servidor de desarrollo.
* `build`: genera el build de producción.
* `preview`: sirve el build generado.

## Endpoint y Playground

* **GraphQL**: `http://localhost:3001/GRAPHQL`
* Suele incluir **GraphQL Playground**/**Apollo Sandbox** para probar queries y mutations.

## Ejemplos de consultas GraphQL

> Adapta los nombres a tu *schema* real (p. ej. `Puesto`, `Reserva`, `Usuario`).

**Query: listar puestos disponibles por fecha**

```graphql
query PuestosDisponibles($fecha: String!) {
  puestosDisponibles(fecha: $fecha) {
    id
    nombre
    zona
  }
}
```

**Mutation: crear una reserva**

```graphql
mutation CrearReserva($input: NuevaReservaInput!) {
  crearReserva(input: $input) {
    id
    puesto { id nombre }
    usuario { id nombre }
    fecha
    estado
  }
}
```

Variables de ejemplo:

```json
{
  "input": {
    "puestoId": 12,
    "usuarioId": 5,
    "fecha": "2025-11-03"
  }
}
```

**Mutation: cancelar una reserva**

```graphql
mutation CancelarReserva($id: ID!) {
  cancelarReserva(id: $id) {
    id
    estado
  }
}
```

## Estructura del repositorio

```
GRAPHQLDESK/
├─ client/                  # Cliente web (desarrollo y pruebas)
├─ server/                  # API GraphQL (Express + TypeORM)
├─ desk_presentacion.pptx   # Presentación del proyecto
├─ readme.md                # Este archivo
└─ ...
```

## Referencia y recursos

* **TypeORM docs**: [https://typeorm.io/](https://typeorm.io/)
* Serie de **PedroTech (GraphQL)**:

  * Parte 1 (Queries & Insert)
  * Parte 2 (Delete & Update)
  * Parte 3 (Conexión front/back)
  * Parte 4 (Consultas con argumentos y más)

## Contribuir

Las PRs y sugerencias son bienvenidas. Para cambios grandes, abre primero un *issue* describiendo qué te gustaría modificar.

1. Haz *fork* del repo
2. Crea tu rama: `git checkout -b feature/mi-mejora`
3. *Commit*: `git commit -m "feat: mi mejora"`
4. *Push*: `git push origin feature/mi-mejora`
5. Abre un *pull request*

## Licencia

Este proyecto se distribuye con fines educativos. Añade un archivo `LICENSE` si deseas usar una licencia específica (MIT, Apache‑2.0, etc.).
