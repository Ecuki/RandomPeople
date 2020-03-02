import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureLow,
  faTemperatureHigh,
  faChevronCircleDown,
  faChevronCircleUp
} from "@fortawesome/free-solid-svg-icons";

function selectTemperatureIcon(props) {
  const { temp } = props;
  const icon = temp > 0 ? faTemperatureHigh : faTemperatureLow;
  return (
    <FontAwesomeIcon icon={icon} className="temperature__icon" size="1x" />
  );
}
function showTemperature(props) {
  const temp = props.feels_like;

  return (
    <>
      <span className="temperature__value">{temp}</span>
      {selectTemperatureIcon(parseInt(temp))}
      <span className="temperature__symbol"> C</span>
    </>
  );
}

function WeatherElement(props) {
  const { text, type, callback } = props;
  const className = "weather__element";
  return (
    <div className={`${className} ${type}`}>
      <p className={`${className}-text`}>{text}</p>
      {callback}
    </div>
  );
}

function showClouds(icon, clouds) {
  const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
  return (
    <>
      <span className="clouds__value">{clouds} %</span>
      <img className="clouds__icon" src={iconUrl} alt="" />
    </>
  );
}
function getTime(t) {
  const time = new Date(t);
  const hms = time.toLocaleTimeString();
  return hms;
}
function SunIcon(props) {
  const { position } = props;
  const icon = position === "sunrise" ? faChevronCircleUp : faChevronCircleDown;
  return <FontAwesomeIcon icon={icon} size="1x" />;
}

function showSunTime(sys, position) {
  const time = getTime(sys[position]);
  return (
    <>
      <span className="time__value">{time}</span>
      <span className="time__icon">
        <SunIcon position={position} />
      </span>
    </>
  );
}

export const Weather = ({ data, isLoanding, error }) => {
  if (!data) {
    return <p>Brak danych</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  if (isLoanding) {
    return <p>Loading</p>;
  }
  const { main, weather, clouds, sys } = data;

  return (
    <div className="weather section" id="weather">
      <h1 className="weather__title">Weather:</h1>
      <WeatherElement
        type="temperature"
        text="This temperature parameter accounts for the human perception of
          weather."
        callback={showTemperature(main)}
      />
      <WeatherElement
        type="clouds"
        text="Cloudiness"
        callback={showClouds(weather[0].icon, clouds.all)}
      />
      <WeatherElement
        type="sun"
        text="Sunrise time"
        callback={showSunTime(sys, "sunrise")}
      />
      <WeatherElement
        type="sun"
        text="Sunset time"
        callback={showSunTime(sys, "sunset")}
      />
    </div>
  );
};
