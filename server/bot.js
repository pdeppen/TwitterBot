/**
 * Use of this API can be found at -- https://github.com/ttezel/twit
 * Twitter endpoints -- https://developer.twitter.com/en/docs
 */

console.log('The bot is starting...\n');

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config)

/* include express */
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')

const app = express()

app.use(bodyParser.json())
app.use(cors())
const port = 3001

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

/* default route */
app.get('/', (req, res) => {
    res.send({
        message: 'Hello World!'
    })
})

app.post('/tweets', (req, res) => {
    var tweets;
    /* waits until promise is resolved/rejected before moving on */
    getTweets(req.body.username)
        .then( (result) => {
            tweets = result
            for (var i = 0; i < result.length; i++)
                tweets[i] = result[i].created_at + " "+ result[i].full_text;

            res.send(tweets);
            console.log('Tweets recevied');
        })
        .catch( (err) => {
            console.log(err)
        })
})

/* promise */
function getTweets(username) {
    var tweets;

    return new Promise (function(resolve, reject)
    {
        T.get('statuses/user_timeline', {screen_name: username, count: 1000, include_rts: false, tweet_mode:'extended'}, (err, data, response) => {
            if (err) reject(err);
            else {
                tweets = data;
                resolve(tweets);
            }
        });
    })
}

var params = {
    q: 'rainbow', // get tweets with this phrase
    count: 2 // # of tweets to look for
};

/* get tweets by a user */
//T.get('statuses/user_timeline', {screen_name: 'KanyeWest', count: 5, include_rts: false}, gotData);

/* get likes by a user */
//T.get('favorites/list', {screen_name: 'KanyeWest'}, gotLikes);


/* function called after T.get(statuses) */
function gotData(err, data, response) {
    var tweets = data;
    for (var i = 0; i < tweets.length; i++) {
        console.log(i + " : " + tweets[i].created_at + ": " + tweets[i].text);
    }
}

/* posts a tweet */
function postTweet(tweet)
{
    T.post('statuses/update', { status: tweet }, function(err, data, response) {
       console.log('Tweet posted');
    })
}
