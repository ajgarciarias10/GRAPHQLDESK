import { GraphQLID, GraphQLInt, GraphQLString } from "graphql";
import { UserType } from "../TypeDefs/User";
import { User } from "../Entities/User";
import{messageType} from "../TypeDefs/Message"
//METODO CREAR USUARIO
export const CREATE_USER = {
    type: UserType,
    args:{
        id_usuario: {type : GraphQLInt},
        nombre: {type:GraphQLString},
        apellidos : {type:GraphQLString},
        id_puesto_fk : {type:GraphQLString},
    },
    async resolve(parent: any, args:any){
        const{id_usuario,nombre,apellidos,id_puesto_fk} = args;
        await User.insert({id_usuario,nombre,apellidos,id_puesto_fk});
        return args;
    },
    
};
//METODO DELETE
export const DELETE_USER = {
    type: UserType,
    args:{
        id_usuario: {type:GraphQLInt}
    },
    async resolve(parent: any, args:any){
        const id_usuario = args.id_usuario;
        await User.delete(id_usuario);
        return  {succesful : true, message: "Delete Done"};
    },
};
export const UPDATE_USER = {
    type: UserType,
    args:{
        id_usuario: {type : GraphQLInt},
        nombre: {type:GraphQLString},
        apellidos : {type:GraphQLString},
        id_puesto_fk : {type:GraphQLString},

    },
    async resolve(parent: any, args:any){
        const {id_usuario,nombre,apellidos,id_puesto_fk} = args ;
        const puestos = await User.findOne({ where: {id_usuario: id_usuario }});
        if(!puestos){
            throw new Error ("id_puesto: DOESNT EXIST")
        }
        //Actualizo de esta forma ya que solo se puede pasar dos argumentos por actualizacion
        User.update({id_usuario : id_usuario},{id_puesto_fk : id_puesto_fk});

        return {succesful: true,message:"Puesto actualizado"};

     
    }
}
