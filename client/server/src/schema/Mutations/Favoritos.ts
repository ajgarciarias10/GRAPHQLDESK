import { GraphQLID, GraphQLInt, GraphQLString,GraphQLBoolean, GraphQLScalarType } from "graphql";
import { FavoritosType } from "../TypeDefs/Favoritos";
import {Favoritos} from "../Entities/Favoritos";
import{messageType} from "../TypeDefs/Message"
export const CREATE_PuestoFav = {
    type: FavoritosType,
    args:{
        id_favorito: {type : GraphQLInt},
        puesto : {type:GraphQLString},
        id_user_fk : {type:GraphQLInt}
    },
    async resolve(parent: any, args:any){
        const{id_favorito,puesto,id_user_fk} = args;
        await Favoritos.insert({id_favorito,puesto,id_user_fk});
        return args;
    },
};

export const DELETE_PUESTOFav = {
    type: FavoritosType,
    args:{
        id_puesto: {type:GraphQLString}
    },
    async resolve(parent: any, args:any){
        const id_puesto = args.id_puesto;
        await Favoritos.delete(id_puesto);
        return  {succesful : true, message: "Delete Done"};
    },
};
export const UPDATE_PUESTOFav = {
    type: FavoritosType,
    args:{
        id_favorito: {type : GraphQLInt},
        puesto : {type:GraphQLString},
        id_user_fk : {type:GraphQLInt}     
    },
    async resolve(parent: any, args:any){
        const {id_favorito,puesto,id_user_fk} = args ;
        const puestos = await Favoritos.findOne({ where: {id_favorito: id_favorito }});
        if(!puestos){
            throw new Error ("id_puesto: DOESNT EXIST")
        }
        //Actualizo de esta forma ya que solo se puede pasar dos argumentos por actualizacion
        Favoritos.update({id_favorito : id_favorito},{puesto : puesto});
        Favoritos.update({id_favorito : id_favorito},{id_user_fk : id_user_fk})
        return {succesful: true,message:"PUESTO FAVORITO Actualizad"};

     
    },
}