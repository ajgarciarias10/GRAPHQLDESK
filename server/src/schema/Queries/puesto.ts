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
//No funciona
export const Contar_puestos ={
    type: puestoType,
        args:{
            ciudad:{type:GraphQLString},

        },
        async resolve(parent: any, args:any){
            const ciudad = args.ciudad ;
           return puesto.findAndCountBy({ciudad: ciudad });
            
        }

}
