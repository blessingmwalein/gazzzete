<!DOCTYPE HTML>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Globe - Country Profiles</title>
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <!--=============== css  ===============-->
    <link type="text/css" rel="stylesheet" href="./assets/css/reset.css">
    <link type="text/css" rel="stylesheet" href="./assets/css/plugins.css">
    <link type="text/css" rel="stylesheet" href="./assets/css/style.css">
    <link type="text/css" rel="stylesheet" href="./assets/css/color.css">
    <link type="text/css" rel="stylesheet" href="./assets/css/dashboard-style.css">
    <link type="text/css" rel="stylesheet" href="./assets/css/shop.css">

    <!--=============== favicons ===============-->
    <link rel="shortcut icon" href="./assets/images/favicon.ico">
    <style>
        ul{
            margin-left:10px
        }
        .gm-style-iw {
            
            width: 300px;
        }
        .gm-style-iw .gm-style-iw-c{
            max-width: 240px
        }
        .pac-container, .pac-item{
            z-index: 2147483647 !important;
         }
    </style>
</head>

<body>
    <!--loader-->
    <div class="loader-wrap">
        <div class="loader-inner">
            <div class="loader-inner-cirle"></div>
        </div>
    </div>
    <!--loader end-->
    <!-- main start  -->
    <div id="main">
        <!-- header -->
        <header class="main-header">
            <!-- header-search_btn-->
            <a href="" class="logo-holder">
                <h1 style="color: white">GAZETTEER</h1>
            </a>
           
            <!-- header-search_btn end-->
            <!-- header opt -->
            <a href="#" class="add-list color-bg" id="user_country"></a>
            <!-- nav-button-wrap-->
           
            <a href="#" class="nav-button-wrap add-list color-bg" id="user_country_2"></a>
                   
      

            <!-- navigation  end -->
            <!-- header-search_container -->
            <div class="header-search_container header-search vis-search">
                <div class="container small-container">
                    <div class="header-search-input-wrap fl-wrap">
                        <!-- header-search-input -->
                        <div class="header-search-input">
                            <label><i class="fal fa-keyboard"></i></label>
                            <input type="text" placeholder="Which place would you like to search ?" value="" />
                        </div>
                        <!-- header-search-input end -->
                        <!-- header-search-input -->
                        <div class="header-search-input location autocomplete-container">
                            <label><i class="fal fa-map-marker"></i></label>
                            <input type="text" placeholder="Location..." class="autocomplete-input" id="autocompleteid2"
                                value="" />
                            <a href="#"><i class="fal fa-dot-circle"></i></a>
                        </div>
                        <!-- header-search-input end -->
                        <!-- header-search-input -->
                        <div class="header-search-input location autocomplete-container">
                            <label><i class="fal fa-map-marker"></i></label>
                                <input type="text" class="form-control" placeholder="Seach By Country" id="searchInput" style="padding: 8px; " />
                         
                                <a href="#"><i class="fal fa-dot-circle"></i></a>
                            </div>
                        <!-- header-search-input end -->
                        <button  class="header-search-button green-bg" ><i
                                class="far fa-search"></i> Search </button>
                    </div>
                    <div class="header-search_close color-bg"><i class="fal fa-long-arrow-up"></i></div>
                </div>
            </div>
            <!-- header-search_container  end -->
        </header>
        <!-- header end-->
        <!-- wrapper-->
        <div id="wrapper">
            <!-- content-->
            <div class="content">
                <!-- Map -->

                <div class="row">
                     <div class="col-md-8">
                        <div class="  fw-map big_map hid-mob-map" style="height: 100%;">
                            <div style="height:700px" id="map-main"></div>
                            <div class="scrollContorl mapnavbtn tolt" data-microtip-position="top-left"
                                data-tooltip="Enable Scrolling"><span><i class="fal fa-unlock"></i></span></div>
                        </div>
                    </div>
                    <div id="" style="padding:20px" class="col-md-4">
                        <!--box-widget-item -->
                        <div class="box-widget-item fl-wrap block_box">
                            <div class="box-widget-item-header">
                                <h3 id="country_of_user"> </h3>
                            </div>
                            <div  class="box-widget opening-hours fl-wrap">
                                <div class="box-widget-content">
                                    <ul class="no-list-style">
                                        <li class="mon" id="flag"></li>

                                        <li class="mon" id="city_name"></li>
                                        <li class="tue" id="location_population"></li>
                                        <li class="wed" id="region"></li>
                                        <li class="thu" id="sub_region"></li>
                                        <li class="thu" id="currency_code"></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <!--box-widget-item end -->
                        <div  class="box-widget-item fl-wrap block_box">
                            <div class="box-widget-item-header">
                                <h3>Location Details</h3>
                            </div>
                            <div class="box-widget opening-hours fl-wrap">
                                <div class="box-widget-content">
                                    <ul class="no-list-style">
                                        <li class="fri" id="area_covered"></li>
                                        <li class="sat" id="location_latitude"></li>
                                        <li class="sun" id="location_longitude"></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Map end -->
                <div class="clearfix"></div>
                <!--component view to display parts which will be changing -->
                <section id="app" class="gray-bg main-dashboard-sec" id="sec1">
                    
                        <!--  dashboard-menu-->
                        <div class="col-md-3">
                            <div class="clearfix"></div>
                            <div class="fixed-bar fl-wrap" id="dash_menu">
                                <div class="user-profile-menu-wrap fl-wrap block_box" style="display: block;">
                                    <!-- user-profile-menu-->
                                    <div class="user-profile-menu">
                                        <h3>Demographic Details <span style="text-align: right; margin-left: 50px" ><img  height="40" width="40" :src="country_data.flag"></span></h3>
                                        <ul class="no-list-style">
                                            <li><a @click.prevent="population()"
                                                    :class="{'user-profile-act':isPopulation}"><i
                                                        class="fas fa-users"></i> Population</a></li>
                                            <li><a @click.prevent="economy()" :class="{'user-profile-act':isEconomy}"><i
                                                        class="fas fa-dollar-sign"></i>Economy<span>7</span></a></li>
                                            <li><a @click.prevent="links()" :class="{'user-profile-act':isLinks}"><i
                                                        class="fal fa-link"></i>Wikipedia Links<span>7</span></a></li>
                                            <li><a @click.prevent="covid()" :class="{'user-profile-act':isCovid}"><i
                                                        class="fal fa-link"></i>Covid 19 Statistics<span>7</span></a>
                                            </li>
                                        </ul>
                                    </div>
                                    <!-- user-profile-menu end-->
                                    <!-- user-profile-menu-->
                                    <div class="user-profile-menu">
                                        <h3>Geographic details</h3>
                                        <ul class="no-list-style">
                                            <li><a @click.prevent="location()"
                                                    :class="{'user-profile-act':isLocation}"><i
                                                        class="fas fa-location"></i> Location </a></li>
                                            <li><a @click.prevent="continent()"
                                                    :class="{'user-profile-act':isContinent}"><i
                                                        class="fas fa-map-pin"></i>Weather</a></li>
                                       
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- dashboard-menu  end-->
                        <!-- dashboard content-->
                        <!--the changing component and i have binded current view to the data in the vue app-->
                        <component @country-event="updateComponent" v-if="!loading" :country="country" :data="country_data" :is="currentView"></component>
                        <!-- dashboard content end-->
                    
                </section>
                <div class="limit-box fl-wrap"></div>
            </div>
            <!--content end-->
        </div>
        <!-- wrapper end-->

    </div>
    <template  id="population">
       
            <div class="col-md-9">

                <div class="dashboard-title fl-wrap">
                    <h3>Population</h3>
                </div>

                <div class="list-single-facts fl-wrap">
                    <div class="row">
                        <div class="col-md-4">
                            <!-- inline-facts -->
                            <div class="inline-facts-wrap gradient-bg ">
                                <div class="inline-facts">
                                    <i class="fal fa-chart-bar"></i>
                                    <div class="milestone-counter">
                                        <div class="stats animaper">
                                            <div class="num" data-content="0" data-num="1054">+{{new_data.callingCodes[0]}}</div>
                                        </div>
                                    </div>
                                    <h6>Calling Codes</h6>
                                </div>
                                <div class="stat-wave">
                                    <svg viewbox="0 0 100 25">
                                        <path fill="#fff" d="M0 30 V12 Q30 17 55 2 T100 11 V30z" />
                                    </svg>
                                </div>
                            </div>
                            <!-- inline-facts end -->
                        </div>
                        <div class="col-md-4">
                            <!-- inline-facts  -->
                            <div class="inline-facts-wrap gradient-bg ">
                                <div class="inline-facts">
                                    <i class="fal fa-comments-alt"></i>
                                    <div class="milestone-counter">
                                        <div class="stats animaper">
                                            <div class="num" data-content="0" data-num="2557">{{cities.length}}</div>
                                        </div>
                                    </div>
                                    <h6>Cities</h6>
                                </div>
                                <div class="stat-wave">
                                    <svg viewbox="0 0 100 25">
                                        <path fill="#fff" d="M0 30 V12 Q30 17 55 12 T100 11 V30z" />
                                    </svg>
                                </div>
                            </div>
                            <!-- inline-facts end -->
                        </div>
                        <div class="col-md-4">
                            <!-- inline-facts  -->
                            <div class="inline-facts-wrap gradient-bg ">
                                <div class="inline-facts">
                                    <i class="fal fa-envelope-open-dollar"></i>
                                    <div class="milestone-counter">
                                        <div class="stats animaper">
                                            <div class="num" data-content="0" data-num="125">{{fomartNumbers(new_data.population)}}</div>
                                        </div>
                                    </div>
                                    <h6>Population </h6>
                                </div>
                                <div class="stat-wave">
                                    <svg viewbox="0 0 100 25">
                                        <path fill="#fff" d="M0 30 V12 Q30 12 55 5 T100 11 V30z" />
                                    </svg>
                                </div>
                            </div>
                            <!-- inline-facts end -->
                        </div>
                    </div>
                </div>
 
                <div class="box-widget-item fl-wrap block_box">
                    <div class="box-widget-item-header">
                        <h3>Languages</h3>
                    </div>
                    <div class="box-widget fl-wrap">
                        <div class="box-widget-content">
                            <div class="list-single-tags tags-stylwrap">
                                <a v-for="language in data.languages" href="#"><span style="margin-right: 5px;">{{language.iso639_2}}</span>{{language.name}}</a>                                                                               
                            </div>
                        </div>
                    </div>
                </div>
                <!-- profile-edit-container-->
                <div class=" fl-wrap">
                    <h4 class="cart-ttitle ">Cities</h4>
                    <table class="table table-border checkout-table">
                        <tbody>
                            <tr>
                                <th></th>
                                <th>City Name</th>
                                <th >Latitude</th>
                                <th>Longitude</th>
                                <th>Population</th>
                            </tr>
                            <tr v-for="(city, index) in cities">
                                <td>
                                    <h5 class="product-price">{{index+1}}</h5>
                                </td>
                                <td>
                                    <h5 class="product-name">{{city.admin_name}}</h5>
                                </td>
                                <td>
                                    <h5 class="product-name">{{city.lat}}</h5>
                                </td>
                                <td>
                                    <h5 class="product-name">{{city.lng}}</h5>
                                </td>
                               
                                <td>
                                    <h5 class="product-name">{{fomartNumbers(city.population)}}</h5>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- profile-edit-container end-->
            </div>
    </template>

    <template v-if="!economy_loading" id="economy">
        <div class="col-md-9">
            <!-- list-single-facts -->
            <div class="col-md-12">
                <div class="dashboard-title fl-wrap">
                    <h3>Economy</h3>
                </div>
                <div class="box-widget-item fl-wrap block_box">
                    <div class="box-widget-item-header">
                        <h3>Currencies</h3>
                    </div>
                    <div class="box-widget fl-wrap">
                        <div class="box-widget-content">
                            <div class="list-single-tags tags-stylwrap">
                                <a v-for="currency in data.currencies" href="#"><span style="margin-right: 5px;">{{currency.symbol}}</span>{{currency.name}}</a>                                                                               
                            </div>
                        </div>
                    </div>
                </div>
                <!-- profile-edit-container-->

                
                    <div class="dashboard-title   fl-wrap">
                        <h3>Gross Domestic Product</h3>
                    </div>
                    <!-- dashboard-list-box-->
                    <div class="dashboard-list-box mar-dash-list fl-wrap">
                   
                        <!-- dashboard-list end-->
                        <div class="dashboard-list fl-wrap">
                            <div class="dashboard-message">
                                <span class="new-dashboard-item"><i class="fal fa-times"></i></span>
                                <div class="dashboard-message-text">
                                    <i class="fas fa-dollar-sign purp-bg"></i>
                                    <p><a href="#">Previous Year Gross Domestic Product</a> <br> <a href="#">${{gdp[gdp.length-1].Value}}</a></p>                                </div>
                                <div class="dashboard-message-time"><i class="fal fa-calendar-week"></i>{{gdp[gdp.length-1].LastUpdate}}</div>
                            </div>
                        </div>
                        <!-- dashboard-list end-->
                        <!-- dashboard-list end-->
                    </div>
            </div>
        </div>
    </template>


    <template id="links">
        <div class="col-md-9">
            


            <div class="col-md-12">

                <div class="dashboard-title fl-wrap">
                    <h3>Wikipedia Links</h3>
                </div>
 
                <article v-for="link in links.geonames" class="post-article">
                    
                    <div style="border-radius: 10px;" class="list-single-main-item fl-wrap block_box">
                        <h2 class="post-opt-title"><a :href="'https://'+link.wikipediaUrl">{{link.title}}</a></h2>
                        <p>{{link.summary}}</p>
                        <span class="fw-separator"></span>
                        <div class="post-author"><a href="#"><img :src="link.thumbnailImg" alt=""></div>
                        <div class="post-opt">
                            <ul class="no-list-style">
                                <li><i class="fal fa-location"></i>Elevation <span>{{link.elevation}}</span></li>
                                <li><i class="fal fa-unlock"></i>Distance <span>{{link.distance}}</span></li>
                            </ul>
                        </div>
                        <a :href="'https://'+link.wikipediaUrl" alt="" class="btn  color2-bg  float-btn">Wikipedia link<i class="fal fa-angle-right"></i></a>
                    </div>
                </article>
 
            </div>
        </div>
    </template>

    <template id="covid">
        <div class="col-md-9">
            
            <!-- list-single-facts -->


            <div class="col-md-12">
                <div class="dashboard-title fl-wrap">
                    <h3>Covid 19 stats and other infections</h3>
                </div>

                <div class="box-widget-item fl-wrap block_box">
                    <div class="box-widget-item-header">
                        <h3>Covid 19 Cases</h3>
                    </div>
                    <div class="box-widget fl-wrap">
                        <div class="box-widget-content">
                            <div class="list-single-tags tags-stylwrap">
                                <div class="dashboard-header-stats">
                                    <div class="swiper-container swiper-container-horizontal" style="cursor: grab;">
                                        <div class=" row">
                                            <!--  dashboard-header-stats-item -->
                                            <div class="swiper-slide col-md-4" style="width: 30%; margin-right: 10px;margin-bottom: 10px;">
                                                <div class="dashboard-header-stats-item">
                                                    <i class="fal fa-users"></i>
                                                    Active Cases
                                                    <span>{{covid['Active Cases_text' ]}}</span>
                                                </div>
                                            </div>
                                  
                                            <div class="swiper-slide col-md-4" style="width: 30%; margin-right: 10px;margin-bottom: 10px;">
                                                <div class="dashboard-header-stats-item">
                                                    <i class="fal fa-users"></i>
                                                    Total Cases
                                                    <span>{{covid['Total Cases_text']}}</span>
                                                </div>
                                            </div>
                                            <!--  dashboard-header-stats-item end -->
                                            <!--  dashboard-header-stats-item -->
                                            <div class="swiper-slide col-md-4" style="width: 30%; margin-right: 10px;margin-bottom: 10px;">
                                                <div class="dashboard-header-stats-item">
                                                    <i class="fal fa-users"></i>
                                                    Total Deaths
                                                    <span>{{covid['Total Deaths_text']}}</span>
                                                </div>
                                            </div>
                                            <!--  dashboard-header-stats-item end -->
                                            <div class="swiper-slide col-md-4" style="width: 30%; margin-right: 10px;margin-bottom: 10px;">
                                                <div class="dashboard-header-stats-item">
                                                    <i class="fal fa-users"></i>
                                                    Total Recoveries
                                                    <span>{{covid['Total Recovered_text']}}</span>
                                                </div>
                                            </div>

                                            <div class="swiper-slide col-md-4" style="width: 30%; margin-right: 10px;margin-bottom: 10px;">
                                                <div class="dashboard-header-stats-item">
                                                    <i class="fal fa-calendar-week"></i>
                                                     Last Update
                                                    <span>{{covid['Last Update']}}</span>
                                                </div>
                                            </div>

                                            <div class="swiper-slide col-md-4" style="width: 30%; margin-right: 10px;margin-bottom: 10px;">
                                                <div class="dashboard-header-stats-item">
                                                    <i class="fal fa-calendar-week"></i>
                                                    Country
                                                    <span>{{covid['Country_text']}}</span>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

         
            </div>
        </div>
    </template>

    <template v-if="!weather_loading" id="continent">
        <div class="col-md-9">
        
            <div class="col-md-12">
                <div class="dashboard-title fl-wrap">
                <h3>Weather</h3>
            </div>
            <!-- list-single-facts -->
            <div class="box-widget-item fl-wrap block_box">
                   <div class="box-widget-item-header">
                        <h3>Current Weather({{weather_data.current.last_updated}})</h3>
                    </div>
                    <div class="box-widget fl-wrap">
                            <div class="box-widget-content">
                                <div class="list-single-tags tags-stylwrap">
                                    <div class="dashboard-header-stats">
                                        <div class="swiper-container swiper-container-horizontal" style="cursor: grab;">
                                            <div class=" row">
                                                <!--  dashboard-header-stats-item -->
                                                <div class="swiper-slide col-md-4" style="width: 30%; margin-right: 10px;margin-bottom: 10px;">
                                                    <div class="dashboard-header-stats-item">
                                                        <i class="fal fa-temperature-low"></i>
                                                        Temprature
                                                        <span>{{weather_data.current.temp_c}}°C</span>
                                                    </div>
                                                </div>
                                      
                                                <div class="swiper-slide col-md-4" style="width: 30%; margin-right: 10px;margin-bottom: 10px;">
                                                    <div class="dashboard-header-stats-item">
                                                        <i class="fal fa-humidity"></i>
                                                        Humidity
                                                        <span>{{weather_data.current.humidity}}%</span>
                                                    </div>
                                                </div>
                                                <!--  dashboard-header-stats-item end -->
                                                <!--  dashboard-header-stats-item -->
                                                <div class="swiper-slide col-md-4" style="width: 30%; margin-right: 10px;margin-bottom: 10px;">
                                                    <div class="dashboard-header-stats-item">
                                                        <i class="fal fa-temperature-low"></i>
                                                        Feels Like
                                                        <span>{{weather_data.current.feelslike_c}}°C</span>
                                                    </div>
                                                </div>
                                                <!--  dashboard-header-stats-item end -->
                                                <div class="swiper-slide col-md-4" style="width: 30%; margin-right: 10px;margin-bottom: 10px;">
                                                    <div class="dashboard-header-stats-item">
                                                        <i class="fal fa-tire-pressure-warning"></i>
                                                        Pressure
                                                        <span>{{weather_data.current.pressure_mb}}mbp</span>
                                                    </div>
                                                </div>

                                                <div class="swiper-slide col-md-4" style="width: 30%; margin-right: 10px;margin-bottom: 10px;">
                                                    <div class="dashboard-header-stats-item">
                                                        <i class="fal fa-clouds"></i>
                                                        Clouds
                                                        <span>{{weather_data.current.cloud}}%</span>
                                                    </div>
                                                </div>
                                                 <div class="swiper-slide col-md-4" style="width: 30%; margin-right: 10px;margin-bottom: 10px;">
                                                    <div class="dashboard-header-stats-item">
                                                        <i class="fal fa-clouds"></i>
                                                        Clouds Condition
                                                        <span>{{weather_data.current.condition.text}}</span>
                                                    </div>
                                                </div>

                                                <div class="swiper-slide col-md-4" style="width: 30%; margin-right: 10px;margin-bottom: 10px;">
                                                    <div class="dashboard-header-stats-item">
                                                        <i class="fal fa-wind"></i>
                                                        Wind
                                                        <span>{{weather_data.current.wind_mph}}mph</span>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>

            <div class="box-widget-item fl-wrap block_box">
                   <div class="box-widget-item-header">
                        <h3>Next Day Weather Forecast({{weather_data.forecast.forecastday[0].date}})</h3>
                    </div>
                    <div class="box-widget fl-wrap">
                            <div class="box-widget-content">
                                <div class="list-single-tags tags-stylwrap">
                                    <div class="dashboard-header-stats">
                                        <div class="swiper-container swiper-container-horizontal" style="cursor: grab;">
                                            <div class=" row">
                                                <!--  dashboard-header-stats-item -->
                                                <div class="swiper-slide col-md-4" style="width: 30%; margin-right: 10px;margin-bottom: 10px;">
                                                    <div class="dashboard-header-stats-item">
                                                        <i class="fal fa-temperature-low"></i>
                                                        Average Temprature
                                                        <span>{{weather_data.forecast.forecastday[0].day.avgtemp_c}}°C</span>
                                                    </div>
                                                </div>
                                      
                                                <div class="swiper-slide col-md-4" style="width: 30%; margin-right: 10px;margin-bottom: 10px;">
                                                    <div class="dashboard-header-stats-item">
                                                        <i class="fal fa-humidity"></i>
                                                       Average Humidity
                                                        <span>{{weather_data.forecast.forecastday[0].day.avghumidity}}%</span>
                                                    </div>
                                                </div>
                                                <!--  dashboard-header-stats-item end -->
                                                 <div class="swiper-slide col-md-4" style="width: 30%; margin-right: 10px;margin-bottom: 10px;">
                                                    <div class="dashboard-header-stats-item">
                                                        <i class="fal fa-clouds"></i>
                                                        Clouds Condition
                                                        <span>{{weather_data.forecast.forecastday[0].day.condition.text}}</span>
                                                    </div>
                                                </div>

                                                <div class="swiper-slide col-md-4" style="width: 30%; margin-right: 10px;margin-bottom: 10px;">
                                                    <div class="dashboard-header-stats-item">
                                                        <i class="fal fa-wind"></i>
                                                        MAx wind speed
                                                        <span>{{weather_data.forecast.forecastday[0].day.maxwind_mph}}mph</span>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </template>


    <template id="location">
        <div class="col-md-9">
           

            <div class="col-md-12">

                  <div class="dashboard-title fl-wrap">
                    <h3>Location Details</h3>
                </div>

                <div class="box-widget-item fl-wrap block_box">
                    <div class="box-widget-item-header">
                        <h3>Location</h3>
                    </div>
                    <div class="box-widget fl-wrap">
                        <div class="box-widget-content">
                            <div class="list-single-tags tags-stylwrap">
                                <div class="dashboard-header-stats">
                                    <div class="swiper-container swiper-container-horizontal" style="cursor: grab;">
                                        <div class=" row">
                                            <!--  dashboard-header-stats-item -->
                                            <div class="swiper-slide col-md-4" style="width: 30%; margin-right: 10px;margin-bottom: 10px;">
                                                <div class="dashboard-header-stats-item">
                                                    <i class="fal fa-map-marked-alt"></i>
                                                   Latitude
                                                    <span>{{new_data.latlng[0]}}</span>
                                                </div>
                                            </div>
                                  
                                            <div class="swiper-slide col-md-4" style="width: 30%; margin-right: 10px;margin-bottom: 10px;">
                                                <div class="dashboard-header-stats-item">
                                                    <i class="fal fa-map-marked-alt"></i>
                                                   Longitude
                                                    <span>{{new_data.latlng[1]}}</span>
                                                </div>
                                            </div>
                                            <!--  dashboard-header-stats-item end -->
                                            <!--  dashboard-header-stats-item -->
                                            <div class="swiper-slide col-md-4" style="width: 30%; margin-right: 10px;margin-bottom: 10px;">
                                                <div class="dashboard-header-stats-item">
                                                    <i class="fal fa-location"></i>
                                                    Region
                                                    <span>{{new_data.region}}</span>
                                                </div>
                                            </div>
                                            <!--  dashboard-header-stats-item end -->
                                            <div class="swiper-slide col-md-4" style="width: 30%; margin-right: 10px;margin-bottom: 10px;">
                                                <div class="dashboard-header-stats-item">
                                                    <i class="fal fa-location "></i>
                                                   Sub Region
                                                    <span>{{new_data.subregion}}</span>
                                                </div>
                                            </div>

                                            <div class="swiper-slide col-md-4" style="width: 30%; margin-right: 10px;margin-bottom: 10px;">
                                                <div class="dashboard-header-stats-item">
                                                    <i class="fal fa-chart-area"></i>
                                                   Area
                                                    <span>{{fomartNumbers(new_data.area)}}</span>
                                                </div>
                                            </div>

                                            <div class="swiper-slide col-md-4" style="width: 30%; margin-right: 10px;margin-bottom: 10px;">
                                                <div class="dashboard-header-stats-item">
                                                    <i class="fal fa-times-circle"></i>
                                                    Time Zone
                                                    <span>{{new_data.timezones[0]}}</span>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

             <div class="box-widget-item fl-wrap block_box">
                    <div class="box-widget-item-header">
                        <h3>Country Borders</h3>
                    </div>
                    <div class="box-widget fl-wrap">
                        <div class="box-widget-content">
                            <div class="list-single-tags tags-stylwrap">
                                <a v-for="border in data.borders" href="#">{{border}}</a>                                                                               
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </template>
 
 
    <!--=============== scripts  ===============-->
    <script src="./assets/js/jquery.min.js"></script>
    <script src="./assets/js/plugins.js"></script>
    <script src="./assets/js/scripts.js"></script>
    <!-- <script src="./assets/js/dashboard.js"></script> -->

    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?libraries=geometry,places&key=AIzaSyDDM2_SEiH2ZsB2_recgP3vKSxHHrCLN3A"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>
    <script src="./event_bus.js"></script>
    <script src="./includes/api.js"></script>
    <script src="./assets/js/map-plugins.js"></script>
    <script src="./assets/js/map-listing.js"></script>
    <script src="./data.js"></script>
    <script src="./includes/app.js"></script>
    <!-- <script src="./countryBorders.geo.js"></script> -->
</body>
</html>