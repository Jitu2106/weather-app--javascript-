window.addEventListener('load', ()=> {
     let long;
     let lat;
      let temperatureDescription = document.querySelector('.temperature-description');
      let temperatureDegree = document.querySelector('.temperature-degree');
      let locationTimezone = document.querySelector('.location-timezone');
      let temperatureSection = document.querySelector('.temperature');
      const temperatureSpan = document.querySelector('.temperature span') 


     if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

           const proxy = 'https://cors-anywhere.herokuapp.com/';
           const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

           fetch(api) 
            .then(respons => {
                return respons.json();
            })
            .then(data =>{
                console.log(data);

                const {temperature , summary , icon} = data.currently; 
                //set DOM elements from api
                temperatureDegree.textContent=temperature;
                temperatureDescription.textContent=summary;
                locationTimezone.textContent = data.timezone;
                 //formula for celcius ;
                 let celcius = (temperature -32)*(5/9);
                //Set Icon
                setIcons(icon,document.querySelector(".icon") );

                //change celcious to f

                temperatureSection.addEventListener("click", ()=>{
                    if(temperatureSpan.textContent==="F"){
                        temperatureSpan.textContent="C";
                        temperatureDegree.textContent = Math.floor(celcius);

                    }else{
                        temperatureSpan.textContent="F";
                        temperatureDegree.textContent = temperature;
                    }
                });

            });

        });
       
       

     }else{
        h1.textContent = "Hey Rhis is not working because of some reason !! Check and come again !!";

     }

    function setIcons(icon,iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon]);
    }
});