import styles from './disponible.module.css';

const Disponible = (props) =>{

        return (
            <div className={styles.main_container}>
                <span className={styles.place_name}>Mesa {props.tableId} {props.building_city} {props.building_floor}</span>
                <div className={styles.status_container}>
                    <div style={{backgroundColor:props.statusColor}} className={styles.status_circle}></div>
                    <label className={styles.status_label}>{props.deskStatus}</label>
                </div>
            </div>
        );
}

export default Disponible;