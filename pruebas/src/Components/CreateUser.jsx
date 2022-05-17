import {useState} from 'react';
import {useMutation} from '@apollo/client'
import{CREATE_PUESTO}  from '../Graphql/Mutations'
function CreateUser(){
    const[createpuesto,{error}] = useMutation(CREATE_PUESTO);
    const [id_puesto,setPuesto] = useState("") 
    const [fecha_de_inicio,setFechaIni] = useState("") 
    const [fecha_de_fin,setFechaFin] = useState("") 
    const [ocupado,setocupado] = useState(false) 
    const [disponibleParcialmente,setdisponibleParcialmente] = useState(false) 
    const [bloqueado,setbloqueado] = useState(true) 
    const [ciudad,setciudad] = useState("") 
    const [n_planta,setn_planta] = useState(0) 
    const [observaciones,setObservaciones] = useState("") 
    return(
        <div className='createUser'>
        <input type="text" placeholder='id_puesto' onChange={(event) => {setPuesto(event?.target.value)}}/>
        <input type="datetime" placeholder='fecha_de_inicio' onChange={(event) => {setFechaIni(event?.target.value)}}/>
        <input type="datetime" placeholder='fecha_de_fin' onChange={(event) => {setFechaFin(event?.target.value)}}/>
        {/* <input type="text" placeholder='ocupado' onChange={(event) => {setocupado(event?.target.value)}}/> */}
        {/* <input type="text" placeholder='disponibleParcialmente' onChange={(event) => {setdisponibleParcialmente(event?.target.value)}}/> */}
        {/* <input type="text" placeholder='bloqueado' onChange={(event) => {setbloqueado(event?.target.value)}}/> */}
        <input type="text" placeholder='ciudad' onChange={(event) => {setciudad(event?.target.value)}}/>
        <input type="number" placeholder='n_planta' onChange={(event) => {setn_planta(parseInt(event?.target.value))}}/>
        <input type="text" placeholder='observaciones' onChange={(event) => {setObservaciones(event?.target.value)}}/>
        <button onClick={()=> 

        {
            createpuesto({
            variables:{ 
                id_puesto: id_puesto, fecha_de_inicio:fecha_de_inicio,fecha_de_fin:fecha_de_fin,
                ocupado:ocupado,disponibleParcialmente:disponibleParcialmente,bloqueado:bloqueado,
                ciudad:ciudad,n_planta:n_planta,observaciones:observaciones},
            });
            }}>

                Me la mamas</button>
    
    </div>
    )
}
export default CreateUser