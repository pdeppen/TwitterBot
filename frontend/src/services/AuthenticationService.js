import Api from './Api'

export default {
    getTweets (username) {
        /* first argument is end point found in server/src/app.js */
        return Api().post('tweets', username)
    }
}
