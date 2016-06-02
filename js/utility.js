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

function longLatToCardinal(lat1, long1, lat2, long2){
    margin = Math.PI/90; // 2 degree tolerance for cardinal directions
    o = lat1 - lat2;
    a = long1 - long2;
    angle = Math.atan2(o,a);

    if (angle > -margin && angle < margin)
            return "E";
    else if (angle > Math.PI/2 - margin && angle < Math.PI/2 + margin)
            return "N";
    else if (angle > Math.PI - margin && angle < -Math.PI + margin)
            return "W";
    else if (angle > -Math.PI/2 - margin && angle < -Math.PI/2 + margin)
            return "S";
    
    if (angle > 0 && angle < Math.PI/2) 
        return "NE";
    else if (angle > Math.PI/2 && angle < Math.PI) {
        return "NW";
    } else if (angle > -Math.PI/2 && angle < 0) {
        return "SE";
    } else {
        return "SW";
    }
    return "error";
}

function convertToCardinal(q){ 
    s=String;
    s.prototype.a=s.prototype.replace;
    var a=q/11.25,a=a+0.5|0,b,k,c=a,d=c%8,c=c/8|0,e=["north","east","south","west"],f,g,h;
    f=e[c];
    g=e[(c+1)%4];
    h=f==e[0]|f==e[2]?f+g:g+f;
    b="1;1 by 2;1-C;C by 1;C;C by 2;2-C;2 by 1".split(";")[d].a(1,f).a(2,g).a("C",h);
    k=b.a(/north/g,"N").a(/east/g,"E").a(/south/g,"S").a(/west/g,"W").a(/by/g,"").a(/[\s-]/g,"");
    b=b[0].toUpperCase()+b.slice(1); //credits to overflow for such a short solution!
    return(k)
}

function splitIntoTokens(strIn){
    var str = strIn.toString();
    return [str.substring(0, str.indexOf(",")-1), str.substring(str.indexOf(",")+1, str.length-1)];
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