var res=fetch("https://restcountries.com/v3.1/all")
res.then((data)=>{
    return data.json()
}).then((data1)=>rest(data1)).catch((error)=>console.log(error))

var container=document.createElement("div");
container.className="container";

var title=document.createElement("h1")
title.id="title";
title.className="text-center"
title.innerText="Rest Countries & Weather using fetch API";
container.append(title)


var row =document.createElement("div");
row.className="row";

function rest(data1){
    console.log(data1)
 for(var i=0;i< data1.length;i++)
    {
        var test=data1[i].latlng;
        var col=document.createElement("div")
        col.className="col-sm-6 col-md-4 col-lg-4 col-xl-4"
        col.innerHTML=`<div class="card h-100 text-white bg-secondary mb-3" style="max-width: 18rem;">
        <h5><div class="card-header bg-dark text-center">${data1[i].name.common}</div></h5>
        <div class="card-body text-center" style="padding-top:10px;">
        <img src="${data1[i].flags.png}" class="card-img-top" alt="...">
          <p class="card-text"><b>Capital : </b>${data1[i].capital}</p>
          <p class="card-text"><b>Region : </b>${data1[i].region}</p>
          <p class="card-text"><b>Sub-Region : </b>${data1[i].subregion}</p>
          <div class="card-text"><b>Native Name : </b>${ Object.values(data1[i].name.nativeName || {})[0]?.common || 'NA'}</div>
          <div class="card-text"><b>Population : </b>${data1[i].population}</div>
          <div class="card-text"><b>Country Code : </b>${data1[i].cca3}</div> 
          <div><b>Latitude: </b>${test[0]}</div > 
          <div><b>Longitude: </b>${test[1]}</div>
          <button type="button" class="btn btn-primary">Click for Weather</button>
        </div>
      </div>`
      row.append(col);
      container.append(row);
      document.body.append(container);
      let button =col.querySelector('button')
      button.addEventListener('click',() => open_weather(...test,button))  
    } 
}
async function open_weather(lat,lng,btn){
    try{
        let data2=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=db1b2b400b6a58512b168a98d075e737`)    
        let data3=await data2.json();
        console.log(data3)

        let weatherInfo = document.createElement("div");
        weatherInfo.className = 'card-text';
        weatherInfo.innerHTML = `
        <div><b>Temperature: </b>${data3.main.temp} 🌡️°C</div>
        <div><b>Feels like:</b>${data3.main.feels_like} 🌡️°C</div>
        <div><b>Humidity:</b>${data3.main.humidity}%</div>`;
        btn.parentNode.appendChild(weatherInfo);
        btn.disabled = true;
    }
    catch(error){
       console.log(error)
    }
}