import React from 'react'

function Weather (date,lng,lat,setIMG,setDescription,setFeelsLike) {
    date= new Date(date)
    console.log(lng)
    console.log(lat)
    
    try{
   fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=b48f34820c8b3b94680aee2808244f49`)
        .then(function(resp) { return resp.json() })
        .then(function(data) {                         
                for(const key in data?.list){
                    
                    let weatherDate=data.list[key]?.dt_txt 
                    console.log(data.list[key])
                    if(weatherDate.slice(0,10)===formatDate1(date).slice(0,10)){ //'2022-06-07 '==='2022-xx-xx ' ?
                        
                    let WeatherHours=parseInt(weatherDate.slice(11,13))
                    let ActivityHours=parseInt(formatDate1(date).slice(11,13));
                    
                        if(WeatherHours-1===ActivityHours || WeatherHours===ActivityHours || WeatherHours+1===ActivityHours){
                           
                            let WeatherObj=data?.list[key]
                            
                            console.log(WeatherObj?.main?.feels_like) //temp feels like - 273.15
                            console.log(WeatherObj?.weather[0]?.description)
                            console.log(WeatherObj?.weather[0]?.icon) //<img src ={`http://openweathermap.org/img/w/${this.props.icon}.png`} alt="wthr img" />
                            setIMG(WeatherObj?.weather[0]?.icon)
                            
                            setFeelsLike((WeatherObj?.main?.feels_like-273).toFixed(2));
                            setDescription(WeatherObj?.weather[0]?.description);      
                        }            
                    }      
                }         
        })

    }catch(err){
        console.log(err)  
    }
}

function formatDate1(date) {
  return (
      [
      date.getFullYear(),
      (date.getMonth() + 1).toString().padStart(2, '0'),
      (date.getDate()).toString().padStart(2, '0'),
      ].join('-') +
      ' ' +
      [
      (date.getHours()).toString().padStart(2, '0'),
      (date.getMinutes()).toString().padStart(2, '0'),
      (date.getSeconds()).toString().padStart(2, '0'),
      ].join(':')
  );
}
export default Weather