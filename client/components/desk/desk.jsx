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
        "MadridOrduña":"MAD",
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

    const renderDeskType = () => {

        if (props.deskStatus == "disponible" || props.deskStatus == "bloqueado") {
    
            return <Disponible deskStatus={props.deskStatus} statusColor={statusColor[props.deskStatus]} 
            tableId = {props.tableId} building_city={building_city_acron} building_floor={props.building_floor}/>;

        } else if(props.deskStatus == "reservado" || props.deskStatus == "parcialmente"){

            return <Reservado deskStatus={props.deskStatus} statusColor={statusColor[props.deskStatus]} 
            tableId = {props.tableId} building_city={building_city_acron} building_floor={props.building_floor}
            usuario={"Eugenio Martín García"} solicitante={"Eugenio Martín García"} fecha={props.date} 
            hora_inicio={props.start_time} hora_fin={props.end_time}/>;

        }else if(props.deskStatus == "tu reservado"){

            return <TuReservado deskStatus={props.deskStatus} statusColor={statusColor[props.deskStatus]} 
            tableId = {props.tableId} building_city={building_city_acron} building_floor={props.building_floor}
            usuario={"Eugenio Martín García"} solicitante={"Eugenio Martín García"} fecha={props.date} 
            hora_inicio={props.start_time} hora_fin={props.end_time}/>;

        }
    }


    const doRenderForm = () =>{
        if(props.deskStatus == "disponible" || props.deskStatus == 'parcialmente'){
            return <GiDesk onMouseEnter={() => {setStatusColor(statusColor['seleccionado'])}} onMouseLeave={() => {setStatusColor(statusColor[props.deskStatus])}}
            className={styles.free_place} style={{color:deskStatusColor}}
            onClick={() => {setShowingForm(true) }}/>
        }else if(props.deskStatus == "bloqueado"){
            return <GiDesk className={styles.free_place} style={{color:deskStatusColor}} />
        }else{
            return <GiDesk className={styles.free_place} style={{color:deskStatusColor}} 
            onMouseEnter={() => {setStatusColor(statusColor['seleccionado'])}} onMouseLeave={() => {setStatusColor(statusColor[props.deskStatus])}}/>
        }
    }
 
    return (
        <div style={{display:'flex',flexWrap:'wrap'}}>
            {showingForm === true && (
                <ResvForm tableId = {props.tableId} building_city={building_city_acron} building_floor={props.building_floor} 
                    getDate={getDate} showingForm={getShowingForm} user={"Eugenio Martín García"}/>
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