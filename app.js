const body = document.querySelector('body');
const timeZonE = document.querySelector('.timeZone');
const icon = document.querySelector('.icon');
const degressC = document.querySelector('.degress-section');
const degress = document.querySelector('.degress');
const unit = document.querySelector('.degress-section > span');
const describe = document.querySelector('.temperature-description');

const getLocation = async () => {
    const url = 'http://ip-api.com/json/?fields=country,city,lat,lon,timezone';
    const respons = await fetch(url);
    const data = respons.json();

    return data;
}

const getWeather = async (lat,lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6f0cb526b142a016ad7b0d33f87bcf22`;
    const respons = await  fetch(url);
    const data = respons.json();
    
    return data;
}

function getDayOrNight(){
    let DayOrnight;
    let d = new Date();
    
    if(d.getHours() >= 6 && d.getHours() <= 19){
        DayOrnight = 'Day';
    }else{
        DayOrnight = 'Night';
    }

}

function getIcon(weMain){
    let icon;

    switch(weMain){
        case 'Thunderstorm':
            icon = `${weMain}.svg`;
        break;
        case 'Drizzle':
            icon = `${weMain}.svg`;
        break;
        case 'Rain':
            icon = `${weMain}.svg`;
        break;
        case 'Snow':
            icon = `${weMain}.svg`;
        break;
        case 'Clear':
            const DayOrnigh = getDayOrNight();
            icon = `${weMain}-${DayOrnigh}.svg`;
        break;
        case 'Clouds':
            icon = `${weMain}.svg`;
        break;
        case 'Atmosphere':
            icon = `${weMain}.svg`;
        break;
    }

    return icon;
}

function getTemp(weTemp){
    const k = weTemp;
    const f = (k - 273.15) * 9/5 + 32;
    const c = k - 273.15;
    
    return temp = { kel:Math.floor(k),far:Math.floor(f),can:Math.floor(c)};
}

getLocation()
             .then(locData => {
                   const timeZone = locData.timezone;
                   console.log(locData.timezone)
                   timeZonE.textContent= timeZone;
                   return getWeather(locData.lat,locData.lon)
             }).then(weData => {
                console.log(weData)
                const weTemp = weData.main.temp;
                const weMain = weData.weather[0].main;
                const weDes = weData.weather[0].description;

                const iconName = getIcon(weMain);
                icon.innerHTML = `<img src='icons/${iconName}'></img>`;

                degress.textContent = Math.floor(weTemp);
                unit.textContent = 'K';
                describe.textContent = weDes;

                degressC.addEventListener('click',function(){
                    if(unit.textContent == "K"){
                        degress.textContent = getTemp(weTemp).far;
                        unit.textContent = "F";

                    }else if(unit.textContent == "F"){
                        degress.textContent == getTemp(weTemp).can;
                        unit.textContent = 'C';

                    }else{
                      degress.textContent = getTemp(weTemp).kel;
                      unit.textContent = 'K'
                    }
                })

                if(weMain == 'Clouds'){
                   body.style = 'background:linear-gradient(  #0064BB , #2583D2);'

                }else if(weMain == 'Drizzle'){
                    body.style = 'background:linear-gradient(  #003462 , #005396);'

                }else if(weMain == 'Rain'){
                    body.style = 'background:linear-gradient(  #003462 , #005396);'

                }else if(weMain == 'Clear-Night'){
                    body.style = 'background: linear-gradient(#000000, #2B2B2B);'

                }else if(weMain == 'Thunderstorm'){
                    body.style = 'background:linear-gradient(  #0064BB , #2583D2);'

                }else if(weMain == 'Snow'){
                    body.style = 'background: linear-gradient(#AAB1B8, #E3E5E7);'

                }else if(weMain == 'Clear-Day'){
                    body.style = 'background: linear-gradient(#00B2FF, #55E0FF);'

                }else if(weMain == 'Snow'){
                    body.style = 'background: linear-gradient(#868686, rgb(56 90 118)'
                }
             })
