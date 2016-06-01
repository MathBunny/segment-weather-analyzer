var ID = 10112025; //5661031
var authentication = "b6d69060589a4ebe5c4efbcb5069bf2d50224bf2";

function ajaxRequest(){
    console.log (document.getElementById('token').value);
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

//ajaxRequest();