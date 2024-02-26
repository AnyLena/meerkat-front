import { useState,useEffect } from "react";
import Envelope from "../assets/envelope.png";

const Infobox = ({date}) => {

    const [start, setStart] = useState({});
    const [end, setEnd] = useState({});
  
    const convertDate = (timestamp) => {
      const date = new Date(timestamp);
      const day = String(date.getDate()).padStart(2, "0");
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "Oktober",
        "November",
        "December",
      ];
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const weekday = days[date.getDay()];
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
  
      return { day, month, year, weekday, hours, minutes };
    };

    useEffect(() => {
        setStart(convertDate(date.start));
        setEnd(convertDate(date.end));
      }, []);

    return ( 

        <div className="time-infobox">
              <div className="time-date">
                <p className="day">{start.day}</p>
                <p>{start.month}</p>
              </div>
              <div className="time-center">
                <p className="day">{start.weekday}</p>
                <p>
                  {start.hours}:{start.minutes} – {end.hours}:{end.minutes}
                </p>
              </div>
              <div className="time-envelope">
                <img src={Envelope} alt="" />

                <div className="red-circle">
                  <p>10</p>
                </div>
              </div>
            </div>

     );
}
 
export default Infobox;