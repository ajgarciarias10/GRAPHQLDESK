import { GraphQLID, GraphQLInt, GraphQLString } from "graphql";
import { UserType } from "../TypeDefs/User";
import { User } from "../Entities/User";
import{messageType} from "../TypeDefs/Message"
//METODO CREAR USUARIO
export const CREATE_USER = {
    type: UserType,
    args:{
        dni: {type : GraphQLString},
        nombre: {type:GraphQLString},
        apellidos : {type:GraphQLString},
        puestoempresa : {type:GraphQLString},
        id_puesto_fk : {type:GraphQLInt},
    },
    async resolve(parent: any, args:any){
        const{dni,nombre,apellidos,puestoempresa,id_puesto_fk} = args;
        await User.insert({dni,nombre,apellidos,puestoempresa,id_puesto_fk});
        return args;
    },
    
};
//METODO DELETE
export const DELETE_USER = {
    type: UserType,
    args:{
        dni: {type:GraphQLID}
    },
    async resolve(parent: any, args:any){
        const dni = args.dni;
        await User.delete(dni);
        return  {succesful : true, message: "Delete Done"};
    },
};
