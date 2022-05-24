import {GraphQLBoolean, GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
export const messageType =  new GraphQLObjectType({
   name:"User",
   fields: () => ({
       succesful : {type : GraphQLBoolean},
       message : {type : GraphQLString}
   })
})
export const messageType2 =  new GraphQLObjectType({
    name:"puesto",
    fields: () => ({
        succesful : {type : GraphQLBoolean},
        message : {type : GraphQLString}
    })
 })