const API_KEY = 'cca9de64-6cd7-44e0-9da3-f379d6f5edda';
let city = '';
let state = '';
let country = '';
let url = '';

function getCityName(val) {
    city = val;
}

function getStateName(val) {
    state = val;
}

function getCountryName(val) {
    country = val;
}

function showNextCard(prevCard) {
    if (prevCard == 'city-name') {
        document.getElementById('city-card').style.display = 'none';
        document.getElementById('state-card').style.display = 'block';
    } else {
        document.getElementById('state-card').style.display = 'none';
        document.getElementById('country-card').style.display = 'block';
    }

}

function getResult() {    
    url = `http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${API_KEY}`;
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            renderResults(json);
        })
        .catch(error => {
            console.error(error);
        });

}

function renderResults(data) {
    
}

