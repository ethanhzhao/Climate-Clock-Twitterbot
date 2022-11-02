// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

function tweet(){
    //time left to limit global warming to 1.5 deg C date is 07/2029 based on https://climateclock.world/
    var deadline = new Date("jul 22, 2029 11:59").getTime();
    var now = new Date().getTime();
    var t = deadline - now;
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));  
    var seconds = ((t % (1000 * 60)) / 1000);
    var timeLeft = "There are " + days + " days and " + hours + " hours and " + minutes + " minutes and " + seconds + " seconds from complete environmental destruction.";
	var extraInfo = "\n-\nThe warming of 1.5 degrees C will likely cause large-scale drought, famine, loss of entire ecosystems/habitable land, and many other devastating events. #climateclock"
    T.post('statuses/update', { status: timeLeft + extraInfo }, function (error, response) {
        if (response) {
            console.log('Success! Tweet posted.');
        }
        if (error) {
            console.log('Error: ', error);
        }
    })
	
 
}

// var stream = T.stream('statuses/filter', { track: '@<EnvironmentalCD>'});
// stream.on('tweet', tweetEvent);
 
// function tweetEvent() {
//     console.log("Follow event!");
//     T.post('statuses/update', "This is a response", function (error, response) {
//         if (response) {
//             console.log('Success');
//         }
//         if (error) {
//             console.log('error', error);
//         }
//     })
// }


tweet();
setInterval(tweet, 1000 * 60 * 60);



