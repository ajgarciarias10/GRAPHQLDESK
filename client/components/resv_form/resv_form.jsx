import { useRef,useEffect,useState } from 'react';
import {ApolloClient,InMemoryCache,ApolloProvider,useMutation} from '@apollo/client';
import styles from './resv_form.module.css';
import MyCalendar from '../mycalendar/mycalendar';
import { FaCalendarDay } from "react-icons/fa";
import{UPDATE_PUESTO} from "../../pages/Graphql/Mutations"
import { CREATE_USER } from '../../pages/Graphql/Mutations';
import { AiOutlineStar }  from "react-icons/ai";
import { AiFillStar }  from "react-icons/ai";


const ResvForm = (props) =>{
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
    const [actpuesto,{error}] = useMutation(UPDATE_PUESTO);

    const client =  new ApolloClient({
        uri:  'http://127.0.0.1:3001/graphql',
        cache: new InMemoryCache()
    })
    const [cr7] = useMutation(CREATE_USER);

    var today = new Date();
    var t_date =  today.getFullYear() + '-' + ('0' + (today.getMonth()+1)).slice(-2) + '-' + ( '0' + today.getDate()).slice(-2);
    
    const [startTime,setStartTime] = useState("8:00");
    const [endTime,setEndTime] = useState("18:00");
    const [date, setDate] = useState(t_date);
    const [isFavourite,setFavourite] = useState(false);
    

    function formSubmited(){
        
        let fechaDeINn = date + " "+ startTime +":00" + ".000000" 
        let fechaDeFin = date + " "+ endTime +":00" + ".000000"
        

        if(fechaDeINn ==date + " "+ "8:00" +":00" + ".000000" && fechaDeFin == date + " "+ "18:00" +":00" + ".000000"){
            actpuesto({
                variables: {id_puesto: props.tableId,
                            ocupado:true,
                            disponibleParcialmente:false,
                            bloqueado:false,
                            fecha_de_inicio:fechaDeINn,
                            fecha_de_fin:fechaDeFin,
                            observaciones:  document.getElementById('observaciones').value
                        }


            })
            cr7({
                variables: {id_usuario: null,nombre: "Eugenio",apellidos : " Martín García",id_puesto_fk: props.tableId
                },
            }
            )
        }else{
            actpuesto({
                variables: {id_puesto: props.tableId,
                            ocupado:true,
                            disponibleParcialmente:true,
                            bloqueado:false,
                            fecha_de_inicio:fechaDeINn,
                            fecha_de_fin:fechaDeFin,
                            observaciones:document.getElementById('observaciones').value
                        }


            })
            cr7({
                variables: {id_usuario: null,nombre: "Eugenio",apellidos : " Martín García",id_puesto_fk: props.tableId
                },
            }
            )

        }
        props.getStatusUpdate("reservado",date,startTime,endTime)

    }

    const dateChanged = (optionSelected) =>{
        setDate(optionSelected);
        props.getDate(optionSelected);
    }

    const handleKeyEvent = (event) =>{
        if(event.key == 'Escape'){
            props.showingForm(false);
            console.log("data should not be sended");

        }else if(event.key == 'Enter'){
            props.showingForm(false);
            formSubmited()
            console.log("data should be sended");
        }
    }
    const focusDiv = useRef();

    useEffect(() => {
    if(focusDiv.current) focusDiv.current.focus(); 
    }, [focusDiv]);

    return (
        <>    
            <ApolloProvider client={client}>
                <div className={styles.bg_container} ref={focusDiv} tabIndex={0} onKeyUp={(event) => handleKeyEvent(event)}>
                    <div className={styles.form_container}>
                        <label className={styles.form_title}>Mesa {props.tableId} {props.building_city} {props.building_floor} 
                            {isFavourite ? 
                            <AiFillStar className={styles.fav_icon} onClick={() => {setFavourite(false)}} /> 
                            : 
                            <AiOutlineStar className={styles.fav_icon} onClick={() => {setFavourite(true)}} />}
                        </label>
                        
                        <div className={styles.user_input_container}>
                            <label className={styles.user_input_label}>Usuario</label>
                            <input type="text" className={styles.user_input} disabled value={props.user}></input>
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
                                <select className={styles.hour_selector} onChange={(e) => setStartTime(e.target.value)} defaultValue="8:00">
                                    {timeData.map((e, key) => {
                                        return <option key={key} value={e.value}>{e.name}</option>;
                                    })}
                                </select>
                            </div>

                            <label>-</label>

                            <div className={styles.hour_selector_container}>
                                <label className={styles.date_label}>Hora Fin</label>
                                <select className={styles.hour_selector} onChange={(e) => setEndTime(e.target.value)} defaultValue="18:00">
                                    {timeData.map((e, key) => {
                                        return <option key={key} value={e.value}>{e.name}</option>;
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className={styles.textarea_container}>
                            <label className={styles.textarea_label}>Observaciones</label>
                            <textarea className={styles.form_textarea} id='observaciones'></textarea>
                        </div>
                        <div className={styles.buttons_container}>
                            <button className={styles.form_button} onClick={() => 
                                {props.showingForm(false);

                                formSubmited();
                                }
                                }>Reservar</button>
                            <button className={styles.form_button} onClick={() => {props.showingForm(false)}}>Volver</button>
                        </div>

                    </div>
                </div>
            </ApolloProvider>
        </>
    );
}

export default ResvForm;