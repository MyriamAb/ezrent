import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const calendarType = (props) =>
  <Calendar
    onChange={props.onChange}
    value={props.value}
    returnValue={props.returnValue}
    selectRange= {true}
    tileDisabled={props.tileDisabled}
    id={props.id}
    minDate= {new Date()}
    activeStartDate = {props.activeStartDate}
  />


export default calendarType