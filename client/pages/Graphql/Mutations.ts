import {gql} from '@apollo/client'

export const CREATE_PUESTO =   gql`

    mutation cr_ps(      
                         $id_puesto:String!,
                         $fecha_de_inicio: String!,
                         $fecha_de_fin:String!,
                         $ocupado: Boolean!,
                         $disponibleParcialmente:Boolean!,
                         $bloqueado:Boolean!,
                         $ciudad:String!,
                         $n_planta:String!,
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
export const CREATE_USER =   gql`

    mutation cr_usu(      
                         $dni:String!,
                         $nombre: String!,
                         $apellidos:String!,
                         $puestoempresa: String!,
                         $id_puesto_fk:String!
                         ){
                            cr_usu(
                                dni: $dni,
                                nombre: $nombre,
                                apellidos: $apellidos,
                                puestoempresa: $puestoempresa,
                                id_puesto_fk: $id_puesto_fk
                            )
                            {
                                
                                dni,
                                nombre,
                                puestoempresa

                            }  
                         }
`
export const UPDATE_PUESTO = gql`
  mutation actualizapuesto(
    $id_puesto: String!
    $ocupado: Boolean!
    $disponibleParcialmente: Boolean!
    $bloqueado: Boolean!
    $fecha_de_inicio:String!
    $fecha_de_fin:String!
    $observaciones: String!
  ) {
    actualizapuesto(
        id_puesto: $id_puesto
        ocupado: $ocupado
        disponibleParcialmente: $disponibleParcialmente
        bloqueado: $bloqueado
        fecha_de_inicio: $fecha_de_inicio
        fecha_de_fin: $fecha_de_fin
        observaciones: $observaciones
    ) {
        id_puesto
    }
  }
`;