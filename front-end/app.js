import React from 'react';
import ReactDOM from 'react-dom';
import Datatable from './test';

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
    <Datatable/>
  </div>,
  document.getElementById('root')
);

console.log(URL + "ololololo");
