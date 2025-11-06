import { GiDesk } from "react-icons/gi";
import styles from './desk.module.css'

import ReactHover, { Trigger, Hover } from "react-hover";
import Disponible from '../all_desk_modals/disponible/disponible';
import Reservado from '../all_desk_modals/reservado/reservado';
import TuReservado from '../all_desk_modals/tu_reservado/tu_reservado';

import ResvForm from "../resv_form/resv_form"
import { useState } from "react";


const  Desk = (props) => {
    const [showingForm, setShowingForm] = useState(false)
    const [date, setDate] = useState();
    const [deskStatus,setDeskStatus] = useState(props.deskStatus);
    const [start_time, setStartTime] = useState(props.start_time);
    const [end_time, setEndTime] = useState(props.end_time);


    
    const getDate = (date) =>{
        setDate(date);
    }    
    
    const getShowingForm = (date) =>{
        setShowingForm(date);
    }   

    const statusColor = {
      disponible:"green",
      reservado: "red",
      seleccionado:"purple",
      parcialmente:"#E4A503",
      "tu reservado":"blue",
      bloqueado:"gray"
    }
    const [deskStatusColor, setStatusColor] = useState(statusColor[props.deskStatus])


    const city_acron = {
        "Barcelona22@":"BAR",
        "GranadaCEPTS": "GRX",
        "MadridOrduÃ±a":"MAD",
        "ValenciaSorolla":"VAL",
    }
    
    const options = {
        followCursor: false,
        shiftX: 0,
        shiftY: 0,
    }  

    let building_city_acron;

    if(props.building_city){
        building_city_acron = city_acron[(props.building_city).replace(" ","")]
    }

    const getPlacesStatus = (childDeskStatus,formDate,formStartTime,formEndTime) => {
        setDeskStatus(childDeskStatus);
        setDate(formDate);
        setStartTime(formStartTime);
        setEndTime(formEndTime);
        setStatusColor(statusColor[childDeskStatus]);
        console.log(childDeskStatus);
    }

    const renderDeskType = () => {

        if (deskStatus == "disponible" || deskStatus == "bloqueado") {
            return <Disponible deskStatus={deskStatus} statusColor={statusColor[deskStatus]} 
            tableId = {props.tableId} building_city={building_city_acron} building_floor={props.building_floor}/>;

        } else if(deskStatus == "reservado" || deskStatus == "parcialmente"){

            return <Reservado deskStatus={deskStatus} statusColor={statusColor[deskStatus]} 
            tableId = {props.tableId} building_city={building_city_acron} building_floor={props.building_floor}
            usuario={"Eugenio MartÃ­n GarcÃ­a"} solicitante={"Eugenio MartÃ­n GarcÃ­a"} fecha={date} 
            hora_inicio={start_time} hora_fin={end_time}/>;

        }else if(deskStatus == "tu reservado"){

            return <TuReservado deskStatus={deskStatus} statusColor={statusColor[deskStatus]} 
            tableId = {props.tableId} building_city={building_city_acron} building_floor={props.building_floor}
            usuario={"Eugenio MartÃ­n GarcÃ­a"} solicitante={"Eugenio MartÃ­n GarcÃ­a"} fecha={date} 
            hora_inicio={start_time} hora_fin={end_time}/>;

        }
    }


    const doRenderForm = () =>{
        if(deskStatus == "disponible" || deskStatus == 'parcialmente'){
            return <GiDesk onMouseEnter={() => {setStatusColor(statusColor['seleccionado'])}} onMouseLeave={() => {setStatusColor(statusColor[deskStatus])}}
            className={styles.free_place} style={{color:deskStatusColor}}
            onClick={() => {setShowingForm(true) }}/>
        }else if(deskStatus == "bloqueado"){
            return <GiDesk className={styles.free_place} style={{color:deskStatusColor}} />
        }else{
            return <GiDesk className={styles.free_place} style={{color:deskStatusColor}} 
            onMouseEnter={() => {setStatusColor(statusColor['seleccionado'])}} onMouseLeave={() => {setStatusColor(statusColor[deskStatus])}}/>
        }
    }
 
    return (
        <div style={{display:'flex',flexWrap:'wrap'}}>
            {showingForm === true && (
                <ResvForm tableId = {props.tableId} building_city={building_city_acron} building_floor={props.building_floor} 
                    getDate={getDate} showingForm={getShowingForm} getPlacesStatus={getPlacesStatus} user={"Eugenio MartÃ­n GarcÃ­a"}/>
            )}
            
            <div className={styles.main_container}style={{position:'absolute',top:(props.pos_y)+"px",left:(props.pos_x)+"px"}}>
                <ReactHover options={options} >
                    <Trigger type="trigger">
                        {doRenderForm()}
                    </Trigger>

                    <Hover type="hover">
                        <div className={styles.floating_container}>
                            {renderDeskType()}                  
                        </div>

                    </Hover>
                </ReactHover>
            </div>
        </div>


    );
}

export default Desk;





