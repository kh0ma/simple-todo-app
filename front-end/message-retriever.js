import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit * 3,
    }
});

class MessageRetriever extends React.Component {

    PATH = "/messages";

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
            this.state.recent_messages.push(currentMessage);
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
            .then(() => {
                let updatedRecentMessages = this.state.recent_messages.filter(el => {
                    return el.id !== id;
                });
                this.setState(
                    {
                        recent_messages: updatedRecentMessages
                    }
                );

            });
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
                                message: result
                            }
                        );
                    },
                    (error) => {
                        this.setState(
                            {
                                error
                            }
                        );
                    }
                );
        }

    }

    render() {
        const {classes} = this.props;
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
                <Paper className={classes.paper}>
                    <Typography variant="subtitle1"
                                component="h2"
                                gutterBottom>
                        Message Retriever
                    </Typography>

                    <Typography variant="subtitle1"
                                component="h3"
                                gutterBottom>
                        Message: {message}
                    </Typography>

                    <form onSubmit={this.handleSubmit}>

                        <Input id="message"
                               name="message"
                               type="text"
                               placeholder="Enter message"
                               value={this.state.mes_value}
                               onChange={this.handleChange}/>
                        <Button type="submit" color="primary">Send message!</Button>

                    </form>

                    <Typography variant="h4"
                                component="h4"
                                gutterBottom>
                        Recent Messages:
                    </Typography>

                    <Table>
                        <TableBody>
                            {
                                recent_messages.slice().reverse().map((message, index) =>
                                    <TableRow key={index} hover>
                                        <TableCell>
                                            {message.id}
                                        </TableCell>
                                        <TableCell>
                                            {message.message}
                                        </TableCell>
                                        <TableCell>
                                            <Button color="secondary"
                                                    onClick={this.deleteMessage.bind(this, message.id)}>
                                                delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </Paper>
            );
        }

    }
}

export default withStyles(styles)(MessageRetriever);
