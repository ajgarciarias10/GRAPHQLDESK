import { GiDesk } from "react-icons/gi";
import styles from './admin_desk.module.css'
import { createSelectable } from 'react-selectable-fast'


const  AdminDesk = ({selectableRef, isSelected, isSelecting,pos_y,pos_x,deskStatus}) => {

    const statusColor = {
      disponible:"green",
      reservado: "red",
      seleccionado:"purple",
      parcialmente:"#E4A503",
      "tu reservado":"blue",
      bloqueado:"gray"
    }
    let displayColor = "";
    if (isSelected ){
        displayColor =  statusColor['bloqueado']
    }else{
        displayColor = statusColor[deskStatus]
    }

    return (
        <div ref={selectableRef}>
           
            <div  className={styles.main_container}style={{position:'absolute',top:(pos_y)+"px",left:(pos_x)+"px"}}>
                <GiDesk className={styles.free_place} style={{color:displayColor}}/>
            </div>
        </div>


    );
}

export default createSelectable(AdminDesk);