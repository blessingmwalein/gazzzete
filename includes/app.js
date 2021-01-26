Vue.component('population', {
  template: '#population',
  props:['data','country' ],
  data(){
      return {
         event: null,
         new_data:this.data,
         cities:[],
         population_loading:false,
         new_country: this.country
    }
  },
  mounted(){
      this.getCities()
      
  },
  methods: {
    getCities(){
      // console.log(this.new_data.name)
      var self = this;
      var cities_results = cities.filter(function(city) {
          return city.country.includes(self.new_country)
      })
     // console.log(cities_results)
     this.cities = cities_results.sort((a,b) => b.population-a.population).slice(0,12);
    },
   fomartNumbers(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
})

Vue.component('economy', {
  template: '#economy',
  props :['data','country'],
  data(){
      return {
        gdp:[],
        new_data:this.data,
        economy_loading:false,
        new_country:this.country
    }
  },
  mounted(){
    this.getgdp()
  },

  methods: {
    getgdp(){
       this.economy_loading = true
      // console.log(this.data)
      axios.get('./includes/php/tading_economics_gdp.php?country='+this.new_country)
      .then(respon=> {
        // console.log(respon)
        this.gdp = respon.data.data
        this.economy_loading = false
      }).catch(error=>{
        this.economy_loading = false
        console.log(error)
      })
    }
   
  }
})


Vue.component('links', {
  template: '#links',
  props :['data','country'],
  data(){
      return {
        links:{},
        new_data:this.data,
        new_country:this.country
    }
  },
  mounted(){
    this.getLinks()
  },
  methods: {
    getLinks(){
        // console.log(this.data)
        axios.post('./includes/php/geo_names_wikipedia.php?country='+this.new_country.replace(/ +/g, ""))
        .then(respon=> {
          // console.log(respon)
          this.links = respon.data.data
        }).catch(error=>{
          console.log(error)
        })
    }
  }
})


Vue.component('covid', {
  template: '#covid',
  props :['data','country'],
  data(){
      return {
        covid:{},
        new_data:this.data,
        new_country:this.country
    }
  },
  mounted(){
    this.getStates()
  },
  methods: {
    getStates(){
        // console.log(this.data)
        axios.get('./includes/php/covid_19.php?country='+this.new_country.replace(/ +/g, ""))
        .then(respon=> {
          console.log(respon)
          this.covid = respon.data.data
        }).catch(error=>{
          console.log(error)
        })
    }
  }
})


Vue.component('continent', {
  template: '#continent',
  props:['data'],
  data(){
      return {
        new_data:this.data,
        weather_data:{},
        weather_loading:false
    }
  },
  mounted(){
    this.getWeather()
  },
  methods: {
    getWeather(){
      this.weather_loading = true
      console.log(this.new_data)
      axios.get('./includes/php/openweather.php?lat='+this.new_data.latlng[0]+'&lon='+this.new_data.latlng[1])
      .then(respon=> {
        console.log(respon)
        this.weather_data = respon.data.data
        this.weather_loading = false
      }).catch(error=>{
        this.weather_loading = false
        console.log(error)
      })
    }
  }
})

Vue.component('location', {
  template: '#location',
  props:['data'],
  data: function(){
      return {
        new_data : this.data
    }
  },
  
  methods: {
   fomartNumbers(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
   
  }
})


//creating the vue app instance
window.onload = function () {
   new Vue({
    el: '#app',
    data: {
      currentView: 'population',
      isPopulation:true,
      isEconomy:false,
      isHistory:false,
      isLinks:false,
      isCovid:false,
      isContinent:false,
      isArea:false,
      isLocation:false,
      country_data:{},
      loading: false,
      country:""
    },
      created () {
        bus.$on('country-event', function (data) {
          console.log(data)
        })
      },

     mounted(){
      var self =this
        bus.$on('country-event',function(data) {
          self.getData(data.country_code, data.country)
        });      
      },
      beforeDestroy() {
        bus.$off()
      },
    methods: {
      updateComponent(value){
        console.log(value.country_code)
      },
     getData(code,country){
       this.country = country
       this.loading = true
        axios.get('./includes/php/restCountry.php?code='+code)
        .then(resp =>{
          this.country_data = resp.data.data
          this.loading = false
        }).catch(err=>{
          this.loading = falses
          console.log(err)
        })
      },
       population(){
        this.currentView ='population'
        this.isPopulation = true,
        this.isHistory = false,
        this.isEconomy = false,
        this.isLinks = false,
        this.isCovid = false,
        this.isContinent = false,
        this.isArea = false,
        this.isLocation = false
       },
       history(){
        this.currentView ='history'
        this.isPopulation = false,
        this.isEconomy = false,
        this.isHistory = true,
        this.isLinks = false,
        this.isCovid = false,
        this.isContinent = false,
        this.isArea = false,
        this.isLocation = false
       },
       links(){
        this.currentView ='links'
        this.isPopulation = false,
        this.isEconomy = false,
        this.isHistory = false,
        this.isLinks = true,
        this.isCovid = false,
        this.isContinent = false,
        this.isArea = false,
        this.isLocation = false
       },
       covid(){
        this.currentView ='covid'
        this.isPopulation = false,
        this.isEconomy = false,
        this.isHistory = false,
        this.isLinks = false,
        this.isCovid = true,
        this.isContinent = false,
        this.isArea = false,
        this.isLocation = false
       },
       continent(){
        this.currentView ='continent'
        this.isPopulation = false,
        this.isEconomy = false,
        this.isHistory = false,
        this.isLinks = false,
        this.isCovid = false,
        this.isContinent = true,
        this.isArea = false,
        this.isLocation = false
       },
       area(){
        this.currentView ='area-covered'
        this.isPopulation = false,
        this.isEconomy = false,
        this.isHistory = false,
        this.isLinks = false,
        this.isCovid = false,
        this.isContinent = false,
        this.isArea = true,
        this.isLocation = false
       },
       location(){
        this.currentView ='location'
        this.isPopulation = false,
        this.isEconomy = false,
        this.isHistory = false,
        this.isLinks = false,
        this.isCovid = false,
        this.isContinent = false,
        this.isArea = false,
        this.isLocation = true
       },
       economy(){
        this.currentView ='economy'
        this.isPopulation = false,
        this.isEconomy = true,
        this.isHistory = false,
        this.isLinks = false,
        this.isCovid = false,
        this.isContinent = false,
        this.isArea = false,
        this.isLocation = false

        console.log(this.currentView)
       }

    }
  });
}