import React from 'react';

const WeatherCard = (props) => {

    let icon = "";
    switch(props.weather){
        case "Clouds":
            icon = "http://openweathermap.org/img/w/04n.png";;
        break;
        case "Rain":
            icon = "http://openweathermap.org/img/w/09d.png";;
        break;
        case "Snow":
            icon = "http://openweathermap.org/img/w/13d.png";;
        break;
        case "Clear":
            icon = "http://openweathermap.org/img/w/01d.png";
        break;
        default:
            icon = "http://openweathermap.org/img/w/01d.png";
        break;
    }

    console.log(props)
    return(
        <div className="weather-card">
            <h5>{props.date}</h5>
            <div className="img-container"><img alt="" src={`${icon}`}/></div>
            <div className="temps-container">
                <p className="high-limit"><strong>{Math.floor(300 - props.max)}&deg;C</strong></p>
                <p className="low-limit">{Math.floor(300 - props.min)}&deg;C</p>
            </div>
        </div>
    )
}

export default WeatherCard;