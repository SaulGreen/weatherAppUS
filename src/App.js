import React from 'react';
import './App.scss';

import Form from '../src/FormComponent/form'
import WeatherCard from '../src/WeatherCardComponent/weatherCard'

const WEATHER_KEY = '9cbdd640cd0c631f691fa03d577222ba';

class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      foreCasts: []
    }
  }

  getWeatherConditions = async (params) => {
    return await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${params.city},${params.country}&mode=json&appid=${WEATHER_KEY}`
      ,{})
      .then((response) => response.json())
      .then((rsp) => {

        let currentDate = new Date();
        let nextDays = new Date(currentDate);
        nextDays.setDate(nextDays.getDate());

        let foreCasts = [];

        for(let i = 0; i < rsp.list.length; ++i){ 
          let tempDate = new Date(1000*rsp.list[i].dt);

          if(nextDays.getDate() === tempDate.getDate()){
            foreCasts.push(rsp.list[i]);
            nextDays.setDate(nextDays.getDate() + 1);
          }
        }

        //console.log(foreCasts)

        return foreCasts;
      })
      .catch(err => { console.log(err) });
  }

  onFormSubmit = async (event) => {
    event.preventDefault();

    let city = event.target.city.value;
    let country  = event.target.country.value;

    if(city !== "" && country !== ""){
      let params = { city: city, country: country };
      let weather = await this.getWeatherConditions(params);
      if(weather.length > 0){
        this.setState({
          foreCasts: weather
        });
      }
    }
  }

  render(){

    let cards = <div></div>;
    if(this.state.foreCasts.length > 0){
      cards = this.state.foreCasts.map((e,i) => {
        return <WeatherCard key={i} 
          weather={e.weather[0].main} 
          date={new Date(e.dt*1000).toLocaleDateString('default', {weekday:'long', month: 'long', day: 'numeric'})} 
          max={e.main.temp_max} 
          min={e.main.temp_min}/>
      });
    }

    return(
      <div>
        <h3 style={{'margin':'0 auto', 'display':'table','padding':'15px'}}>Weather Application</h3>
        <Form submit={this.onFormSubmit}/>
        <div className="cards-container">
          {cards}
        </div>
        
      </div>
    )
  }
}

export default App;
