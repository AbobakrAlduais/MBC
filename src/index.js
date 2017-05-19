import React from 'react';
import ReactDOM from 'react-dom';
import AllArticls from './AllArticls';
//import './index.css';

ReactDOM.render(
  <AllArticls 
  postArticlesurl='http://localhost:4000/article/create'
  getArticlesurl='http://localhost:4000/articles/view'
  pollInterval={1000}/>,
  document.getElementById('root')
);
