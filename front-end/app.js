import React from 'react';
import ReactDOM from 'react-dom';

var api_url = URL;

ReactDOM.render(
  <div>
    <a href = {api_url}>Link</a>
    <h1>dsdsd</h1>
    <h2>{api_url}</h2>
  </div>,
  document.getElementById('root')
);

console.log(URL + "ololololo");
