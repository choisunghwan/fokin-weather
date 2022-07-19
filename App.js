import React from 'react';
import {Alert} from "react-native";
import Loading from "./Loading";
import * as Location from 'expo-location';
import axios from "axios";
import Weather from './Weather';

const API_KEY ="546fed7393c9827011f1fe93fb25988e"
export default class extends React.Component{
  state = {
    isLoading: true
  };
  getWeather = async(latitude,longitude) =>{
    const{
      data: {
        main :{ temp },
        weather
      }
    }= await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=35.8595&lon=128.5287&appid=546fed7393c9827011f1fe93fb25988e&units=metric`
      );
    this.setState({
      isLoading: false,
      condition: weather[0].main,
      temp
    });
  };
  getLocation = async() =>{
    try{
      await Location.requestForegroundPermissionsAsync();

      const {coords:{latitude, longitude}
    } = await Location.getCurrentPositionAsync()
    this.getWeather(latitude,longitude)

   
    }catch(error){
      Alert.alert("can't find you","so sad");
    }
    

  }
  componentDidMount(){
    this.getLocation();
  }

  render(){
    const{ isLoading,temp,condition } = this.state;
    return isLoading ? (
    <Loading />
     ) : (
        <Weather temp={Math.round(temp)} condition={condition} />
     );
  }
}

