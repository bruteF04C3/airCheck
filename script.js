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

function getResult() {
    url = `http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${API_KEY}`;
    fetch(url)
        .then(response => {
            response.json()
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.error(error);
        });

}

