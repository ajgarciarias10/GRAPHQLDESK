import { GraphQLList, GraphQLString } from 'graphql'
import { resolve } from 'path'
import { puesto } from '../Entities/puesto';
import { puestoType } from '../TypeDefs/puesto'
export const GET_ALL_puestos ={
    type: new GraphQLList(puestoType),
    resolve() :Promise<puesto[]>{
        return puesto.find();
    },

}
export const GET_NUMERO_puestos ={
   
    type: puestoType,
    args:{
        ciudad: {type:GraphQLString}
    },
     resolve(parent: any, args:any){
        const ciudad = args.ciudad; 
        return  puesto.query("SELECT COUNT(ciudad) FROM puesto WHERE ciudad ='"+ ciudad+"'");
    },
}