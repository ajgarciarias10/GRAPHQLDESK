import {GraphQLObjectType,GraphQLID,GraphQLString, GraphQLInt} from 'graphql'

export const UserType = new GraphQLObjectType({
    name:"User",
    fields: ()=>({
        id_usuario: {type : GraphQLString},
        nombre :  {type: GraphQLString},
        apellidos :  {type: GraphQLString},
        id_puesto_fk : {type:GraphQLString}
      
    })
})