import React from 'react';
import ReactDOM from 'react-dom';

class MessageRetriever extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            message: null,
            mes_value: "",
            recent_messages: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState(
            {
                mes_value: event.target.value
            }
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        debugger;
        fetch(URL + "/message", {
            method: 'POST',
            body: data.get("message"),
        })
            .then(res => res.text())
            .then((result) => {
                    const current_message = result;
                    const {
                        recent_messages
                    } = this.state;
                    recent_messages.push(current_message);
                    this.setState(
                        {
                            isLoaded: true,
                            message: current_message,
                            recent_messages: recent_messages
                        }
                    );
                },
                (error) => {
                    this.setState(
                        {
                            isLoaded: true,
                            error
                        }
                    );
                }
            )
            .finally(() => {
                this.setState(
                    {
                        mes_value: ''
                    }
                );
            });
    }

    componentDidMount() {
        fetch(URL + "/message")
            .then(res => res.text())
            .then(result => {
                    this.setState(
                        {
                            isLoaded: true,
                            message: result
                        }
                    );
                },
                (error) => {
                    this.setState(
                        {
                            isLoaded: true,
                            error
                        }
                    );
                }
            );
    }

    render() {
        const {
            error,
            isLoaded,
            message,
            recent_messages
        } = this.state;
        if (error) {
            return (
                <div> Error: {
                    error.message
                }
                </div>
            );
        } else if (!isLoaded) {
            return <div> Loading... </div>;
        } else {
            return (
                <div>
                    <h3>Message: {message}</h3>

                    <form onSubmit={this.handleSubmit}>

                        <label htmlFor="message">Enter message</label>
                        <input id="message" name="message" type="text"
                               value={this.state.mes_value}
                               onChange={this.handleChange}/>
                        <button>Send message!</button>

                    </form>

                    <h4>Recent Messages:</h4>
                    <ul>
                        {
                            recent_messages.slice().reverse().map((message, index) =>
                                <li key={index}>
                                    {message}
                                </li>
                            )
                        }
                    </ul>
                </div>
            );
        }

    }
}

export default MessageRetriever;
