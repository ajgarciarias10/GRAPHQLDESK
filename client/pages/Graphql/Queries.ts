import {gql} from '@apollo/client'
export  const  cogerPuestos=   gql`
    query cogerpuestos{
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
export const cogerPuestosPasandoCiudadYPlanta=   gql`
    query cogerPuestosPasandoCiudadYPlanta($id_puesto:String,$ciudad:String, $n_planta:String){
        cogelPuestosPasandoCiudadYPlanta(id:$id_puesto,ciudad:$ciudad,n_planta:$n_planta){
            id_puesto
            ocupado
            bloqueado
            disponibleParcialmente
            ciudad
            n_planta
        }
}

`