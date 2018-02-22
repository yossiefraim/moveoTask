
$(document).ready(function(){
        //handle the onLoad data
        //get data from crawler api
            $.post("https://shrouded-tundra-98702.herokuapp.com/city",
            {
                city: "tel aviv"
            },
            function(data,status){
                console.log(data);

                $(`.jumbotron>h2`).html("Current Weather in "+ data.city);

                //if there >40% chance for rain->alert
                if(parseInt(data.rain[0])>40){
                    $(`.jumbotron>.rain`).html("It Rainy outside with  "+ data.rain[0]+"% of rain<br>");
                }

                $(`.jumbotron>.temp`).html("Temperature is "+ data.now[0]+"<br>");
                $(`.jumbotron>.feels`).html("Feels like "+ data.feel[0]+"<br>");
                $(`.jumbotron>.wind`).html("Wind "+ data.wind[0]+" (mph)<br>");
                $(`.jumbotron>.humidity`).html("Humidity "+ data.humidity[0]+"<br>");
                
                for(let i = 0;i<6;i++){
                    $(`.card.h-100.${i}>a>.card-img-top`).attr("src",`img/${data.icon[i]}.svg`);
                    $(`.card.h-100.${i}>.card-body>.card-title`).html(data.days[i]);
                    $(`.card.h-100.${i}>.card-body>.card-text.day`).html("Day Temp is " + data.dayTemp[i]);
                    $(`.card.h-100.${i}>.card-body>.card-text.night`).html("Night Temp is " + data.nightTemp[i] + "</p><p> Wind average"+ data.averageWind[i]+" (mph)</p><p>"+"Humidity average "+ data.averageHumidity[i]);
                 }
            
             });

        
        //handle TLV data (1st City)
        $(".btn.btn-primary.TLV").click(function(){
            $.post("https://shrouded-tundra-98702.herokuapp.com/city",
            {
                city: "tel aviv"
            },
            function(data,status){

                $(`.jumbotron>h2`).html("Current Weather in "+ data.city);
                $(`.jumbotron>.temp`).html("Temp is "+ data.now[0]+"<br>");
                $(`.jumbotron>.feels`).html("Feels like "+ data.feel[0]+"<br>");
                $(`.jumbotron>.wind`).html("Wind "+ data.wind[0]+"<br>");
                $(`.jumbotron>.humidity`).html("Humidity "+ data.humidity[0]+"<br>");
                for(let i = 0;i<6;i++){
                    $(`.card.h-100.${i}>a>.card-img-top`).attr("src",`img/${data.icon[i]}.svg`);
                    $(`.card.h-100.${i}>.card-body>.card-title`).html(data.days[i]);
                    $(`.card.h-100.${i}>.card-body>.card-text.day`).html("Day Temp is " + data.dayTemp[i]+ "<br>");
                    $(`.card.h-100.${i}>.card-body>.card-text.night`).html("Night Temp is " + data.nightTemp[i] + "</p><p> Wind average"+ data.averageWind[i]+" (mph)</p><p>"+"Humidity average "+ data.averageHumidity[i]);

                 }
            
             });
        });

        //handle NYC data (second City)
        $(".btn.btn-primary.NYC").click(function(){
            $.post("https://shrouded-tundra-98702.herokuapp.com/city",
            {
                city: "new york"
            },
            function(data,status){

                $(`.jumbotron>h2`).html("Current Weather in "+ data.city);
                if(data.rain[0])
                $(`.jumbotron>.temp`).html("Temp is "+ data.now[0]+"<br>");
                $(`.jumbotron>.feels`).html("Feels like "+ data.feel[0]+"<br>");
                $(`.jumbotron>.wind`).html("Wind "+ data.wind[0]+"<br>");
                $(`.jumbotron>.humidity`).html("Humidity "+ data.humidity[0]+"<br>");
                for(let i = 0;i<6;i++){
                    $(`.card.h-100.${i}>a>.card-img-top`).attr("src",`img/${data.icon[i]}.svg`);
                    $(`.card.h-100.${i}>.card-body>.card-title`).html(data.days[i]);
                    $(`.card.h-100.${i}>.card-body>.card-text.day`).html("Day Temp is " + data.dayTemp[i]+ "<br>");
                    $(`.card.h-100.${i}>.card-body>.card-text.night`).html("Night Temp is " + data.nightTemp[i] + "</p><p> Wind average"+ data.averageWind[i]+" (mph)</p><p>"+"Humidity average "+ data.averageHumidity[i]);

                 }
            
             });
        });

        //handle the search
        $(".btn.btn-primary.sub").click(function(){
            var temp = $("input#city").val();
            $.post("https://shrouded-tundra-98702.herokuapp.com/city",
            {
                city: temp
            },
            function(data,status){

                $(`.jumbotron>h2`).html("Current Weather in "+ data.city);

                console.log("rain" + parseInt(data.rain[0]));
                if(parseInt(data.rain[0])>40){
                    $(`.jumbotron>.rain`).html("It Rainy outside with  "+ data.rain[0]+"% of rain<br>");
                }

                $(`.jumbotron>.temp`).html("Temp is "+ data.now[0]+"<br>");
                $(`.jumbotron>.feels`).html("Feels like "+ data.feel[0]+"<br>");
                $(`.jumbotron>.wind`).html("Wind "+ data.wind[0]+"<br>");
                $(`.jumbotron>.humidity`).html("Humidity "+ data.humidity[0]+"<br>");
                for(let i = 0;i<6;i++){
                    $(`.card.h-100.${i}>a>.card-img-top`).attr("src",`img/${data.icon[i]}.svg`);
                    $(`.card.h-100.${i}>.card-body>.card-title`).html(data.days[i]);
                    $(`.card.h-100.${i}>.card-body>.card-text.day`).html("Day Temp is " + data.dayTemp[i]+ "<br>");
                    $(`.card.h-100.${i}>.card-body>.card-text.night`).html("Night Temp is " + data.nightTemp[i] + "</p><p> Wind average"+ data.averageWind[i]+" (mph)</p><p>"+"Humidity average "+ data.averageHumidity[i]);

                 }
            
             });
            $("input#city").val('');
        });
            
        
});