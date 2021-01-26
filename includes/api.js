

// var current_location_weather = {}
let markers = [];
let polygons = [];

//functio to get country initial data from rest countries api
function getCountryInitialData(code){
    // console.log(code)

    //ajax call to rest country api
    $.ajax({
        url: "./includes/php/restCountry.php",
        type: 'POST',
        dataType: 'json',
        data:{
            code:code
        },
        success: function(result) {
            if (result.status.name == "ok") {

                //set the result from ajax cal to html dom elements on the side bar and navbar
                document.getElementById("user_country").innerHTML  = result.data.name
                // document.getElementById("user_country_2").innerHTML  = result.data.name

                document.getElementById("country_of_user").innerHTML  =  result.data.name + " " +  result.data.capital +'<span></span>'
               
                document.getElementById("flag").innerHTML  =  '<span class="opening-hours-time"><img height="50" width="50"  src='+ result.data.flag +'></span>'
                document.getElementById("city_name").innerHTML = '<span class="opening-hours-day">Capital City </span><span class="opening-hours-time">'+ result.data.capital +'</span>'
                document.getElementById("location_population").innerHTML = '<span class="opening-hours-day">Population </span><span class="opening-hours-time">'+ fomartNumbers(result.data.population )+'</span>'
                document.getElementById("region").innerHTML = '<span class="opening-hours-day">Region</span><span class="opening-hours-time">'+result.data.region+'</span>'
                document.getElementById("sub_region").innerHTML = '<span class="opening-hours-day">Sub Region</span><span class="opening-hours-time">'+result.data.subregion+'</span>'
                document.getElementById("currency_code").innerHTML = '<span class="opening-hours-day">Time Zone</span><span class="opening-hours-time">'+result.data.timezones[0]+'</span>'
                document.getElementById("area_covered").innerHTML = '<span class="opening-hours-day">Area Covered </span><span class="opening-hours-time">'+fomartNumbers(result.data.area)+'sqkm</span>'
                document.getElementById("location_latitude").innerHTML = '<span class="opening-hours-day">Latitude </span><span class="opening-hours-time" >'+result.data.latlng[0]+'</span>'
                document.getElementById("location_longitude").innerHTML = '<span class="opening-hours-day">Longitude</span><span class="opening-hours-time">'+result.data.latlng[1]+'</span>'
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 
}


//function to get polygon 
function drawPoligon(map,countryName){
    // console.log(countryName)
    $.ajax({
        url: "https://nominatim.openstreetmap.org/search.php?q="+countryName+"&polygon_geojson=1&format=json",
        type: 'GET',
        dataType: 'json',
        success: function(result) {

            // console.log(result);
                var cord = []

                //checking if the reults cordinates are of single polygon or multi polygon
                if(result[0].geojson.type === "Polygon" ){
                    result[0].geojson.coordinates[0].forEach(cordi =>{
                        cord.push({lat:cordi[1], lng:cordi[0]})
                    })

                    // console.log(cord)
                    const polygon = new google.maps.Polygon({
                        paths: cord,
                        strokeColor: "#FF0000",
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: "#87ceeb",
                        fillOpacity: 0.35,
                      });
                      polygon.setMap(map); 
                      polygons.push(polygon);
                }

                //if results are of multi polygon
                if(result[0].geojson.type === "MultiPolygon" ){
                    var cord = []
                  // console.log ( result[0].geojson.coordinates)
                      result[0].geojson.coordinates.forEach(cordi =>{
                          cordi.forEach(newCord=>{
                            // console.log(newCord)
                             var cords=[]

                             newCord.forEach(lastCord => {
                             cords.push({lat:lastCord[1], lng:lastCord[0]})

                             })
                            //  console.log(cords) 
                              const polygon = new google.maps.Polygon({
                                paths: cords,
                                strokeColor: "#FF0000",
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: "#87ceeb",
                                fillOpacity: 0.35,
                              });
                              polygon.setMap(map);
                              polygons.push(polygon);

                          })
                    })
                }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 
    
}

//function to get cities for particular contry from data.js
function getCities(county_name){
    var cities_results = cities.filter(function(city) {
       return city.country.includes(county_name)
    })
    // console.log(cities_results)
  
    return cities_results
  
  }
//function to set markers for a city
function cityMarkers(map, country){
      // console.log(this.new_data.name)
      var cities_results = cities.filter(function(city) {
          return city.country.includes(country)
      })
      var topCities = cities_results.sort((a,b) => b.population-a.population).slice(0,12);
      
     // console.log(cities_results)
       topCities.forEach(city=>{
             $.ajax({
                url: "./includes/php/openweather.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    lat:city.lat,
                    lon:city.lng
                },
                success: function(result) {
                    // console.log(result)
                                                        
                    if (result.status.name == "ok") {
                         // Add marker
                         ///info window for the marker
                        var infoWindow = new google.maps.InfoWindow({ maxWidth: 240 });

                        var marker = new google.maps.Marker({
                            position:{lat:city.lat, lng:city.lng},
                            map: map,
                            title :'<div class="map-popup-wrap" style="border-radius:15px"> <div class="map-popup" style="border-radius:15px"> <div class="infoBox-close" style="border-radius:15px"><i class="fal fa-times"></i></div> <div class="listing-content" > <div class="listing-content-item fl-wrap" style="border-radius:15px"> <div class="map-popup-location-category"></div> <div class="listing-title fl-wrap" > <ul class="weather-header marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px"> <li><h3>'+result.data.location.name+'</h3></li> </ul> <ul clas="marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px" > <li style="margin-top:5px">Lat : '+city.lat+'</li> <li style="margin-top:5px">Lon : '+city.lng+'</li><li style="margin-top:5px">Population : '+fomartNumbers(city.population)+'</li> </ul class="marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px"> <ul class="weather-header marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px"> <li style="margin-top:5px"><h3>Weather Details</h></li> </ul> <hr> <ul class="marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px"> <li style="margin-top:5px">Wind Speed : '+result.data.current.wind_mph+'mph</li> <li style="margin-top:5px">Wind Direction : '+result.data.current.wind_degreeg+'°</li> <li style="margin-top:5px">Current Temperature : '+result.data.current.temp_c+'°C</li> <li style="margin-top:5px">Feels Like : '+result.data.current.feelslike_c+'°C</li> <li style="margin-top:5px">Condition : '+result.data.current.condition.text+'</li> <li style="margin-top:5px">Humidity : '+result.data.current.humidity+'%</li> <li style="margin-top:5px">Pressure : '+result.data.current.pressure_mb+'mb</li> </ul> </div> </div> </div> </div> </div>'
                         });
                    
                      //setting event listener for the marker
                        google.maps.event.addListener(marker, "click", function (e) {
                            
                            infoWindow.setContent(marker.title);
                            infoWindow.open(map, marker);
                        }); 
                        markers.push(marker);
                    }
                },

                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown )
                    console.log(textStatus )
                    console.log(jqXHR )

                }
                }); 

       })
      
 }

 //function to formart numbers
function fomartNumbers(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}