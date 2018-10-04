import React from 'react';
import ReactDOM from 'react-dom';
import Datatable from './test';
import AjaxDemo from './ajax-demo';
import MessageRetriever from './message-retriever';

var api_url = URL;

ReactDOM.render(
  <div>
    <a href = {api_url}>Link</a>
    <h1>dsdsd</h1>
    <h1>s</h1>
    <ul>
      <li>lol</li>
    </ul>
    <h2>{api_url}</h2>
<hr/>
    <h1>AjaxDemo</h1>
    <AjaxDemo />

<hr/>
    <h1>Message Retriever</h1>
    <MessageRetriever />
  </div>,
  document.getElementById('root')
);

console.log(URL + "ololololo");
