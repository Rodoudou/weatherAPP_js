document.addEventListener("DOMContentLoaded", () => {
    console.log('All assets are loaded');

    const section = document.querySelector('section');
    const load = document.querySelector('.spinner');

    
    
    const success = (pos)=>{
        console.log("position in success =>",pos);
        const crd = pos.coords;
        const {latitude:lat,longitude:lon} = crd;
        recupererMeteo(lat, lon)
    }
    
    const error = async() =>{
        console.log("okkkkkk");
       await window.fetch(`https://api.ipify.org?format=json`)
        .then(res=> res.json())
        .then(resJson => window.fetch(`http://freegeoip.net/json/{format}/${resJson.ip}`)
            .then(res => res.json())
            .then(info => {
                console.log("info=>",info);
                const {latitude:lat,longitude:lon} = info;
                recupererMeteo(lat,lon);
            })
        )
    }
    
    
    const recupererMeteo = async (lat, lon)=>{
       await window.fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=fr&units=metric&appid= Pleas HERE YOUR AppID ???`)
        .then(res => res.json())
        .then(resJson =>{
            const meteo = resJson;
            affichage(meteo);
        })
        
    }
    
    const affichage =(meteo)=>{
        load.style.display='none';
        console.log(meteo);
        
        const {description, icon}= meteo.weather[0];
        const temp = meteo.main.temp;
        //
        const html = `
        <div>
        <h2>${capitalize(meteo.name)}</h2>
        <img src=https://api.openweathermap.org/img/w/${icon}.png> 
        <p>${formatText(description)}</p>
        <p class="temp">${formatDeg(temp)}</p>
        </div>
        `
        
        section.innerHTML = html;
    }
    
    navigator.geolocation.getCurrentPosition(success,error);
    
    
    //Helpers
    const capitalize =(text)=>{
        return text.toUpperCase();
    }
    
    const formatDeg=(deg)=>{
        return `${Math.floor(deg)} C°`;
    }
    
    const formatText=(text)=>{
        return text
        .split(' ') // transform in array
        .map(mot => mot[0].toUpperCase()+mot.slice(1)) // concatenation first letter and the rest
        .join(' ') // transform in string with space
    }
    
    










});