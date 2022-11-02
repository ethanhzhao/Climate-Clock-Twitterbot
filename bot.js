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
    var timeLeft = "There is " + days + " days and " + hours + " hours and " + minutes + " minutes and " + seconds + " seconds from complete environmental destruction.";
	var extraInfo = "\n- - -\nA warming of 1.5 degrees celcius will likely result in large-scale drought, famine, loss of entire ecosystems/habitable land, and many more devastating global impacts. Learn more below.\n#climateclock"
    T.post('statuses/update', { status: timeLeft + extraInfo }, function (error, response) {
        if (response) {
            console.log('Success! Tweet posted.');
        }
        if (error) {
            console.log('Error: ', error);
        }
    })
	
 
}

tweet();
setInterval(tweet, 1000 * 60 * 60);
