import styles from './places_menu.module.css'
import MyCalendar from '../mycalendar/mycalendar';
import { FaCalendarDay } from "react-icons/fa";
import {ImInfo} from "react-icons/im"

import ModalInfo from '../modal_info/modal_info'
import ReactHover, { Trigger, Hover } from "react-hover";
import { useEffect } from 'react';



const  Places_Form = (props) => {
    let timeData = [
        { value: '08:00', name: '08:00'},
        { value: '08:15', name: '08:15'},
        { value: '08:30', name: '08:30'},
        { value: '08:45', name: '08:45'},
        { value: '09:00', name: '09:00'},
        { value: '09:15', name: '09:15'},
        { value: '09:30', name: '09:30'},
        { value: '09:45', name: '09:45'},   
        { value: '10:00', name: '10:00'},
        { value: '10:15', name: '10:15'},
        { value: '10:30', name: '10:30'},
        { value: '10:45', name: '10:45'},   
        { value: '11:00', name: '11:00'},
        { value: '11:15', name: '11:15'},
        { value: '11:30', name: '11:30'},
        { value: '11:45', name: '11:45'},   
        { value: '12:00', name: '12:00'},
        { value: '12:15', name: '12:15'},
        { value: '12:30', name: '12:30'},
        { value: '12:45', name: '12:45'},   
        { value: '13:00', name: '13:00'},
        { value: '13:15', name: '13:15'},
        { value: '13:30', name: '13:30'},
        { value: '13:45', name: '13:45'},
        { value: '14:00', name: '14:00'},
        { value: '14:15', name: '14:15'},
        { value: '14:30', name: '14:30'},
        { value: '14:45', name: '14:45'},   
        { value: '15:00', name: '15:00'},
        { value: '15:15', name: '15:15'},
        { value: '15:30', name: '15:30'},
        { value: '15:45', name: '15:45'},        
        { value: '16:00', name: '16:00'},
        { value: '16:15', name: '16:15'},
        { value: '16:30', name: '16:30'},
        { value: '16:45', name: '16:45'},   
        { value: '17:00', name: '17:00'},
        { value: '17:15', name: '17:15'},
        { value: '17:30', name: '17:30'},
        { value: '17:45', name: '17:45'},   
        { value: '18:00', name: '18:00'},
        { value: '18:15', name: '18:15'},
        { value: '18:30', name: '18:30'},
        { value: '18:45', name: '18:45'},   
        { value: '19:00', name: '19:00'},
        { value: '19:15', name: '19:15'},
        { value: '19:30', name: '19:30'},
        { value: '19:45', name: '19:45'},
        { value: '20:00', name: '20:00'}
    ];

    var today = new Date();
    var date =  today.getFullYear() + '/' + ('0' + (today.getMonth()+1)).slice(-2) + '/' + ('0' + today.getDate()).slice(-2);

    useEffect(() => {
        props.getPlacesData("Barcelona22@ - Planta 2 - P2_Collserola");
        props.getStartTime("08:00");
        props.getEndTime("18:00");
        props.getDate(date);
    }, [])

    function dataChanged(optionSelected) {
        props.getPlacesData(optionSelected)
    }

    function startTimeChanged(optionSelected){
        props.getStartTime(optionSelected);
    }

    function endTimeChanged(optionSelected){
        props.getEndTime(optionSelected);
    }

    const dateChanged = (optionSelected) =>{
        console.log(optionSelected);
        props.getDate(optionSelected);
    }

    const optionsCursor = {
        followCursor: false,
        shiftX: 100,
        shiftY: 2
    }

    const doCheck = () =>{
        const checkBox = document.getElementById("bloqCheck");
        if(!checkBox.checked){
            checkBox.checked = true;
        }else{
            checkBox.checked = false;
        }
        props.getButtonActive(checkBox.checked);
    }

    return (
        <div className={styles.main_container}>
            <div className={styles.places_container}>
                <label className={styles.places_label}>Seleccione una zona</label>
                <select className={styles.places_selector} id="places_selector" onChange={(e) => dataChanged(e.target.value)}>
                    <option className={styles.places_option}>Barcelona22@ - Planta 2 - P2_Collserola</option>
                    <option className={styles.places_option}>Barcelona 22@ - Planta 3 - P3-Collserola</option>
                    <option className={styles.places_option}>Barcelona 22@ - Planta 4 - P4-Collserola</option>
                    <option className={styles.places_option}>Barcelona 22@ - Planta 7 - P7-Collserola</option>
                    <option className={styles.places_option}>Granada CEPTS - Planta 1 - P1</option>
                    <option className={styles.places_option}>Madrid Orduña - Planta 2 - P2</option>
                    <option className={styles.places_option}>Madrid Orduña - Planta 3 - P3</option>
                    <option className={styles.places_option}>Valencia Sorolla - Planta 10 - P10</option>
                </select>
            </div>

            <div className={styles.datepicker_container}>
                <label className={styles.date_label}>Fecha Reserva</label>
                <div className={styles.calendar_container}>
                    <MyCalendar dateChanged= {dateChanged}/>
                    <FaCalendarDay/>
                </div>
            </div>

            <div className={styles.main_hours_container}>
                <div className={styles.hour_selector_container}>
                    <label className={styles.date_label}>Hora Inicio</label>
                    <select className={styles.places_selector} onChange={(e) => startTimeChanged(e.target.value)}>
                        {timeData.map((e, key) => {
                            return <option key={key} value={e.value}>{e.name}</option>;
                        })}
                    </select>
                </div>

                <label>-</label>

                <div className={styles.hour_selector_container}>
                    <label className={styles.date_label}>Hora Fin</label>
                    <select className={styles.places_selector} defaultValue="18:00" onChange={(e) => endTimeChanged(e.target.value)}>
                        {timeData.map((e, key) => {
                            return <option key={key} value={e.value}>{e.name}</option>;
                        })}
                    </select>
                </div>
            </div>

            {props.isAdmin ?
                <div className={styles.switch_container} onClick={() => {doCheck()}}>  
                    <label className={styles.switch_label}>Activar Bloqueo Puestos</label>

                    <label className={styles.switch}>
                        <input type="checkbox" id='bloqCheck'/>
                        <span className={styles.slider_round}></span>
                    </label>
                </div>
                :
                null
            }
            
            <ReactHover options={optionsCursor}>
                <Trigger type="trigger">
                    <ImInfo className={styles.info_icon}/>
                </Trigger>
                <Hover type="hover">
                    <ModalInfo/>
                </Hover>
            </ReactHover>


        </div>
    );
}

export default Places_Form;