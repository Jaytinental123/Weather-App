let button = document.getElementById("get");
let temp = document.getElementById("temp");
let humidity = document.getElementById("humidity");
let weatherResult = document.getElementById("weather-result");
let weatherImage = document.getElementById("img-weather");
let cityName = document.getElementById("city-name");
let nameOfCity = document.getElementById("name-of-city");
let precipitation = document.getElementById("rain-chance");


button.addEventListener("click", function () {
    let request = new XMLHttpRequest();
    let apiKey = "b402c109e4749791757b70b17a903a77";
    let city = cityName.value;

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    request.open("GET", url, true);
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            let weather = JSON.parse(request.responseText);

            const temperature = weather.main.temp;
            const humidityData = weather.main.humidity;
            const cloudCover = weather.clouds.all;
            const weatherDescription = weather.weather[0].description.toLowerCase();
            const tempCelsius = Math.round(temperature - 273.15);

            temp.textContent = `${tempCelsius}°C`;
            humidity.textContent = `${humidityData}%`;
            nameOfCity.textContent = cityName.value;

            weatherResult.style.display = "flex";
            setTimeout(() => {
                weatherResult.style.opacity = "1";
                weatherResult.style.transform = "translateY(0)";
            }, 10);
           
            let rainVolume = weather.rain ? weather.rain["1h"] || 0 : 0;

           
            let popEstimate = (humidityData * 0.6) + (cloudCover * 0.4);

            
            if (rainVolume > 0 || weatherDescription.includes("rain")) {
                popEstimate = Math.max(popEstimate, 80); 
            }

            popEstimate = Math.min(Math.round(popEstimate), 100); 
            console.log(popEstimate);

            precipitation.textContent = `${popEstimate}%`;

            if (popEstimate >= 50) {
               weatherImage.src="./Images/Big/Moon cloud mid rain.png"
            } else {
                weatherImage.src = "./Images/Big/Sun cloud mid rain.png"; 
            }
        }
    };
});