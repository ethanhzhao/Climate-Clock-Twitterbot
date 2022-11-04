// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

// This is the URL of a search for the latest tweets on the '#environmentalimpact' hashtag.
var environmentalImpactSearch = {q: "#EnvironmentalImpact", count: 10, result_type: "recent"};

function tweet(){
    //time left to limit global warming to 1.5 deg C date is 07/2029 based on https://climateclock.world/
    var deadline = new Date("jul 22, 2029 11:59").getTime();
	//current date
    var now = new Date().getTime();
	//difference between deadline and now
    var t = deadline - now;
	//calculate days from the difference
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
	//calculate hours from the difference
    var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	//calculate minutes from the difference
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));  
	//calculate seconds from the difference
    var seconds = ((t % (1000 * 60)) / 1000);
	//tweet content
    var timeLeft = "There are " + days + " days and " + hours + " hours and " + minutes + " minutes and " + seconds + " seconds from complete environmental destruction.";
	var extraInfo = "\n-\nThe warming of 1.5 degrees C will likely cause large-scale drought, famine, loss of entire ecosystems/habitable land, and many other devastating events. #climateclock"
    //post the tweet with the countdown and some extra information about the countdown
	T.post('statuses/update', { status: timeLeft + extraInfo }, function (error, response) {
        if (response) {
			//log successful post
            console.log('Success! Tweet posted.');
        }
        if (error) {
			//print any errors if there are any
            console.log('Error: ', error);
        }
    })
	
 
}

//This function will retweet the most recent tweet on #EnvironmentalImpact
function retweet() {
    T.get('search/tweets', environmentalImpactSearch, function(error, data) {
     // log out any errors and responses
     console.log(error, data);
     // If our search request to the server had no errors
    if (!error) {
        //then we grab the ID of the tweet we want to retweet
        var retweetId = data.statuses[0].id_str;
        //Tell Twitter we want to retweet it
        T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
            if (response) {
			//log successful retweet
               console.log('Success! Tweet retweeted.')
            }
            // If there was an error with our Twitter call, we print it out here.
            if (error) {
               console.log('There was an error with Twitter:', error);
            }
        })
    }
     // However, if our original search request had an error, we want to print it out here.
    else {
        console.log('There was an error with your hashtag search:', error);
    }
    });
}

//this function will reply to the same most recent retweeted post on #EnvironmentalJustice
function reply(){
    //gets the most recent post on #EnvironmentalJustic
    T.get('search/tweets', environmentalImpactSearch, function(error, data){
        console.log(error, data);
        // If our search request to the server had no errors
        if (!error) {
            //variables of the retweeted post
            var id = data.statuses[0].id_str;
            var userHandle = data.statuses[0].user.screen_name;
            //String of the repsonse
            var response = "Hey @" + userHandle + ". Nice post!";
           
            //posts reply on account
            T.post('statuses/update', {status: response, in_reply_to_status_id: id}, function(error, response){
                //logs if there is an error
                if(error){
                    console.log("Could not reply to the post", error);
                }
                //logs if it replied successfully
                if(response){
                    console.log("Success! Tweet replied to.");
                }
            })  
        }
    });
}

//run all functions
tweet();
retweet();
reply();

//set intervals for all the functions
setInterval(tweet, 1000 * 60 * 60); //tweet every hour
setInterval(retweet, 1000 * 60 * 60 * 2); //retweet every 2 hours
setInterval(reply, 1000 * 60 * 60 * 2); //reply every 2 hours


