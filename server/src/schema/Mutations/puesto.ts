import { GraphQLID, GraphQLInt, GraphQLString,GraphQLBoolean, GraphQLScalarType } from "graphql";
import { puestoType } from "../TypeDefs/puesto";
import {puesto} from "../Entities/puesto";
import{messageType} from "../TypeDefs/Message"
export const CREATE_Puesto = {
    type: puestoType,
    args:{
        id_puesto: {type : GraphQLID},
        fecha_de_inicio :  {type:GraphQLString},
        fecha_de_fin :  {type: GraphQLString},
        puestoempresa :  {type: GraphQLString},
        ocupado : {type:GraphQLBoolean},
        disponibleParcialmente: {type:GraphQLBoolean},
        bloqueado: {type:GraphQLBoolean},
        ciudad: {type:GraphQLString},
        n_planta: {type:GraphQLInt},
        observaciones: {type:GraphQLString},
    },
    async resolve(parent: any, args:any){
        const{id_puesto,fecha_de_inicio,fecha_de_fin,ocupado,disponibleParcialmente,bloqueado,ciudad,n_planta,observaciones} = args;
        await puesto.insert({id_puesto,fecha_de_inicio,fecha_de_fin,ocupado,disponibleParcialmente,bloqueado,ciudad,n_planta,observaciones});
        return args;
    },
};

export const DELETE_PUESTO = {
    type: puestoType,
    args:{
        id_puesto: {type:GraphQLID}
    },
    async resolve(parent: any, args:any){
        const id_puesto = args.id_puesto;
        await puesto.delete(id_puesto);
        return  {succesful : true, message: "Delete Done"};
    },
};