import React from 'react';
import ReactDOM from 'react-dom';
import Datatable from './test';
import AjaxDemo from './ajax-demo';

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

    <h1>AjaxDemo</h1>
    <AjaxDemo />
  </div>,
  document.getElementById('root')
);

console.log(URL + "ololololo");
