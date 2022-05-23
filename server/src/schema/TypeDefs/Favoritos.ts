import {GraphQLObjectType,GraphQLID,GraphQLString, GraphQLInt} from 'graphql'

export const FavoritosType = new GraphQLObjectType({
    name:"Favoritos",
    fields: ()=>({
        id_favorito: {type : GraphQLInt},
        puesto:{type : GraphQLString},
        id_user_fk : {type:GraphQLString}
    })
})