//IMPORTAMOS LIBRERIAS
import express from 'express'
import  {graphqlHTTP} from "express-graphql";
import cors from 'cors'
import { createConnection } from 'typeorm';
import { puesto } from './schema/Entities/puesto';
import { schema } from './schema';
import { User } from './schema/Entities/User';



const main = async () => {

    //Create connection 
        //Ponemos await por que es un metodo asincrono
    await createConnection({
        type:"mysql",
        database: "reservadepuestos",
        username: "root",
        password : "",
        logging : true,
        synchronize : false, //Si lo pusieramos en true automaticamente observa y crea entidades como la que hay en el array de debajop
        entities: [User,puesto],


    })
    const app = express()
    //Cors sirve para conectar el front del react a mi backend
    app.use(cors())
    //PARSEAR TODOS LOS JSON DE CADA REQUEST
    app.use(express.json())


    //Aplicar software intermedio de conexion entre apps
    app.use("/graphql",graphqlHTTP({
        schema,
        graphiql:true
    }))
    app.listen(3001,()=>{
        console.log("CORRIENDO EL SERVER SIUU EN 3001")
    })
}
main().catch((err)=>{
    console.log(err);
})