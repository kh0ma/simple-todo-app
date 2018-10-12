import React from 'react';
import ReactDOM from 'react-dom';

class MessageRetriever extends React.Component {

    PATH = "/messages";

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            message: null,
            mes_value: "",
            recent_messages: {}
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
        let currentMessage = data.get("message");
        fetch(URL + this.PATH, {
            method: 'POST',
            body: currentMessage,
        })
            .then(res => res.json())
            .then((result) => {
                    this.refreshCurrentMessage(currentMessage);
                    this.refreshMessages(result)
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
        this.refreshCurrentMessage();
        this.refreshMessages();
    }

    refreshMessages(currentMessage) {
        if (currentMessage != null) {
            Object.assign(this.state.recent_messages, currentMessage);
        } else {
            fetch(URL + this.PATH)
                .then(res => res.json())
                .then(result => {
                        debugger;
                        console.log(result);
                        this.setState(
                            {
                                isLoaded: true,
                                recent_messages: result
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

    }

    deleteMessage(id) {
        fetch(URL + this.PATH + "/" + id,
            {
                method: 'DELETE'
            }
        )
            .then(() => this.refreshMessages());
    }

    refreshCurrentMessage(currentMessage) {
        if (currentMessage != null) {
            this.setState(
                {
                    message: currentMessage
                }
            )
        } else {
            fetch(URL + this.PATH + "/current-message")
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

    }

    render() {
        const {
            error,
            isLoaded,
            message,
            recent_messages
        } = this.state;
        const keys = Object.keys(recent_messages);
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
                    <table>
                        <tbody>
                        {
                            keys.reverse().map((key, index) =>
                                <tr key={index}>
                                    <td>
                                        {key}
                                    </td>
                                    <td>
                                        {recent_messages[key]}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => this.deleteMessage(key)}>delete
                                        </button>
                                    </td>

                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            );
        }

    }
}

export default MessageRetriever;
