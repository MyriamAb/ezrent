import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const calendarType = (props) =>
  <Calendar
    onChange={props.onChange}
    value={props.value}
    returnValue={props.returnValue}
    selectRange= {true}
    tileDisabled={props.tileDisabled}
  />


export default calendarType