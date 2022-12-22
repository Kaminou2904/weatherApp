let searchBtn = document.getElementById('searchBtn');
let cityInput = document.getElementById('cityInput');
let resultCont = document.getElementById('resultCont');
let key = "7f25b6f3ce742af3d34a746db38d32cf";
function searchWeather(){
    let inputVal = cityInput.value;
    if (inputVal.length == 0) {
        resultCont.innerHTML = `<h3 class="emptyErr">Please enter city name</h3>`
    }else{
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${key}&units=matric`;
        searchBtn.innerHTML = "Searching...";
        searchBtn.style.opacity = "0.5";
        searchBtn.style.cursor = "none";
        fetch(url).then((res) => res.json()).then(data =>{
            resultCont.innerHTML = `
            <h3 id="cityName">${data.name}</h3>
            <p id="main">${data.weather[0].main}</p>
            <p id="desc">${data.weather[0].description}</p>
            <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="">
            <h2 id="mainTemp">${Math.round(data.main.temp - 273.15)}&#8451;</h2>
            <div class="tempSm">
                <div id="minTemp">
                    <p class="text">min</p>
                    <p>${Math.round(data.main.temp_min - 273.15)}&#8451;</p>
                </div>
                <div id="maxTemp">
                    <p class="text">max</p>
                    <p>${Math.round(data.main.temp_max - 273.15)}&#8451;</p>
                </div>
            </div>
            `;
            cityInput.value = "";
            searchBtn.innerHTML = "Search";
            searchBtn.style.opacity = "1";
            searchBtn.style.cursor = "pointer";
        })
        .catch(()=>{
            resultCont.innerHTML = `<h3 class="emptyErr">Invalid city name</h3>`
            cityInput.value = "";
            searchBtn.innerHTML = "Search";
            searchBtn.style.opacity = "1";
            searchBtn.style.cursor = "pointer";
        });
    };
};
searchWeather();
searchBtn.addEventListener('click', searchWeather);