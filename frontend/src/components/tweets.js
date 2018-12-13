import React, { Component } from 'react';
import AuthenticationService from '../services/AuthenticationService.js';

class Tweets extends Component {

    constructor (props) {
        super(props)
        this.state = {
            receivedTweets: [],
            username: "",
            showUsername: false
        }
    }

    componentDidMount() {
    }

    displayTweets() {
        AuthenticationService.getTweets({username: this.state.username})
            .then(response => this.setState({receivedTweets: response.data}))
            .catch(response => console.log('error: ' + response))
    }

    usernameChanged = (event) => {
        this.setState({showUsername: false})
        this.setState({username: event.target.value})
    }

    handleSubmitClick = () => {
        this.setState({showUsername: true})
        this.displayTweets()
    }

    render() {
        const username = this.state.username
        const tweetsList =
                <ol className = "list-group">
                    {this.state.receivedTweets.map(tweet => (
                        <li className = "list-group-item">{tweet}</li>
                    ))}
                </ol>

        const usernameDiv = this.state.showUsername ? <h1>{username}'s tweets</h1> : <div/>
        return (
            <div className="Tweets">
                <header className="Tweets-header">
                </header>

                <h3>Enter Username</h3>
                <input value={this.state.username} type="text" onChange={this.usernameChanged}></input>
                <button value="submit" onClick={this.handleSubmitClick}>Submit</button>

                {usernameDiv}

                {tweetsList}
            </div>
        );
    }
}

export default Tweets;
