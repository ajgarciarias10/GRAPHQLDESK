import {GraphQLObjectType,GraphQLID,GraphQLString, GraphQLInt, GraphQLBoolean} from 'graphql'

export const puestoType = new GraphQLObjectType({
    name:"puesto",
    fields: ()=>({
        fecha_de_inicio :  {type: GraphQLString},
        fecha_de_fin :  {type: GraphQLString},
        puestoempresa :  {type: GraphQLString},
        ocupado : {type:GraphQLBoolean},
        disponibleParcialmente: {type:GraphQLBoolean},
        bloqueado: {type:GraphQLBoolean},
        ciudad: {type:GraphQLString},
        n_planta: {type:GraphQLInt},
        observaciones: {type:GraphQLString},

    })
})
