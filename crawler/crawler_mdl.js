const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      rp = require('request-promise'),
      cheerio = require('cheerio');

var cityUrl;

var weeklyForecast = {
        "city":String,
        "now":[],
        "feel":[],
        "days":[],
        "dayTemp":[],
        "nightTemp":[],
        "wind":[],
        "averageWind":[],
        "humidity":[],
        "averageHumidity":[],
        "rain":[],
        "icon":[]
}

exports.getCity = ((city)=>{
        //promise that crawler
        let query = new Promise((resolve,reject)=>{
          var yahoo ="https://search.yahoo.com/search;_ylt=AwrBTzxp9I1aJCMAQdVXNyoA;_ylc=X1MDMjc2NjY3OQRfcgMyBGZyA3NmcARncHJpZANtZmE4V2xtcVJnVzF4Zlc2a0RzSEFBBG5fcnNsdAMwBG5fc3VnZwMwBG9yaWdpbgNzZWFyY2gueWFob28uY29tBHBvcwMwBHBxc3RyAwRwcXN0cmwDMARxc3RybAM0NgRxdWVyeQNuZXclMjB5b3JrJTIwd2VhdGhlciUyMGZvcmVjYXN0JTIwbWV0JTIwb2ZmaWNlBHRfc3RtcAMxNTE5MjUyNjIx?p="+city+"+weather+forecast+met+office&fr2=sb-top&fr=sfp";
    
            var searchEngine = {
                uri: yahoo,
                transform: function (body) {
                    return cheerio.load(body);
                }
            };
            
            //crawler  yahoo with choosen city + metOffice web site and searching for the first URL

            rp(searchEngine)
                .then(function ($) {
                    var result = [];
                    
                    $('.options-toggle a').each(function(i,elem){
                        result[i] = $(this).attr('href');
                    });

                    console.log("url = " + result[0]);
                    cityUrl = result[0];

                    var cityWeather = {
                        uri: cityUrl,
                        transform: function (body) {
                            return cheerio.load(body);
                        }
                    };
            //crawler city wheather
                    rp(cityWeather)
                        .then(function ($) {
                            console.log("step 2");
                            console.log("Visiting page " + cityUrl);
                            console.log("City: " +$('#location-search').attr('data-name'));

                            weeklyForecast.city = $('#location-search').attr('data-name');
                            console.log("city: "+weeklyForecast.city);

                            $('.weatherTemp td i').each(function(i,elem){
                                weeklyForecast.now[i] = $(this).text();
                                weeklyForecast.now[i] = weeklyForecast.now[i].replace(/\s/g, '');
                            });
                            $('.weatherFeel td').each(function(i,elem){
                                weeklyForecast.feel[i] = $(this).text();
                                weeklyForecast.feel[i] = weeklyForecast.feel[i].replace(/\s/g, '');
                            });
                            $('.long-date').each(function(i,elem){
                                weeklyForecast.days[i] = $(this).text();
                            });
                            $('.dayTemp').each(function(i,elem){
                                //collect day temperature
                                weeklyForecast.dayTemp[i] = $(this).text();
                                //string cosmetics
                                weeklyForecast.dayTemp[i] = weeklyForecast.dayTemp[i].replace(/\s/g, '');
                            });
                            $('.nightTemp').each(function(i,elem){
                                //collect night temperature
                                weeklyForecast.nightTemp[i] = $(this).text();
                                //string cosmetics
                                weeklyForecast.nightTemp[i] = weeklyForecast.nightTemp[i].replace(/\s/g, '');
                            });
                            $('.weatherWind td i').each(function(i,elem){
                                //collect day wind
                                weeklyForecast.wind[i] = $(this).text();
                                //string cosmetics
                                weeklyForecast.wind[i] = weeklyForecast.wind[i].replace(/\s/g, '');
                            });
                            $('.weatherHumidity td').each(function(i,elem){
                
                                //collect day humidity
                                weeklyForecast.humidity[i]= $(this).text();
                                //string cosmetics
                                weeklyForecast.humidity[i] = weeklyForecast.humidity[i].replace(/\s/g, '');
                            });
                            $('.weatherRain td').each(function(i,elem){
                
                                //collect day humidity
                                weeklyForecast.rain[i]= $(this).text();
                                //string cosmetics
                                weeklyForecast.rain[i] = weeklyForecast.rain[i].replace(/\s/g, '');
                                weeklyForecast.rain[i] = weeklyForecast.rain[i].replace(/%/g, '');
                                weeklyForecast.rain[i] = weeklyForecast.rain[i].replace(/>/g, '');
                                weeklyForecast.rain[i] = weeklyForecast.rain[i].replace(/</g, '');
                                weeklyForecast.rain[i] = weeklyForecast.rain[i].replace(/≥/g, '');
                                weeklyForecast.rain[i] = weeklyForecast.rain[i].replace(/≤/g, '');

                            });
                            $('.tabDayTemp img').each(function(i,elem){
                
                                //collect day humidity
                                weeklyForecast.icon[i]= $(this).attr('title');
                                console.log("img = " + weeklyForecast.icon[i]);
                                //string cosmetics
                            });


                            weeklyForecast.averageWind[0] = weeklyForecast.wind[3];
                            weeklyForecast.averageWind[1] = weeklyForecast.wind[20];
                            weeklyForecast.averageWind[2] = weeklyForecast.wind[42];
                            weeklyForecast.averageWind[3] = weeklyForecast.wind[50];
                            weeklyForecast.averageWind[4] = weeklyForecast.wind[59];
                            weeklyForecast.averageWind[5] = weeklyForecast.wind[67];
                            weeklyForecast.averageWind[6] = weeklyForecast.wind[70];
                
                            weeklyForecast.averageHumidity[0] = weeklyForecast.humidity[3];
                            weeklyForecast.averageHumidity[1] = weeklyForecast.humidity[20];
                            weeklyForecast.averageHumidity[2] = weeklyForecast.humidity[42];
                            weeklyForecast.averageHumidity[3] = weeklyForecast.humidity[50];
                            weeklyForecast.averageHumidity[4] = weeklyForecast.humidity[59];
                            weeklyForecast.averageHumidity[5] = weeklyForecast.humidity[67];
                            weeklyForecast.averageHumidity[6] = weeklyForecast.humidity[70];
                

                            for(var i =0;i<7;i++){
                                console.log(weeklyForecast.days[i]);
                                console.log("Day temp is " + weeklyForecast.dayTemp[i]);
                                console.log("Night temp is " + weeklyForecast.nightTemp[i]);
                                console.log("now temp is " + weeklyForecast.now[i]);
                                console.log("wind average is " + weeklyForecast.averageWind[i]);
                                console.log("rain is is " + weeklyForecast.rain[i]+"\n");
                            
                            } 
                        resolve(weeklyForecast);
                    })
                    .catch(function (err) {
                         console.log("Error: " + err);
                         reject("Error: " + err);
                    });
                })
                .catch(function (err) {
                    console.log("Error: " + err);
                    reject("Error: " + err);
            });

        });
        return query.then((fromReslove)=>{
          return fromReslove;
        }).catch((fromReject)=>{
          return fromReject;
        });
});

