import { GraphQLObjectType,GraphQLSchema } from "graphql";
//Importamos la consulta  y la introducimos de RootQuery que es la "raiz principal para hacer las Queries"
import {GET_ALL_USERS} from "./Queries/User"
import { CREATE_USER } from "./Mutations/User";
import { CREATE_Puesto } from "./Mutations/puesto"; 
import { GET_ALL_puestos } from "./Queries/puesto";
import { GET_NUMERO_puestos } from "./Queries/puesto";
import { DELETE_PUESTO } from "./Mutations/puesto";
import { DELETE_USER } from "./Mutations/User";

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getallusers : GET_ALL_USERS,
        cogerpuestos : GET_ALL_puestos,
        damepuestosiuuu: GET_NUMERO_puestos
    }
    
})
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        cr_usu: CREATE_USER,
        cr_ps: CREATE_Puesto,
        borraPuestoPorId: DELETE_PUESTO,
        borrarusuario: DELETE_USER
    }   
    
})

export const schema = new GraphQLSchema({
    query:  RootQuery,
    mutation: Mutation
})