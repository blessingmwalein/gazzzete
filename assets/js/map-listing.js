
(function ($) {
    "use strict";
    //function for initial map
    function mainMap() {

        //initial map settings  

        var map = new google.maps.Map(document.getElementById('map-main'), {
            zoom: 6,
            scrollwheel: false,
            center: new google.maps.LatLng(-17.8216, 31.0492),
           mapTypeId: google.maps.MapTypeId.HYBRID,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            panControl: false,
            fullscreenControl: true,
            navigationControl: false,
            streetViewControl: false,
            animation: google.maps.Animation.BOUNCE,
            gestureHandling: 'cooperative',
            styles: [{
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#444444"
                }]
            }]
        });
        
        // add listiner for the map click
        var myInfo = new google.maps.InfoWindow({ maxWidth: 240 });
         var new_geocoder = new google.maps.Geocoder();
         google.maps.event.addListener(map, 'click', function(event){


            new_geocoder.geocode({
                'latLng': event.latLng
              }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    // console.log(results)
                    var country_code;
                    var new_country;
                    for (var i = 0; i < results[0].address_components.length; i++) {
                        var addressType = results[0].address_components[i].types[0];
                        // for the country, get the country code (the "short name") also
                        if (addressType == "country") {
                           country_code = results[0].address_components[i].short_name;
                           new_country =results[0].address_components[i].long_name
                        }
                      }
                     for (let i = 0; i < markers.length; i++) {
                        markers[i].setMap(null);
                      } 
                      for (let i = 0; i < polygons.length; i++) {
                        polygons[i].setMap(null);
                      }
                     drawPoligon( map, new_country);   
                     cityMarkers(map,new_country)
                     getCountryInitialData(country_code)
                    bus.$emit('country-event', { country_code: country_code, country:new_country })
                }
              });

             $.ajax({
                    url: "./includes/php/openweather.php",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        lat:event.latLng.lat(),
                        lon:event.latLng.lng()
                    },
                    success: function(result) {
                        // console.log(result)
                                                            
                        if (result.status.name == "ok") {

                             // Add marker
                            var marker = new google.maps.Marker({
                                position: event.latLng,
                                map: map,
                                title :'<div class="map-popup-wrap" style="border-radius:15px"> <div class="map-popup" style="border-radius:15px"> <div class="infoBox-close" style="border-radius:15px"><i class="fal fa-times"></i></div> <div class="listing-content" > <div class="listing-content-item fl-wrap" style="border-radius:15px"> <div class="map-popup-location-category"></div> <div class="listing-title fl-wrap" > <ul class="weather-header marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px"> <li><h3>'+result.data.location.name+'</h3></li> </ul> <ul clas="marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px" > <li style="margin-top:5px">Lat : '+event.latLng.lat()+'</li> <li style="margin-top:5px">Lon : '+event.latLng.lng()+'</li> </ul class="marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px"> <ul class="weather-header marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px"> <li style="margin-top:5px"><h3>Weather Details</h></li> </ul> <hr> <ul class="marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px"> <li style="margin-top:5px">Wind Speed : '+result.data.current.wind_mph+'mph</li> <li style="margin-top:5px">Wind Direction : '+result.data.current.wind_degree+'°</li> <li style="margin-top:5px">Current Temperature : '+result.data.current.temp_c+'°C</li> <li style="margin-top:5px">Feels Like : '+result.data.current.feelslike_c+'K</li><li style="margin-top:5px">Condition : '+result.data.current.condition.text+'°</li> <li style="margin-top:5px">Humidity : '+result.data.current.humidity+'%</li> <li style="margin-top:5px">Pressure : '+result.data.current.pressure_mb+'mb</li> </ul> </div> </div> </div> </div> </div>'
                             });
                            // console.log(event)

                            markers.push(marker)
                            google.maps.event.addListener(marker, "click", function (e) {
                                
                                myInfo.setContent(marker.title);
                                myInfo.open(map, marker);
                            }); 
                        }
                    },

                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown )
                        console.log(textStatus )
                        console.log(jqXHR )
                    }
                }); 
           
          });
        //getting geo data for the current location using geo coding api 
        var geocoder = new google.maps.Geocoder();
        var infowindow = new google.maps.InfoWindow({ maxWidth: 240 });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (p) {
                var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
                // console.log(LatLng);
                var mapOptions = {
                    center: LatLng,
                    zoom: 5,
                   mapTypeId: google.maps.MapTypeId.HYBRID
                };
                map.setOptions(mapOptions);
                geocoder.geocode({
                    'location': LatLng
                }, function (results, status) {
                    // console.log("geocoder callback status=" + status);
                    if (status === 'OK') {
                        if (results[0]) {
                            map.setZoom(5);
                            // from "Google maps API, get the users city/ nearest city/ general area"
                            // https://stackoverflow.com/questions/50081245/google-maps-api-get-the-users-city-nearest-city-general-area
                            var details = results[0].address_components;
                            var city;
                            var country;
                            var short_name;
                            var city_short;
                            // console.log(JSON.stringify(details));
                            //looping though data from geocoding api 

                            for (var i = details.length - 1; i >= 0; i--) {
                                for (var j = 0; j < details[i].types.length; j++) {
                                    if (details[i].types[j] == 'locality') {
                                        city = details[i].long_name;
                                    } else if (details[i].types[j] == 'sublocality') {
                                        city = details[i].long_name;
                                    } else if (details[i].types[j] == 'neighborhood') {
                                        city = details[i].long_name;
                                    } else if (details[i].types[j] == 'postal_town') {
                                        city = details[i].long_name;
                                        // console.log("postal_town=" + city);
                                    } else if (details[i].types[j] == 'administrative_area_level_2') {
                                        city = details[i].long_name;
                                        city_short = details[i].short_name
                                        // console.log("admin_area_2=" + city);
                                    }
                                    // from "google maps API geocoding get address components"
                                    // https://stackoverflow.com/questions/50225907/google-maps-api-geocoding-get-address-components
                                    if (details[i].types[j] == "country") {
                                        country = details[i].long_name;
                                        short_name = details[i].short_name
                                    }
                                }
                            }

                            // localStorage.setItem("user_country", country)

                            // console.log(short_name)

                            var input = document.getElementById('searchInput');

                            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

                            var autocomplete = new google.maps.places.Autocomplete(input);
                            autocomplete.bindTo('bounds', map);

                            var infowindow = new google.maps.InfoWindow({ maxWidth: 240 });
                            var new_place_marker = new google.maps.Marker({
                                map: map,
                                anchorPoint: new google.maps.Point(0, -29)
                            });



                                autocomplete.addListener('place_changed', function() {
                                    google.maps.Map.prototype.clearMarkers = function() {
                                        for(var i=0; i < this.markers.length; i++){
                                            this.markers[i].setMap(null);
                                        }
                                        this.markers = new Array();
                                    };

                                    infowindow.close();
                                    new_place_marker.setVisible(false);
                                    var place = autocomplete.getPlace();
                                    if (!place.geometry) {
                                        window.alert("Autocomplete's returned place contains no geometry");
                                        return;
                                    }
                            
                                    // If the place has a geometry, then present it on a map.
                                    if (place.geometry.viewport) {
                                        map.fitBounds(place.geometry.viewport);
                                    } else {
                                        map.setCenter(place.geometry.location);
                                        map.setZoom(5);
                                    }
                            
                                    new_place_marker.setPosition(place.geometry.location);
                                    new_place_marker.setVisible(true);
                                    
                                    var address = '';
                                    if (place.address_components) {
                                        address = [
                                        (place.address_components[0] && place.address_components[0].short_name || ''),
                                        (place.address_components[1] && place.address_components[1].short_name || ''),
                                        (place.address_components[2] && place.address_components[2].short_name || '')
                                        ].join(' ');
                                    }
                                    // console.log(place)
                                     $.ajax({
                                        url: "./includes/php/openweather.php",
                                        type: 'POST',
                                        dataType: 'json',
                                
                                        data: {
                                            lat:place.geometry.location.lat(),
                                            lon:place.geometry.location.lng()
                                        },
                                      
                                        success: function(result) {
                                            // console.log(result)
                                                                                
                                            if (result.status.name == "ok") {
                                                var country_code;
                                                var new_country;
                                                for (var i = 0; i < place.address_components.length; i++) {
                                                    var addressType = place.address_components[i].types[0];
                                                    
                                                    // for the country, get the country code (the "short name") also
                                                    if (addressType == "country") {
                                                       country_code = place.address_components[i].short_name;
                                                       new_country =place.address_components[i].long_name
                                                    }
                                                  }
                                                bus.$emit('country-event', { country_code: country_code, country:new_country })
                                                for (let i = 0; i < markers.length; i++) {
                                                    markers[i].setMap(null);
                                                  }
                                                for (let i = 0; i < polygons.length; i++) {
                                                    polygons[i].setMap(null);
                                                  }
                                                drawPoligon( map, new_country);
                                                cityMarkers(map,new_country)
                                                getCountryInitialData(country_code)
                                                new_place_marker.setIcon(result.data.flag)
                                                infowindow.setContent('<div class="map-popup-wrap" style="border-radius:15px"> <div class="map-popup" style="border-radius:15px"> <div class="infoBox-close" style="border-radius:15px"><i class="fal fa-times"></i></div> <div class="listing-content" > <div class="listing-content-item fl-wrap" style="border-radius:15px"> <div class="map-popup-location-category"></div> <div class="listing-title fl-wrap" > <ul class="weather-header marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px"> <li><h3>'+place.name+'</h3></li> </ul> <ul clas="marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px" > <li style="margin-top:5px">Lat : '+place.geometry.location.lat()+'</li> <li style="margin-top:5px">Lon : '+place.geometry.location.lat()+'</li> </ul class="marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px"> <ul class="weather-header marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px"> <li style="margin-top:5px"><h3>Weather Details</h></li> </ul> <hr> <ul class="marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px"> <li style="margin-top:5px">Wind Speed : '+result.data.current.wind_mph+'mph</li> <li style="margin-top:5px">Wind Direction : '+result.data.current.wind_degree+'°</li> <li style="margin-top:5px">Current Temperature : '+result.data.current.temp_c+'°C</li> <li style="margin-top:5px">Feels Like : '+result.data.current.feelslike_c+'K</li><li style="margin-top:5px">Condition : '+result.data.current.condition.text+'°</li> <li style="margin-top:5px">Humidity : '+result.data.current.humidity+'%</li> <li style="margin-top:5px">Pressure : '+result.data.current.pressure_mb+'mb</li> </ul> </div> </div> </div> </div> </div>')
                                                // infowindow.setContent('<div class="map-popup-wrap" style="border-radius:15px"> <div class="map-popup" style="border-radius:15px"> <div class="infoBox-close" style="border-radius:15px"><i class="fal fa-times"></i></div> <div class="listing-content" > <div class="listing-content-item fl-wrap" style="border-radius:15px"> <div class="map-popup-location-category"></div> <div class="listing-title fl-wrap" > <ul class="weather-header marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px"> <li><h3>'+place.name+'</h3></li> </ul> <ul clas="marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px" > <li style="margin-top:5px">Lat : '+place.geometry.location.lat()+'</li> <li style="margin-top:5px">Lon : '+place.geometry.location.lng()+'</li> </ul class="marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px"> <ul class="weather-header marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px"> <li style="margin-top:5px"><h3>Weather Details</h></li> </ul> <hr> <ul class="marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px"> <li style="margin-top:5px">Wind Speed : '+result.data.wind.speed+'m/s</li> <li style="margin-top:5px">Wind Direction : '+result.data.wind.deg+'°</li> <li style="margin-top:5px">Current Temperature : '+result.data.main.temp+'K</li> <li style="margin-top:5px">Feels Like : '+result.data.main.feels_like+'K</li> <li style="margin-top:5px">Humidity : '+result.data.main.humidity+'%</li> <li style="margin-top:5px">Pressure : '+result.data.main.pressure+'mb</li> </ul> </div> </div> </div> </div> </div>')
                                                infowindow.open(map, new_place_marker); 
                                                map.setZoom(5);
                                            }
                                        },
        
                                        error: function(jqXHR, textStatus, errorThrown) {
                                            console.log(errorThrown )
                                            console.log(textStatus )
                                            console.log(jqXHR )

                                        }
                                    }); 
                                });
                                //setting default maker for current location 
                                $.ajax({
                                    url: "./includes/php/openweather.php",
                                    type: 'POST',
                                    dataType: 'json',
                                    data: {
                                        lat:p.coords.latitude,
                                        lon:p.coords.longitude
                                    },
                                  
                                    success: function(result) {
                                        // console.log(result)
                                        if (result.status.name == "ok") {
                                            var marker = new google.maps.Marker({
                                                position: LatLng,
                                                map: map,
                                                title :'<div class="map-popup-wrap" style="border-radius:15px"> <div class="map-popup" style="border-radius:15px"> <div class="infoBox-close" style="border-radius:15px"><i class="fal fa-times"></i></div> <div class="listing-content" > <div class="listing-content-item fl-wrap" style="border-radius:15px"> <div class="map-popup-location-category"></div> <div class="listing-title fl-wrap" > <ul class="weather-header marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px"> <li><h3>'+city+'</h3></li> </ul> <ul clas="marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px" > <li style="margin-top:5px">Lat : '+p.coords.latitude+'</li> <li style="margin-top:5px">Lon : '+p.coords.longitude+'</li> </ul class="marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px"> <ul class="weather-header marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px"> <li style="margin-top:5px"><h3>Weather Details</h></li> </ul> <hr> <ul class="marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px"> <li style="margin-top:5px">Wind Speed : '+result.data.current.wind_mph+'mph</li> <li style="margin-top:5px">Wind Direction : '+result.data.current.wind_degree+'°</li> <li style="margin-top:5px">Current Temperature : '+result.data.current.temp_c+'°C</li> <li style="margin-top:5px">Feels Like : '+result.data.current.feelslike_c+'K</li><li style="margin-top:5px">Condition : '+result.data.current.condition.text+'°</li> <li style="margin-top:5px">Humidity : '+result.data.current.humidity+'%</li> <li style="margin-top:5px">Pressure : '+result.data.current.pressure_mb+'mb</li> </ul> </div> </div> </div> </div> </div>'

                                                // title :'<div class="map-popup-wrap" style="border-radius:15px"> <div class="map-popup" style="border-radius:15px"> <div class="infoBox-close" style="border-radius:15px"><i class="fal fa-times"></i></div> <div class="listing-content" > <div class="listing-content-item fl-wrap" style="border-radius:15px"> <div class="map-popup-location-category"></div> <div class="listing-title fl-wrap" > <ul class="weather-header marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px"> <li><h3>'+city+'</h3></li> </ul> <ul clas="marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px" > <li style="margin-top:5px">Lat : '+p.coords.latitude+'</li> <li style="margin-top:5px">Lon : '+p.coords.longitude+'</li> </ul class="marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px"> <ul class="weather-header marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px"> <li style="margin-top:5px"><h3>Weather Details</h></li> </ul> <hr> <ul class="marker-list" style="list-style:none;margin-bottom:5px;text-align:left;margin-top;5px"> <li style="margin-top:5px">Wind Speed : '+result.data.wind.speed+'m/s</li> <li style="margin-top:5px">Wind Direction : '+result.data.wind.deg+'°</li> <li style="margin-top:5px">Current Temperature : '+result.data.main.temp+'K</li> <li style="margin-top:5px">Feels Like : '+result.data.main.feels_like+'K</li> <li style="margin-top:5px">Humidity : '+result.data.main.humidity+'%</li> <li style="margin-top:5px">Pressure : '+result.data.main.pressure+'mb</li> </ul> </div> </div> </div> </div> </div>'
                                            });
                                            
                                            getCountryInitialData(short_name )
                                            bus.$emit('country-event', { country_code: short_name, country:country })

                                            drawPoligon(map, country)
                                            cityMarkers(map,country)
                                            
                                            google.maps.event.addListener(marker, "click", function (e) {
                                                var infoWindow = new google.maps.InfoWindow({ maxWidth: 240 });
                                                infoWindow.setContent(marker.title);
                                                infoWindow.open(map, marker);
                                            });
                                            // console.log(result.data.flag)
                                            marker.setIcon(result.data.flag)
                                            google.maps.event.trigger(marker, 'click');
                                           
                                        }
                                    },
                                    error: function(jqXHR, textStatus, errorThrown) {
                                        console.log(errorThrown )
                                        console.log(textStatus )
                                        console.log(jqXHR )

                                    }
                                }); 

         
                                //setting event listiner for the marker click
                         


                        } else {
                            window.alert('No results found');
                        }
                    } else {
                        window.alert('Geocoder failed due to: ' + status);
                    }
                });
            });
        } else {
            alert('Geo Location feature is not supported in this browser.');
        }

        var boxText = document.createElement("div");
        boxText.className = 'map-box'
        var currentInfobox;

        var boxOptions = {
            content: boxText,
            disableAutoPan: true,
            alignBottom: true,
            maxWidth: 0,
            pixelOffset: new google.maps.Size(-150, -55),
            zIndex: null,
            boxStyle: {
                width: "300px"
            },
            closeBoxMargin: "0",
            closeBoxURL: "",
            infoBoxClearance: new google.maps.Size(1, 1),
            isHidden: false,
            pane: "floatPane",
            enableEventPropagation: false,
        };

        var markerCluster, overlay, i;
        var allMarkers = [];

        var clusterStyles = [
            {
                textColor: 'white',
                url: '',
                height: 50,
                width: 50
            }
        ];

        //map navigation functions to move around the map
        $('.map-item').on("click", function (e) {
            e.preventDefault();
            map.setZoom(5);
            var index = currentInfobox;
            var marker_index = parseInt($(this).attr('href').split('#')[1], 10);
            google.maps.event.trigger(allMarkers[marker_index - 1], "click");
            if ($(window).width() > 1064) {
                if ($(".map-container").hasClass("fw-map")) {
                    $('html, body').animate({
                        scrollTop: $(".map-container").offset().top + "-110px"
                    }, 1000)
                    return false;
                }
            }
        });

        $('.nextmap-nav').hide()
        $('.prevmap-nav').hide()
        // Scroll enabling button
        var scrollEnabling = $('.scrollContorl');

        $(scrollEnabling).click(function (e) {
            e.preventDefault();
            $(this).toggleClass("enabledsroll");

            if ($(this).is(".enabledsroll")) {
                map.setOptions({ 'scrollwheel': true });
            } else {
                map.setOptions({ 'scrollwheel': false });
            }
        });
        
        var zoomControlDiv = document.createElement('div');
        var zoomControl = new ZoomControl(zoomControlDiv, map);
        function ZoomControl(controlDiv, map) {
            zoomControlDiv.index = 1;
            map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(zoomControlDiv);
            controlDiv.style.padding = '5px';
            var controlWrapper = document.createElement('div');
            controlDiv.appendChild(controlWrapper);
            var zoomInButton = document.createElement('div');
            zoomInButton.className = "mapzoom-in";
            controlWrapper.appendChild(zoomInButton);
            var zoomOutButton = document.createElement('div');
            zoomOutButton.className = "mapzoom-out";
            controlWrapper.appendChild(zoomOutButton);
            google.maps.event.addDomListener(zoomInButton, 'click', function () {
                map.setZoom(map.getZoom() + 1);
            });
            google.maps.event.addDomListener(zoomOutButton, 'click', function () {
                map.setZoom(map.getZoom() - 1);
            });
        }
        // Geo Location Button
        $(".geoLocation, .input-with-icon.location a").hide()
    }

    // function to add marker
    function addMyMarker(coords, content,map ){
        var marker = new google.maps.Marker({
        position:coords,
        map:map,
        //icon:props.iconImage
        });

        var infoWindow = new google.maps.InfoWindow({
            content:content
        });

        marker.addListener('click', function(){
            infoWindow.open(map, marker);
        });
        }

    // -------------- Custom Map Marker / End -------------- //	

    var head = document.getElementsByTagName('head')[0];

    // Save the original method
    var insertBefore = head.insertBefore;

    // Replace it!
    head.insertBefore = function (newElement, referenceElement) {

        if (newElement.href && newElement.href.indexOf('https://fonts.googleapis.com/css?family=Roboto') === 0) {
            return;
        }

        insertBefore.call(head, newElement, referenceElement);
    };

    var map = document.getElementById('map-main');
    if (typeof (map) != 'undefined' && map != null) {
        google.maps.event.addDomListener(window, 'load', mainMap);
    }
	
})(this.jQuery);