import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql'
import { resolve } from 'path'
import { idText } from 'typescript';
import { puesto } from '../Entities/puesto';
import { puestoType } from '../TypeDefs/puesto'
export const GET_ALL_puestos ={
    type: new GraphQLList(puestoType),
    resolve() :Promise<puesto[]>{
        return puesto.find();
        
    },

}
export const GET_PuestosState ={
    type: puestoType,
    args:{
        id_puesto: {type:GraphQLString}
    },
    async resolve(_: any, args:any){
       var  result = await puesto.findOneBy({id_puesto: args.id_puesto});
       console.log(result)
       if (!result){
           console.log("No existe")
           return !result
       }else{
            return result
       }
        
    }

}
export const GET_PuestosStateByCiudadYPlanta ={
    type: puestoType,
    args:{
        ciudad: {type:GraphQLString},
        n_planta : {type:GraphQLString},
        id: {type:GraphQLString}
    },
    async resolve(_: any, args:any){
        var  result = await puesto.findOneBy({id_puesto: args.id ,ciudad: args.ciudad , n_planta: args.n_planta});
       console.log(result)

            return result

        
    }

}



