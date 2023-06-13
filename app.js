let fullname = document.getElementById('name');
let city = document.getElementById('city');
let submit = document.getElementById('submit');
let search = document.getElementById('search');
let searchBtn = document.getElementById('search-btn');




// Set to localStorage
function setLocalStorage(arr) {
    localStorage.setItem('data', JSON.stringify(arr))
}

// Get from local storage
function getLocalStorage() {
    if (localStorage.getItem('data')) {
        let newArr = JSON.parse(localStorage.getItem('data'));
        document.querySelector('.input__container').classList.remove('visible');
        document.querySelector('.container').classList.add('active');
        document.getElementById('title-name').textContent = newArr[0];

    }
}




// Check inputs
function checkInput() {

    let arr = [fullname.value, city.value]

    let nameStatus = validateInput(fullname, "Enter your Full name");
    let cityStatus = validateInput(city, "Enter a city name");

    if (nameStatus && cityStatus === true) {

        //Set to localStorage
        setLocalStorage(arr);

        // Get from local storage
        getLocalStorage();

        checkWeather()
    }
}



// Validate
function validateInput(data, message) {


    if (!data.value) {


        data.placeholder = message;
        data.style.border = "1px solid red";
    } else {

        data.placeholder = "";
        data.style.border = "";
        return true;
    }
}


submit.addEventListener('click', (e) => {

    e.preventDefault();
    checkInput()

})

searchBtn.addEventListener('click', () => {
    console.log('hii');
    checkWeather();
    search.value = "";
})

search.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      checkWeather();
      search.value = "";
    }
  });

// Get from local storage
getLocalStorage();


function changeCity() {



    checkWeather();
}

// Weather APIs
const apiKey = "334c35061cd524fdbffc7e222614704e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


function changeData(data) {

    let temp = parseInt(data.main.temp);
    let vis = data.visibility / 1000;
    
    document.getElementById('title-city').textContent = data.name;
    document.getElementById('temp').textContent = `${temp} °C`;
    document.getElementById('pressure').textContent = `${data.main.pressure}mb`;
    document.getElementById('visibilty').textContent = `${vis} km`
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('condition').textContent = data.weather[0].main;
}

async function checkWeather() {

    if (search.value) {
        const response = await fetch(apiUrl + search.value + `&appid=${apiKey}`);
        var data = await response.json();
        

        changeData(data)


    }else {
        cityName = JSON.parse(localStorage.getItem('data'));

        const response = await fetch(apiUrl + cityName[1] + `&appid=${apiKey}`);
        var data = await response.json();
        

        changeData(data)
    }

    



    

 
    console.log(data);



}

checkWeather();


