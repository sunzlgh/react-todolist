// import React from 'react';
// import ReactDOM from 'react-dom';
// import Todolist from './components/todolist';
// import TypeNew from './components/typenew';
// import List from './components/list';
// 'use strict'
require('./styles/index.scss');
var React = require('react');
var ReactDOM = require('react-dom');
var Todolist = require('./components/todolist');


ReactDOM.render(<Todolist></Todolist>, document.getElementById('app'));
