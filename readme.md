---------------------------------------------------
#Bienvenidos a T-Systems Iberia DeskSharing
---------------------------------------------------

--Requisitos iniciales--
Para la parte del servidor(): 
    Descargar Xampp : https://www.apachefriends.org/es/download.html
    npm install --global yarn
    npm install -g typescript
    CD SEERVER 
    yarn init
    tsc --init
    yarn add typescript ts-node express cors nodemon
    yarn add @types/cors @types/express @types/node
    ------------------------------------------------------------------
    cd server
    RECUERDA EN 
    y yarn dev para iniciar el proyecto
    //Maquina GraphQL iniciada
    http://localhost:3001/GRAPHQL
    Crear dentro de el una BD que se llame : reservadepuestos
    Esto es ya que desde index.ts del server el que no esta dentro del schema se le pasan las entidades que queremos AutoCrear en la base de  datos.
    Y esto se hace accediendo a index.ts y en el apartado de synchronize = true.!!!AVISO IMPORTANTE SOLO PONERLO TRUE PARA CUANDO VAYAIS A CREAR NUEVAS ENTIDADES(TABLAS).
------------------------------------------------------------------    
Videos de GraphQL
    PedroTech Part1 (QUERIES AND INSERT) :https://www.youtube.com/watch?v=fov5e6XJgwc&t=772s
    PedroTech Part2(DELETE AND UPDATE) :https://www.youtube.com/watch?v=mdnQwlxiQ0Q
    PedroTech Part3(CONEXION FRONT Y BACK-ELLOS LO HACEN CON TYPESCRIPT PERO DA IGUAL SE PUEDE CON JAVASCRIPT) :https://www.youtube.com/watch?v=SXNrqCGT6uI  
    PedroTech Part4 :https://www.youtube.com/watch?v=LAFSppcFppE
    //Consultas con argumentos y mas
    PedroTech Part4 :https://www.youtube.com/watch?v=8_DuZHJBB-k
------------------------------------------------------------------
Ademas de todo esto la parte del codigo la tendreis explicada
------------------------------------------------------------------
Parte del cliente():




