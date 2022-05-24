import { GiDesk } from "react-icons/gi";
import styles from './desk.module.css'

import ReactHover, { Trigger, Hover } from "react-hover";
import Disponible from '../all_desk_modals/disponible/disponible';
import Reservado from '../all_desk_modals/reservado/reservado';
import TuReservado from '../all_desk_modals/tu_reservado/tu_reservado';

import ResvForm from "../resv_form/resv_form"
import { useState } from "react";


const  Desk = (props) => {
    const statusColor = {
      disponible:"green",
      reservado: "red",
      seleccionado:"purple",
      parcialmente:"#E4A503",
      "tu reservado":"blue",
      bloqueado:"gray"
    }

    const city_acron = {
        "Barcelona22@":"BAR",
        "GranadaCEPTS": "GRX",
        "MadridOrduña":"MAD",
        "ValenciaSorolla":"VAL",
    }
    
    const options = {
        followCursor: false,
        shiftX: 0,
        shiftY: 0,
    } 

    const [showingForm, setShowingForm] = useState(false)
    const [date, setDate] = useState(props.date);
    const [start_time,setStartTime] = useState(props.start_time);
    const [end_time,setEndTime] = useState(props.end_time);
    const [deskStatus,setDeskStatus] = useState(props.deskStatus);
    const [deskStatusColor, setStatusColor] = useState(statusColor[deskStatus]);

    
    const getDate = (date) =>{
        setDate(date);
    }    
    
    const getShowingForm = (date) =>{
        setShowingForm(date);
    }   

    const getStatusUpdate = (form_deskStatus,form_start_time, form_end_time, form_date) =>{
        setDeskStatus(form_deskStatus);
        setStartTime(form_start_time);
        setEndTime(form_end_time);
        setDate(form_date);
        setStatusColor(statusColor[form_deskStatus]);
    }


    let building_city_acron;

    if(props.building_city){
        building_city_acron = city_acron[(props.building_city).replace(" ","")]
    }

    const renderDeskType = () => {
        if (deskStatus == "disponible") {
    
            return <Disponible deskStatus={deskStatus} statusColor={deskStatusColor = "purple"? "green":deskStatusColor} 
            tableId = {props.tableId} building_city={building_city_acron} building_floor={props.building_floor}/>;

        } else if(deskStatus == "bloqueado"){

            return <Disponible deskStatus={deskStatus} statusColor={deskStatusColor = "purple"? "gray":deskStatusColor} 
            tableId = {props.tableId} building_city={building_city_acron} building_floor={props.building_floor}/>;

        } else if(deskStatus == "reservado"){

            return <Reservado deskStatus={deskStatus} statusColor={deskStatusColor = "purple"? "red":deskStatusColor} 
            tableId = {props.tableId} building_city={building_city_acron} building_floor={props.building_floor}
            usuario={"Eugenio Martín García"} solicitante={"Eugenio Martín García"} fecha={date} 
            hora_inicio={start_time} hora_fin={end_time}/>;

        }else if(deskStatus == "parcialmente"){
            
            return <Reservado deskStatus={deskStatus} statusColor={deskStatusColor = "purple"? "#E4A503":deskStatusColor} 
            tableId = {props.tableId} building_city={building_city_acron} building_floor={props.building_floor}
            usuario={"Eugenio Martín García"} solicitante={"Eugenio Martín García"} fecha={date} 
            hora_inicio={start_time} hora_fin={end_time}/>;
        
        }else if(deskStatus == "tu reservado"){

            return <TuReservado deskStatus={deskStatus} statusColor={deskStatusColor = "purple"? "blue":deskStatusColor} 
            tableId = {props.tableId} building_city={building_city_acron} building_floor={props.building_floor}
            usuario={"Eugenio Martín García"} solicitante={"Eugenio Martín García"} fecha={date} 
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
                    getDate={getDate} showingForm={getShowingForm} user={"Eugenio Martín García"} getStatusUpdate={getStatusUpdate}/>
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