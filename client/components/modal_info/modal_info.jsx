import React from 'react';
import styles from './modal_info.module.css';

class ModalInfo extends React.Component{
    
      render() {
        return (
          <div className={styles.main_container}>
            <h1 style={{fontSize:'1.3rem'}}>¿Cómo Reservar?</h1>
            <span>1. Seleccione una zona.</span>
            <span>2. Indique una fecha, hora de inicio y fin para refrescar la disponibilidad de los puestos en el plano.</span>
            <span>3. Seleccione un puesto de trabajo libre. En caso de no haberlo, haga clic en puestos con reserva parcial para ver su disponibilidad y adapte la franja de reserva a la disponibilidad del puesto.</span>
            <span>4. Rellene el formulario y haga clic en el botón reservar.</span>
          </div>
        );
      }
}

export default ModalInfo;