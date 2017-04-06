import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import {createLogger} from 'redux-logger';
import './css/bulma.css';
import './css/font-awesome.css';
import './css/App.css';

import App from './components/App';
import ArticleList from './components/ArticleList';
import ArticlePage from './components/ArticlePage';
import reducer from './reducer/index.reducer';

const logger = createLogger();
const store = createStore(reducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={ArticleList}/>
        <Route path="/topics/:topic" component={ArticleList}/>
        <Route path="/articles/:article_id" component={ArticlePage}/>
      </Route>
    </Router>
  </Provider>,
document.getElementById('app'));
