import {GraphQLObjectType,GraphQLID,GraphQLString, GraphQLInt, GraphQLBoolean} from 'graphql'

export const puestoType = new GraphQLObjectType({
    name:"puesto",
    fields: ()=>({
        id_puesto: {type:GraphQLString},
        fecha_de_inicio :  {type: GraphQLString},
        fecha_de_fin :  {type: GraphQLString},
        ocupado : {type:GraphQLBoolean},
        disponibleParcialmente: {type:GraphQLBoolean},
        bloqueado: {type:GraphQLBoolean},
        cantidadpuestosx:{type:GraphQLInt},
        cantidadpuestosy:{type:GraphQLInt},
        ciudad: {type:GraphQLString},
        n_planta: {type:GraphQLString},
        observaciones: {type:GraphQLString},


    })
})
