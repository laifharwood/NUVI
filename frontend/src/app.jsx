var React = require('react');
var ReactDOM = require('react-dom');
var Main = require('./components/main.jsx')

var mainElement = React.createElement(Main)

ReactDOM.render(mainElement, document.querySelector('.container-fluid'));
