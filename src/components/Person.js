import React from "react";
import { Weather } from "./Weather";
import MyChart from "./Chart";
import MyMap from "./Map";

const weatherAPI = `http://api.openweathermap.org/data/2.5/weather?`;
const weatherAPIKey = "0c6e3f6176d2671fba28c518a4811850";

function Image(props) {
  const { img, alt } = props;
  const bgiStyles = {
    backgroundImage: `url(${img})`
  };

  return (
    <div className="img">
      <div className="img__background" style={bgiStyles}></div>
      <img className="img__image" src={img} alt={alt} />
    </div>
  );
}

function Button(props) {
  const { onClick, text, className } = props;
  return (
    <button className={className} onClick={e => onClick(e)}>
      {text}
    </button>
  );
}

function Element(props) {
  return <span className={props.className}>{props.text}</span>;
}
function NamesDetails(props) {
  const names = props.names;
  let listNames = [];

  for (const name in names) {
    listNames.push(
      <Element key={name} className={`name__element`} text={names[name]} />
    );
  }
  return <div className="names">{listNames}</div>;
}

function getWeatherAPI(coordinates) {
  const API = `${weatherAPI}lat=${parseInt(
    coordinates.latitude
  )}&lon=${parseInt(
    coordinates.longitude
  )}&appid=${weatherAPIKey}&units=metric`;
  return API;
}

function Property(props) {
  const { type, className, value } = props;
  return (
    <div className={className}>
      <Element className={`${className + "-" + type}`} text={`${type}:`} />
      <Element className={`${className + "-" + type}`} text={value} />
    </div>
  );
}
function Contacts(props) {
  const contacts = props;
  return <ElementList elements={contacts} className="contact" />;
}
function ElementList(props) {
  const { elements, className } = props;
  const elementsList = [];
  for (const element in elements) {
    const value = elements[element];
    elementsList.push(
      <Property
        key={value}
        type={element}
        value={value}
        className={`${className}__element`}
      />
    );
  }
  return <div className={`${className}`}>{elementsList}</div>;
}
function Address(props) {
  const { street, city, state, country, postcode } = props.location;
  const addressElements = {
    street: `${street.number} ${street.name}`,
    city,
    state,
    postcode,
    country
  };

  return <ElementList elements={addressElements} className="address" />;
}
export const Person = ({
  data,
  isLoanding,
  error,
  getRandomData,
  withFetching
}) => {
  if (!data) {
    return <p>Brak danych</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  if (isLoanding) {
    return <p>Loading</p>;
  }
  const getRandomPerson = e => {
    e.preventDefault();
    getRandomData();
  };
  const { name, email, phone, picture, location } = data.results[0];
  const WeatherWithFetching = withFetching(getWeatherAPI(location.coordinates))(
    Weather
  );

  return (
    <>
      <div className="person">
        <Image img={picture.large} alt="Random person" />
        <Button
          onClick={getRandomPerson}
          text={"Random"}
          className="random__btn btn"
        />
        <NamesDetails names={name} />
        <Contacts email={email} phone={phone} />
        <Address location={location} />
      </div>
      <WeatherWithFetching />
      <MyChart />
      <MyMap coordinates={location.coordinates} />
    </>
  );
};
