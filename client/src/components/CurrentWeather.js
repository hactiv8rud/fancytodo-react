import React from 'react';
import axios from '../config/axiosinstance.js';
import getCityName from '../helper/getCityName';
import unixToLocal from '../helper/unixToLocal';
import firstLetterUpperCase from '../helper/firstLetterUpperCase';

function CurrentWeather() {
  const [data, setData] = React.useState({});
  const [fullName, setFullName] = React.useState('');

  function getCurrentWeather() {
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      axios
        .post('/weather', { latitude, longitude }, { headers: { access_token: localStorage.getItem('access_token') } })
        .then(({ data }) => {
          const city = getCityName(data.timezone);
          const date = unixToLocal(data.current.dt)[0];
          const description = firstLetterUpperCase(data.current.weather[0].description);
          const temperature = `${Math.round(data.current.temp)} \xB0C`;
          const wind = `${Math.round(data.current.wind_speed)} m/s`;
          const icon_url = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
          const weatherData = { city, date, description, temperature, wind, icon_url }
          setData(weatherData);
        })
        .catch((err) => {
          console.log(err)
        })
    }
  
    function error() {
      console.log("Unable to retrieve your location")
      // $("#location-status").text('Unable to retrieve your location');
    }
  
    if(!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser")
        // $("#location-status").text("Geolocation is not supported by your browser");
    } else {
        // $("#location-status").text("Locating ...");
        navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  React.useEffect(() => {
    // getCurrentWeather();
    setFullName(localStorage.getItem('fullName'));
  }, [])

  return(
    <>
      <div className="weather-widget-container col custom-border" style={{paddingLeft: 0, paddingRight: 0, maxHeight: "30rem"}}>
        <div className="welcome-container" style={{width: "100%", height: "100%", padding: "1rem"}}>
          <div id="welcome-title">Welcome</div>
          <div className="mt-2" id="user-name">{fullName}</div>
          <div className="weather-content mt-1 custom-border">
            <h1 id="city">{data.city}</h1>
            <p id="current-weather-date">{data.date}</p>
            <div style={{display: "flex"}}>
              <div>
                  <img src={data.icon_url} id="current-weather-icon" className="custom-border"
                      style={{backgroundColor: "white", position: "relative", top: "0.5rem"}} alt="weather icon"/>
              </div>
              <div className="ml-4">
                  <h3 id="current-weather-desc">{data.description}</h3>
                  <p id="current-weather-temp">Temperature: {data.temperature}</p>
                  <p id="current-weather-wind">Wind Speed: {data.wind}</p>
              </div>
            </div>
            <div className="">
              {/* <button type="button" data-toggle="modal" data-target="#hourly-forecast-modal"
                className="btn mt-1" id="get-hourly-forecast"
                style={{backgroundColor: "#b3b3b3", fontWeight: 500, width: "100%"}}>See 48-Hour
                Forecast</button>
              <button type="button" data-toggle="modal" data-target="#daily-forecast-modal" className="btn mt-1" id="get-daily-forecast"
                style={{backgroundColor: "#b3b3b3", fontWeight: 500, width: "100%"}}>See 7-Day
                  Forecast</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CurrentWeather;
