import { GraphQLList, GraphQLString } from 'graphql'
import { resolve } from 'path'
import { Favoritos } from '../Entities/Favoritos';
import { FavoritosType } from '../TypeDefs/Favoritos'
export const GET_ALL_Favoritos ={
    type: new GraphQLList(FavoritosType),
    resolve() :Promise<Favoritos[]>{
        return Favoritos.find();
    },

}
export const FavoritosState ={
    type: FavoritosType,
    args:{
        id_user_fk: {type:GraphQLString}
    },
    async resolve(_: any, args:any){
       var  result = await Favoritos.findOneBy({id_user_fk: args.id_user_fk});
       console.log(result)
       if (!result){
           console.log("No existe")
           return !result
       }else{
            return result
       }
        
    }

}