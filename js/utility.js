/* Converts time (s) and distance (m) to km/h! */
function getAverageSpeed(time, distance){
    distance/=1000;
    time/=3600;
    return parseFloat(distance/time).toFixed(1);
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