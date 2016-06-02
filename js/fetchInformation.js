/* The purpose of these methods are to get information through AJAX requests 
    http://cors.io/?u=
    https://crossorigin.me/
*/
var output = [];
var ID = 10112025; //5661031
var authentication = "b6d69060589a4ebe5c4efbcb5069bf2d50224bf2";
var weatherKey = "81c978e8db7b136e4bf3c8988c2d90a6";
var done = 0;

function ajaxRequest(){
    done = 0;
    update();
}

function update(){
    updateAccess();
    getLeaderboard();
    //getLocation();
    //getWeatherInformation();
    //updateTable();
    console.log("DONE!");
}

function updateAccess(){
    if (document.getElementById('segmentID').value != ""){
        ID = document.getElementById('segmentID').value;
    }
    if (document.getElementById('token').value != ""){
        authentication = document.getElementById('token').value;
    }
}

function getLeaderboard(){
    $.getJSON("https://www.strava.com/api/v3/segments/" + ID + "/leaderboard?&access_token=" + authentication + "&callback=?", function (data) {
        var start = data.entries[0].rank;
        for(var x = 0; x < data.entries.length; x++){
            output.push({
                rank: (start + x) + getFinisherSuffix((start + x) +""),
                name: data.entries[x].athlete_name,
                date: data.entries[x].start_date.substring(0, 10),
                formattedTime: data.entries[x].start_date,
                averageSpeed: getAverageSpeed(data.entries[x].elapsed_time, data.entries[x].distance)
            });
            
        }
        getLocation(); //call everything since AJAX would mess everything up!
    });
}

function getLocation(){
    $.getJSON("https://www.strava.com/api/v3/segments/" + ID + "?&access_token=" + authentication + "&callback=?", function (data) {
        for(var x = 0; x < output.length; x++){
            output[x].startCoordinate = splitIntoTokens(data.start_latlng);
            //console.log(output[x].startCoordinate[0]);
            //console.log("DATA:" + splitIntoTokens(data.start_latlng));
            output[x].endCoordinate = splitIntoTokens(data.end_latlng);
            output[x].elevation = data.average_grade;
        }
        getWeatherInformation();
    });
}

function ajaxWeatherInformation(num){
     var temp = "https://crossorigin.me/https://api.forecast.io/forecast/81c978e8db7b136e4bf3c8988c2d90a6/43.40,79.24?units=ca";
     var old = "https://crossorigin.me/https://api.forecast.io/forecast/" + weatherKey + "/" + output[num].startCoordinate[0] + "," + output[num].startCoordinate[1] + "," + output[num].formattedTime + "?units=ca";
     console.log(old);
     $.getJSON(old, function (info) {
        output[num].windSpeed = info.hourly.data[12].windSpeed; //fix so that you get the right hour!
        output[num].windBearing = info.hourly.data[12].windBearing;
        done++;
        if (done == output.length){
            updateTable();
        }
    });
}

function getWeatherInformation(){
    console.log("Name: " + output[9].name);
     for(var y = 0 ; y < output.length; y++){ //never use a for loop!!!!
         ajaxWeatherInformation(y);
    }
}

function calculateInfluenceRating(){
    return -1;
}

/* This function updates the table. Remember to update! */
function updateTable(){
    $("#computed tr td").remove();
    for(var x = 0; x < output.length; x++){
        $('#computed tr:last').after('<tr><td> ' + output[x].rank + '</td> <td>' + output[x].name + ' </td> <td> ' 
        + output[x].date + '</td><td>' + output[x].averageSpeed + 'km/h</td><td>'
        + output[x].windSpeed + ' km/h</td><td>' + convertToCardinal(output[x].windBearing) + '&deg;</td><td>'
         + longLatToCardinal(output[x].startCoordinate[0], output[x].startCoordinate[1],output[x].endCoordinate[0], output[x].endCoordinate[1]) 
         + '</td> </tr>');
    }
    //degrees = &deg;
}