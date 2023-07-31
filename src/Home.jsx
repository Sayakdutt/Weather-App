import axios from "axios";
import { useState } from "react";

const Home = () => {
    const [data, setData] = useState({
        celcius: '',
        name: '',
        humidity: '',
        speed: '',
        image: ''
    })
    const [name, setName] = useState("");
    const [error, setError ] = useState("");
    const apiKey = import.meta.env.VITE_API_KEY
    
    const handClick = () => {
        if ( name !== "")
        {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&&units=metric`;
            axios.get(apiUrl)
            .then(res => {
                let imagePath = ""
                if(res.data.weather[res.data.weather.length-1].main == 'Clouds' ){
                    imagePath = "./images/clouds.png";
                }
                else if (res.data.weather[res.data.weather.length-1].main == "Clear"){
                    imagePath = "./images/clear.png";
                }
                else if( res.data.weather[res.data.weather.length-1].main == "Rain"){
                    imagePath = "./images/rain.png";
                }
                else if (res.data.weather[res.data.weather.length-1].main == "Drizzle" ){
                    imagePath = "./images/drizzle.png";
                }
                else if(res.data.weather[res.data.weather.length-1].main == "Mist"){
                    imagePath = "./images/mist.png";
                }
                else{
                    imagePath = "./images/clouds.png"
                }
                setData({...data, celcius: res.data.main.temp,name: res.data.name,
                    humidity: res.data.main.humidity, wind: res.data.wind.speed, image: imagePath})
                console.log(res.data);
                setError(" ");
            })
            .catch( err => {
                if(err.response.status == 404){
                    setError("Invalid City Name");
                }
                console.log(err);
            })
        }
    }

    return (
    <div className="container">
        <div className="weather">
            <div className="search">
                <input type="text" placeholder="Enter City Name" onChange={(e) => setName(e.target.value)}/>
                <button><img src="./images/search.png" alt= "" onClick={handClick}/></button>
            </div>
            <div className="error">
                <p>{error}</p>
            </div>
            <div className="winfo">
                <img src={data.image} alt="" className="icon"/>
                <h1>{Math.round(data.celcius)}°C</h1>
                <h2>{data.name}</h2>
            </div>
            <div className="details">
                <div className="col">
                    <img src="./images/humidity.png" alt="" />
                    <div className="humidity">
                        <p>{Math.round(data.humidity)}%</p>
                        <p>Humidity</p>
                    </div>
                </div>
                <div className="col">
                    <img src="./images/wind.png" alt="" />
                    <div className="wind">
                        <p >{data.wind}km/h</p>
                        <p>Wind</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home
