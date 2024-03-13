import axios from "axios";
import { useEffect, useState } from "react";
import { convertDate } from "../utils/convertDate";
import "../styles/weatherforecast.css";
import { getWeatherData } from "../api/weather";

const Weatherforecast = ({ eventData }) => {
  const [weatherData, setWeatherData] = useState({});
  const [weatherDate, setWeatherDate] = useState({});
  const [noWeatherData, setNoWeatherData] = useState("");

  const checkDate = () => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 14);
    const eventDate = new Date(eventData.date.start);

    if (maxDate <= eventDate) {
      setNoWeatherData("future");
    } else if (eventDate < today) {
      setNoWeatherData("past");
    } else {    
        getWeather();
    }
  };

  const getWeather = () => {
    const lat = eventData.location.lat;
    const lng = eventData.location.lng;
    console.log(lat, lng)

    const eventDate = new Date(eventData.date.start);
    const date = `${eventDate.getFullYear()}-${(eventDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${eventDate.getDate().toString().padStart(2, "0")}`;
    const hour = eventDate.getHours();
    if (typeof lat === 'number') {
      getWeatherData(lat, lng, date, hour, setWeatherData);
    }
  };

  useEffect(() => {
    checkDate();
  }, [eventData]);

  useEffect(() => {
    if (Object.keys(weatherData).length > 0) {
      const data = convertDate(weatherData.forecast.forecastday[0].date);
      setWeatherDate(data);
    }
  }, [weatherData]);

  return (
    <>
      {noWeatherData !== "past" ? (
        <section className="weatherforecast">
          <h2 className="event-heading">Weather Forecast</h2>

          {noWeatherData === "future" ? (
            <div className="text">
              The Weather Forecast will be available two weeks before the Event
              starts.
            </div>
          ) : Object.keys(weatherData).length > 0 ? (
            <div className="weather-info">
              <div>
                <p className="temp">
                  {weatherData.forecast.forecastday[0].hour[0].temp_c}°C
                </p>
                <p>
                  {weatherData.forecast.forecastday[0].hour[0].condition.text}
                </p>
              </div>
              <div className="weather-icon">
                <img
                  src={
                    weatherData.forecast.forecastday[0].hour[0].condition.icon
                  }
                />
              </div>
              <div className="weather-info-text">
                <p>
                  {weatherDate.day} {weatherDate.month} {weatherDate.year},{" "}
                  {
                    weatherData.forecast.forecastday[0].hour[0].time.split(
                      " "
                    )[1]
                  }
                </p>
                <p>{weatherData.location.name}</p>
                <p>
                  Chance of Rain:{" "}
                  {weatherData.forecast.forecastday[0].hour[0].chance_of_rain}%
                </p>
              </div>
            </div>
          ) : null}
        </section>
      ) : null}
    </>
  );
};

export default Weatherforecast;
