import {gql} from '@apollo/client'

export const CREATE_PUESTO =   gql`

    mutation cr_ps(      
                         $id_puesto:ID!,
                         $fecha_de_inicio: String!,
                         $fecha_de_fin:String!,
                         $ocupado: Boolean!,
                         $disponibleParcialmente:Boolean!,
                         $bloqueado:Boolean!,
                         $ciudad:String!,
                         $n_planta:Int!,
                         $observaciones: String! 
                         ){
                            cr_ps(
                                id_puesto: $id_puesto,
                                fecha_de_inicio: $fecha_de_inicio,
                                fecha_de_fin: $fecha_de_fin,
                                ocupado: $ocupado,
                                disponibleParcialmente: $disponibleParcialmente,
                                bloqueado: $bloqueado,
                                ciudad: $ciudad,
                                n_planta: $n_planta,
                                observaciones: $observaciones
                            ) 
                            {
                                
                                ciudad

                            }  
                         }
`