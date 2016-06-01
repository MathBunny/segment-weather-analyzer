//81c978e8db7b136e4bf3c8988c2d90a6

//decimal degrees

/* Converts time (s) and distance (m) to km/h! */
function getAverageSpeed(time, distance){
    distance/=1000;
    time/=3600;
    return parseFloat(distance/time).toFixed(1);
}

/* displacement vector
   take into consideration the distance and the displacement distance ?? */

function displacement(lat, long){

}

//Convert geographic coordinate to decimal degrees
function convertFromDMS(str){
    return str.D + (str.M)/60 + str.S/3600;
}

/* This method returns the suffix for each respective placement */
function getFinisherSuffix(str){
    var end = str.charAt(str.length-1);

    if (end == '1'){
        return "st";
    }
    else if (end == '2'){
        return "nd";
    }
    else if (end == '3'){
        return "rd";
    }
    else{
        return "th";
    }
}