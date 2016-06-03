#Strava Segment Weather Analysis
##Purpose
The purpose of this web app is to analyze segment efforts on Strava and determine if wind was a considerable factor in the performance.

##Features
* Easy to use interface
* Appealing design with material design
* Quick operation with simple compute option and minimal user intervention
* Includes Google maps to visually see and confirm segment location
* Allows to compare data easily with automatically generated correlation calculation

##How Does it Work?
This web application makes use of the `Strava API Version 3`, and `Forecast API Version 2`. With the use of `JQuery AJAX requests`, the table is populated. Due to limitations in the Strava API Version 3, each user has to enter their authentication ID to view their performance on segments that they participated in. Apart from fetching information, most of the operations were done using vectors, trigonometry, and some longitude/latitude knowledge and working with cardinal directions! The front-end of the website was made possible through the use of `Materialize CSS`. Finally, it uses the `Google Maps API` to show the segment, by converting the summary polyline from Strava API into points on the map.

##Screenshot
![Screenshot](http://strava-weather-analysis.paperplane.io/img/Screenshot1.png)
![Screenshot](http://strava-weather-analysis.paperplane.io/img/Screenshot2.png)
![Screenshot](http://strava-weather-analysis.paperplane.io/img/Screenshot3.png)

Feel free to contribute.