<<<<<<< HEAD
const d3 = require('d3')

var data = [30, 86, 168, 281, 303, 365];

d3.select(".app")
  .selectAll("div")
  .data(data)
    .enter()
    .append("div")
    .style("width", function(d) { return d + "px"; })
    .text(function(d) { return d; });
=======

import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

const App = props => (
  <div>
    <h1>Start Coding...</h1>
  </div>
);

ReactDOM.render(<App/>, document.querySelector('.app'));
>>>>>>> 4a551ea07537d37d1ad31a3472aad66e61c1c7f9
