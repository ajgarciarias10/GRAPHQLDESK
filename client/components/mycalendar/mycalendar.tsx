import React, {forwardRef, useEffect,useState} from "react";
import styles from './mycalendar.module.css';

import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";


const  MyCalendar = (props:any) => {
  registerLocale('es', es)

  const [startDate, setStartDate] = useState(new Date());

  function changeDate(date:any){
    date =  date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) ;    
    props.dateChanged(date)
    
  }

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className={styles.custom_input} onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <DatePicker 
      selected={startDate} 
      onChange={(date:Date) => {setStartDate(date); changeDate(date) } } 
      locale="es" 
      dateFormat="dd-MM-yyyy" 
      customInput={<ExampleCustomInput />}
      />
  );
}

export default MyCalendar;