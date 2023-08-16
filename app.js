const apiKey = "306da16d6978bb2a8309d623a34c615c";

const searchBtn = document.querySelector('.search button');

const weatherDiv = document.querySelector('.weather');
const errorDiv = document.querySelector('.error');

const library = {
    "Clouds": './images/clouds.png',
    "Clear": "./images/clear.png",
    "Rain": "./images/rain.png",
    "Snow": "./images/snow.png",
    "Drizzle": "./images/drizzle.png",
    "Mist": "./images/mist.png"
}

searchBtn.addEventListener('click', findCity)

async function findCity(){
    const town = document.querySelector('.search input').value;
    const data = await checkWeather(town);
    console.log(data);

    document.querySelector('.weather-icon').src = library[data.weather[0].main];
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = `${Math.round(data.main.temp)}°C`;
    document.querySelector('.humidity').innerHTML = `${data.main.humidity}%`;
    document.querySelector('.wind').innerHTML = `${data.wind.speed} km/h`;

    weatherDiv.style.display = "block";
    errorDiv.style.display = "none";


    
}

async function checkWeather(town){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${town}&appid=${apiKey}`;
    try{
        const response = await fetch(apiUrl);
        if(!response.ok){
            let err = await response.json();
            throw err;
        }
        const data = response.json();
        return data;
    }catch(err){
        // alert(err.message);
        weatherDiv.style.display = "none";
        errorDiv.style.display = "block";
        throw err;
    }
    
}