import { GraphQLObjectType,GraphQLSchema } from "graphql";
//Importamos la consulta  y la introducimos de RootQuery que es la "raiz principal para hacer las Queries"
import {GET_ALL_USERS} from "./Queries/User";
import { GET_ALL_puestos, GET_PuestosState } from "./Queries/puesto";
import {GET_ALL_Favoritos} from "./Queries/Favoritos";
import {FavoritosState} from "./Queries/Favoritos";
import { CREATE_USER } from "./Mutations/User";
import { DELETE_USER } from "./Mutations/User";
import { UPDATE_USER } from "./Mutations/User";
import { CREATE_Puesto } from "./Mutations/puesto"; 
import { DELETE_PUESTO } from "./Mutations/puesto";
import{UPDATE_PUESTO} from "./Mutations/puesto";
import{CREATE_PuestoFav} from "./Mutations/Favoritos";
import{DELETE_PUESTOFav} from "./Mutations/Favoritos";
import{UPDATE_PUESTOFav} from "./Mutations/Favoritos";


import{GET_PuestosStateByCiudadYPlanta} from  "./Queries/puesto";
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getallusers : GET_ALL_USERS,
        cogerpuestos : GET_ALL_puestos,
        cogerPuestosPasandoId: GET_PuestosState,
        cogelPuestosPasandoCiudadYPlanta : GET_PuestosStateByCiudadYPlanta,
        cogelTodosLosFavolitos : GET_ALL_Favoritos,
        cogelFavsPornUser : FavoritosState
    }
    
})
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        cr_usu: CREATE_USER,
        cr_ps: CREATE_Puesto,
        cr_fv: CREATE_PuestoFav,
        borraPuestoPorId: DELETE_PUESTO,
        borraPuestoFavPorId: DELETE_PUESTOFav,
        borrarusuario: DELETE_USER,
        actualizapuesto:UPDATE_PUESTO,
        actualizaEmpleado: UPDATE_USER,
        actualizapuestoFav: UPDATE_PUESTOFav,
        
    }   
    
})

export const schema = new GraphQLSchema({
    query:  RootQuery,
    mutation: Mutation
})