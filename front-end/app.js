import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import MessageRetriever from './message-retriever';

ReactDOM.render(
    <div>
        <Grid container>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
                <MessageRetriever/>
            </Grid>
        </Grid>
    </div>,
    document.getElementById('root')
);
