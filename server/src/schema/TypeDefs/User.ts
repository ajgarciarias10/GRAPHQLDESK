import {GraphQLObjectType,GraphQLID,GraphQLString, GraphQLInt} from 'graphql'

export const UserType = new GraphQLObjectType({
    name:"User",
    fields: ()=>({
        dni: {type : GraphQLString},
        nombre :  {type: GraphQLString},
        apellidos :  {type: GraphQLString},
        puestoempresa :  {type: GraphQLString},
        id_puesto_fk : {type:GraphQLString}
      
    })
})