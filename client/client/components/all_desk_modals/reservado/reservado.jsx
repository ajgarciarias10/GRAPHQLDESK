import styles from './reservado.module.css';

const Reservado = (props) =>{

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
                    <span className={styles.form_span}>Hora Fin: <label className={styles.form_label}>{props.hora_fin}</label></span>
                </div>
            </div>
        );
}

export default Reservado;