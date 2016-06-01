var ID = 10112025; //5661031
var authentication = "b6d69060589a4ebe5c4efbcb5069bf2d50224bf2";
var weatherKey = "81c978e8db7b136e4bf3c8988c2d90a6";

function ajaxRequest(){
    console.log (document.getElementById('token').value);

    /* This code figues out if the ID or authentication need to be updated */
    if (document.getElementById('segmentID').value != ""){
        ID = document.getElementById('segmentID').value;
        console.log(14468760552);
    }
    if (document.getElementById('token').value != ""){
        authentication = document.getElementById('token').value;
    }

    $.getJSON( "https://www.strava.com/api/v3/segments/" + ID + "/leaderboard?&access_token=" + authentication + "&callback=?", function (data) {
        // data is read
        //console.log(data.entries[x]);
        var output = [];
        var start = data.entries[0].rank;

        //var startCord = data.entries[0].start_latlng;
        //console.log("Coordinate: " + startCord);

        for(var x = 0; x < data.entries.length; x++){
            output.push({
                rank: (start + x) + getFinisherSuffix((start + x) +""),
                name: data.entries[x].athlete_name,
                date: data.entries[x].start_date.substring(0, 10),
                averageSpeed: getAverageSpeed(data.entries[x].elapsed_time, data.entries[x].distance),
                wind: "Unknown",
                influenceRating: "0.0 - No Influence"
            });
            //document.write(data.entries[x].moving_time/60 + "minutes by: " + data.entries[x].athlete_name + " <br>");
        }
        console.log(output[0]);
        $("#computed tr td").remove();
        for(var x = 0; x < data.entries.length; x++){

            $('#computed tr:last').after('<tr><td> ' + output[x].rank + '</td> <td>' + output[x].name + ' </td> <td> ' 
                + output[x].date + '</td><td>' + output[x].averageSpeed + 'km/h</td><td>'
                + output[x].wind + '</td><td>' + output[x].influenceRating + '</td> </tr>');
        }
        console.log(data);
    });
}

/* This method gets the weather information for a given lat, long and date! */
/*function getWeatherInfo(lat, long, date){
    $.getJSON( "https://api.forecast.io/forecast/" + weatherKey + "/" + lat + "," + long"," + date + "?units=ca", function (data) {
        console.log(data);
        console.log(data.windSpeed + " =Wind Speed");
        console.log(data.windBearing + " =Wind Bearing");
        return {windSpeed=data.windSpeed, windBearing=data.windBearing};
    });
} */

//ajaxRequest();