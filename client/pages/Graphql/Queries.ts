import {gql} from '@apollo/client'
export const cogerPuestos=   gql`
    query cogerpuestos($id_puesto:String) {
        cogerpuestos{
            id_puesto
            ocupado
            bloqueado
            disponibleParcialmente
            fecha_de_inicio
            ciudad
            n_planta
            observaciones
    }
}
`
export const cogerPuestosPasandoId=   gql`
    query cogerPuestosPasandoId($id_puesto:String) {
        cogerPuestosPasandoId{
            ocupado
            bloqueado
            disponibleParcialmente
            fecha_de_inicio
    }
}
`