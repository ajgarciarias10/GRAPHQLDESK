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
            cantidadpuestosx
            cantidadpuestosy
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
            cantidadpuestosx
            cantidadpuestosy
    }
}
`
export const cogerPuestosPasandoCiudadYPlanta=   gql`
    query cogerPuestosPasandoCiudadYPlanta($id_puesto:String,$ciudad:String, $n_planta:String){
        cogelPuestosPasandoCiudadYPlanta(id:$id_puesto,ciudad:$ciudad,n_planta:$n_planta){
            id_puesto
            ocupado
            bloqueado
            cantidadpuestosx
            cantidadpuestosy
            disponibleParcialmente
            ciudad
            n_planta
        }
}

`