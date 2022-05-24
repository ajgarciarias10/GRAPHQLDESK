import { GraphQLID, GraphQLInt, GraphQLString,GraphQLBoolean, GraphQLScalarType } from "graphql";
import { puestoType } from "../TypeDefs/puesto";
import {puesto} from "../Entities/puesto";
import{messageType} from "../TypeDefs/Message"
export const CREATE_Puesto = {
    type: puestoType,
    args:{
        id_puesto: {type : GraphQLString},
        fecha_de_inicio :  {type:GraphQLString},
        fecha_de_fin :  {type: GraphQLString},
        ocupado : {type:GraphQLBoolean},
        disponibleParcialmente: {type:GraphQLBoolean},
        bloqueado: {type:GraphQLBoolean},
        ciudad: {type:GraphQLString},
        cantidadpuestosx :{type:GraphQLInt},
        cantidadpuestosy : {type:GraphQLInt},
        n_planta: {type:GraphQLString},
        observaciones: {type:GraphQLString},
    },
    async resolve(parent: any, args:any){
        const{id_puesto,fecha_de_inicio,fecha_de_fin,ocupado,disponibleParcialmente,bloqueado,ciudad,cantidadpuestosx,cantidadpuestosy,n_planta,observaciones} = args;
        await puesto.insert({id_puesto,fecha_de_inicio,fecha_de_fin,ocupado,disponibleParcialmente,bloqueado,ciudad,cantidadpuestosx,cantidadpuestosy,n_planta,observaciones});
        return args;
    },
};

export const DELETE_PUESTO = {
    type: puestoType,
    args:{
        id_puesto: {type:GraphQLString}
    },
    async resolve(parent: any, args:any){
        const id_puesto = args.id_puesto;
        await puesto.delete(id_puesto);
        return  {succesful : true, message: "Delete Done"};
    },
};
export const UPDATE_PUESTO = {
    type: puestoType,
    args:{
        id_puesto: {type:GraphQLString},
        ocupado: {type:GraphQLBoolean},
        disponibleParcialmente: {type:GraphQLBoolean},
        bloqueado:{type:GraphQLBoolean},
        fecha_de_inicio:{type:GraphQLString},
        fecha_de_fin:{type:GraphQLString},
        observaciones:{type:GraphQLString}

    },
    async resolve(parent: any, args:any){
        const {id_puesto,ocupado,disponibleParcialmente,bloqueado,fecha_de_inicio,fecha_de_fin,observaciones} = args ;
        const puestos = await puesto.findOne({ where: {id_puesto: id_puesto }});
        if(!puestos){
            throw new Error ("id_puesto: DOESNT EXIST")
        }
        //Actualizo de esta forma ya que solo se puede pasar dos argumentos por actualizacion
        puesto.update({id_puesto : id_puesto},{ocupado : ocupado});
        puesto.update({id_puesto : id_puesto},{disponibleParcialmente : disponibleParcialmente})
        puesto.update({id_puesto : id_puesto},{bloqueado : bloqueado})
        puesto.update({id_puesto : id_puesto}, {fecha_de_inicio : fecha_de_inicio})
        puesto.update({id_puesto : id_puesto}, {fecha_de_fin : fecha_de_fin})
        puesto.update({id_puesto : id_puesto}, {observaciones : observaciones})
        return {succesful: true,message:"PUESTO Actualizado"};

     
    },
}