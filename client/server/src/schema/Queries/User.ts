import { GraphQLList } from 'graphql'
import { resolve } from 'path'
import { User } from '../Entities/User';
import { UserType } from '../TypeDefs/User'
export const GET_ALL_USERS ={
    type: new GraphQLList(UserType),
    resolve() :Promise<User[]>{
        return User.find();
    },

}