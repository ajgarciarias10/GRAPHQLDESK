import styles from './tu_reservado.module.css';
import { useRef,useEffect,useState } from 'react';
import {ApolloClient,InMemoryCache,ApolloProvider,useMutation} from '@apollo/client';
import{UPDATE_PUESTO} from "../../../pages/Graphql/Mutations"
import { UPDATE_USER } from '../../../pages/Graphql/Mutations';
const TuReservado = (props) =>{
    var today = new Date();
    const [actpuesto,{error}] = useMutation(UPDATE_PUESTO);
    const [actuser] = useMutation(UPDATE_USER);
    var t_date =  today.getFullYear() + '-' + ('0' + (today.getMonth()+1)).slice(-2) + '-' + ( '0' + today.getDate()).slice(-2);
    const [date, setDate] = useState(t_date);
    const BtnCancelClicked = () =>{
        console.log("[CANCEL] " +  props.fecha);
        let fechaDeINn = date + " "+ "8:00" +":00" + ".000000" 
        let fechaDeFin = date + " "+ "18:00" +":00" + ".000000"
        actpuesto({
            variables: {id_puesto: props.tableId,
                        ocupado:false,
                        disponibleParcialmente:false,
                        bloqueado:false,
                        fecha_de_inicio:fechaDeINn,
                        fecha_de_fin:fechaDeFin,
                        observaciones: ""
                    }
        })
        actuser({
            variables:{
                id_usuario:4,
                id_puesto_fk: null
            } 

        })

        props.getStatusUpdate('disponible');


    }

        return (
            <div className={styles.main_container}>
                <span className={styles.place_name}>Mesa {props.tableId} {props.building_city} {props.building_floor}</span>
                <div className={styles.status_container}>
                    <div style={{backgroundColor:props.statusColor}} className={styles.status_circle}></div>
                    <label className={styles.status_label}>{props.deskStatus}</label>
                </div>

                <div className={styles.form_container}>
                    <span className={styles.form_span}>Usuario: <label className={styles.form_label}>{props.usuario}</label></span>
                    <span className={styles.form_span}>Solicitante: <label className={styles.form_label}>{props.solicitante}</label></span>
                    <span className={styles.form_span}>Fecha: <label className={styles.form_label}>{props.fecha}</label></span>
                    <span className={styles.form_span}>Hora Inicio: <label className={styles.form_label}>{props.hora_inicio}</label></span>
                    <span className={styles.form_span}>Hora Fin: <label className={styles.form_label}>{props.hora_fin}</label> 
                    <button className={styles.form_button} onClick={() =>  {BtnCancelClicked()}}>Cancelar</button></span>
                </div>
            </div>
        );
}

export default TuReservado;