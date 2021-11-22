// api key
const API_KEY = 'cca9de64-6cd7-44e0-9da3-f379d6f5edda';
let city = '';
let state = '';
let country = '';
let url = '';
let env = '';

if(window.location.href.includes('netlify')) {
    env = 'production'
} else {
    env = 'local'
}

const ROOT = document.querySelector('main');
const STATS = document.getElementById('_stats');
const loader = document.getElementById('loader-wrapper');

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
    const card = document.getElementById(prevCard);
    if(card.value != '') {
        if (prevCard == 'city-name') {
            document.getElementById('city-card').style.display = 'none';
            document.getElementById('state-card').style.display = 'block';
        } else {
            document.getElementById('state-card').style.display = 'none';
            document.getElementById('country-card').style.display = 'block';
        }
    } else {
        card.style.outline = "5px solid red";
        card.setAttribute('placeholder', 'Required');
    }
    

}

function checkLength(id) {
    const card = document.getElementById(id);
    if(card.value.length >= 2) {
        card.style.outline = '5px solid green';
    }
}

function getResult() {
    STATS.style.display = 'none';
    loader.style.display = 'flex';
    if(env == 'production') {
        url = `/api/city?city=${city}&state=${state}&country=${country}&key=${API_KEY}`;
    } else {
        url = `http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${API_KEY}`;
    }
    
    fetch(url)
        .then((response) => {
            if(response.status == '200') {
                return response.json();
            } else {
                return 'Error';
            }
        })
        .then((json) => {
            //initEnv(json.data);
            renderResult('success', json.data);
        })
        .catch(error => {
            console.error(error);
            renderResult('failure', error);
        });

}

function renderResult(status, data) {
    loader.style.display = 'none';
    STATS.style.display = 'flex';
    STATS.innerHTML = '';
    switch(status) {
        case 'success':
            successCard(data);
            break;
        
        case 'failure':
            failureCard(data);
            break;
        default: 
            //
    }
}

function successCard(data) {
    STATS.innerHTML = `
    <div class="stat-card">
    <h1>${data.city}</h1>
    <span class="separator">
        &#9679;
    </span>
    <h4>City</h4>
    </div>
    <div class="stat-card">
    <h1>${data.current.pollution.aqius}</h1>
    <span class="separator">
        &#9679;
    </span>
    <h4>aqius</h4>
    </div>
    <div class="stat-card">
    <h1>${data.current.weather.hu}%</h1>
    <span class="separator">
        &#9679;
    </span>
    <h4>humidity</h4>
    </div>
    <div class="stat-card">
    <h1>${data.current.weather.tp} &#176;C</h1>
    <span class="separator">
        &#9679;
    </span>
    <h4>temperature</h4>
    </div>
    <div class="stat-card">
    <h1>${data.current.weather.ws}km/h</h1>
    <span class="separator">
        &#9679;
    </span>
    <h4>Wind speed</h4>
    </div>
    `;
}

function failureCard(data) {

}

// function initEnv(data) {
//     ROOT.innerHTML = '';
//     const US_AQI = data.current.pollution.aqius;
//     if(US_AQI < 50) {
//         safeEnv(data);
//     } else if(US_AQI > 50 && US_AQI < 200) {
//         balancedEnv(data);
//     } else if(US_AQI > 200) {
//         dangerousEnv(data);
//     } else {
//         renderError(null);
//     }
// }

// // Environments..
// function safeEnv(data) {
//     ROOT.style.backgroundImage =  'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0 , 0, 0, 0.5)), url(assets/greenery.jpg)';
    
// }

// function balancedEnv(data) {
//     ROOT.style.backgroundImage =  'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0 , 0, 0, 0.5)), url(assets/greenery.jpg)';
// }

// function dangerousEnv(data) {
//     ROOT.style.backgroundImage =  'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0 , 0, 0, 0.5)), url(assets/burning.jpg)';
// }

// function renderError(data){
//     if(data != null) {
//         //container with actual error
//     } else {
//         //container with a generic message
//     }
// }