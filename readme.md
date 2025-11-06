# GRAPHQLDESK

Aplicacion didactica para gestionar reservas de puestos (desk sharing) con un backend GraphQL, un frontend Next.js y un microservicio auxiliar en Python que calcula posiciones de escritorios a partir de planos.

---

## Contenido rapido
- [Resumen del sistema](#resumen-del-sistema)
- [Versiones probadas](#versiones-probadas)
- [Requisitos previos](#requisitos-previos)
- [Estructura del repositorio](#estructura-del-repositorio)
- [Configuracion y variables de entorno](#configuracion-y-variables-de-entorno)
- [Puesta en marcha](#puesta-en-marcha)
  - [1. Backend GraphQL (`server`)](#1-backend-graphql-server)
  - [2. Servicio de vision artificial (`client/python`)](#2-servicio-de-vision-artificial-clientpython)
  - [3. Frontend Next.js (`client`)](#3-frontend-nextjs-client)
- [Base de datos de ejemplo](#base-de-datos-de-ejemplo)
- [Comandos utiles](#comandos-utiles)
- [Solucion de problemas](#solucion-de-problemas)
- [Recursos adicionales](#recursos-adicionales)

---

## Resumen del sistema
```
Navegador ──> Next.js (client) ──> GraphQL (server) ──> MySQL
                                    ↑
                                    └─ WebSocket opcional hacia servicio Python que detecta puestos sobre planos SVG/PNG
```

---

## Versiones probadas
Las pruebas mas recientes se realizaron con las siguientes versiones (ajusta si trabajas con otras):

| Componente | Version |
|------------|---------|
| Node.js    | 20.11.1 |
| npm        | 10.3.0  |
| Yarn       | 1.22.22 |
| Next.js    | 16.0.1  |
| React      | 18.2.0  |
| TypeScript | 4.6.x   |
| MySQL      | 8.0.x   |
| Python     | 3.11.x  |

---

## Requisitos previos
- Node.js >= 18 (recomendado 20 LTS) y npm (o Yarn si lo prefieres)
- Python 3.10 o superior con `opencv-python` y `websockets`
- Servidor MySQL o MariaDB (XAMPP funciona)
- Git
- Opcional: cliente GraphQL (Apollo Sandbox, Insomnia, etc.)

---

## Estructura del repositorio
```
GRAPHQLDESK-main/
├─ client/                 # Frontend Next.js + WebSocket cliente
│  ├─ components/          # Componentes React
│  ├─ pages/               # Paginas Next.js y definiciones GraphQL cliente
│  ├─ python/              # Servicio WebSocket (deteccion de puestos)
│  ├─ assets/              # Planos utilizados por el detector
│  └─ .env.local           # Variables de entorno del frontend (no versionado)
├─ server/                 # Backend Express + GraphQL + TypeORM
│  ├─ src/                 # Codigo fuente TypeScript
│  └─ .env                 # Variables del backend (no versionado)
├─ desk_presentacion.pptx  # Presentacion del proyecto
└─ readme.md               # Este documento
```

---

## Configuracion y variables de entorno

### Backend (`server/.env`)
Crear un archivo `.env` tomando como referencia:
```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=reservadepuestos
DB_USER=root
DB_PASS=
```

### Frontend (`client/.env.local`)
```
NEXT_PUBLIC_WS_HOST=localhost
NEXT_PUBLIC_WS_PORT=5050
NEXT_PUBLIC_GRAPHQL_URL=http://127.0.0.1:3001/graphql
```
`NEXT_PUBLIC_WS_*` permite cambiar el host/puerto del WebSocket sin tocar el codigo. Si no ejecutas el servicio Python puedes dejar los valores por defecto.

### Servicio Python (`client/python`)
Puedes exportar las mismas variables antes de lanzar el script, por ejemplo en PowerShell:
$env:WS_HOST="0.0.0.0"
$env:WS_PORT="5050"
python client/python/place_finder.py
```

---

## Puesta en marcha

### 1. Backend GraphQL (`server`)
```powershell
cd server
npm install          # o yarn install
npm run dev          # o yarn dev
```
El servidor quedara escuchando en `http://127.0.0.1:3001/graphql`. Asegurate de que MySQL este levantado y de que la base `reservadepuestos` exista.

### 2. Servicio de vision artificial (`client/python`)
Este paso es opcional pero recomendable si quieres generar automaticamente las posiciones de los puestos a partir de los planos.
```powershell
cd client/python
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install opencv-python websockets
python place_finder.py
```
El script mostrara algo como `[RUNNING ON]0.0.0.0:5050 (local IP 192.168.1.23)`. Esa es la direccion que usara el frontend para abrir el WebSocket.

### 3. Frontend Next.js (`client`)
```powershell
cd client
npm install          # o yarn install
npm run dev          # o yarn dev
```
Por defecto el frontend se sirve en `http://localhost:3000`. Al seleccionar un edificio/planta el cliente intentara abrir el WebSocket; si falla, realizara la carga solo con los datos de GraphQL, por lo que seguira mostrando los puestos utilizando la informacion almacenada en MySQL.

---

## Base de datos de ejemplo
1. Arranca MySQL (por ejemplo desde XAMPP).
2. Crea la base si aun no existe:
   ```sql
   CREATE DATABASE reservadepuestos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
3. Opcional: crea un usuario dedicado.
   ```sql
   CREATE USER 'desk'@'%' IDENTIFIED BY 'desk123';
   GRANT ALL PRIVILEGES ON reservadepuestos.* TO 'desk'@'%';
   FLUSH PRIVILEGES;
   ```
4. TypeORM con `synchronize: true` creara las tablas en el primer arranque. Rellena la tabla `puesto` con los escritorios y sus coordenadas si no vas a usar el servicio Python.

---

## Comandos utiles

| Ubicacion | Comando                | Descripcion                                    |
|-----------|------------------------|------------------------------------------------|
| server    | `npm run dev`          | Arranca GraphQL con nodemon                    |
| server    | `npm run build`        | Compila TypeScript                             |
| server    | `npm start`            | Ejecuta el build compilado                     |
| client    | `npm run dev`          | Levanta Next.js y HMR                          |
| client    | `npm run build`        | Genera build estatico                          |
| client    | `npm run lint`         | Ejecuta ESLint                                 |
| client    | `npm run start`        | Sirve el build generado                        |
| client/python | `python place_finder.py` | Inicia el WebSocket de deteccion         |

---

## Solucion de problemas
- **No se ven los puestos**: confirma que la tabla `puesto` tenga registros para la ciudad/planta seleccionada. Si dependes del servicio Python, verifica que el WebSocket imprime conexiones en consola.
- **`Cannot GET /` en `localhost:3001`**: el backend solo expone `/graphql`; usa esa ruta o prueba con un cliente GraphQL.
- **Errores CORS**: revisa que el frontend apunte a `http://127.0.0.1:3001/graphql` (o la URL que uses) y que el servidor aplique `cors()`.
- **Fallo del WebSocket**: la app seguira funcionando gracias al fallback GraphQL. Ajusta `NEXT_PUBLIC_WS_HOST` si el script Python corre en otra maquina.

---

## Recursos adicionales
- [Presentacion del proyecto (PPTX)](./desk_presentacion.pptx)
- TypeORM: https://typeorm.io
- Documentacion Next.js: https://nextjs.org/docs
- Apollo Client DevTools: https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm

---

## Licencia
Proyecto de uso educativo. Ajusta o agrega un archivo `LICENSE` si deseas aplicar una licencia especifica.
