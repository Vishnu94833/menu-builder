import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import "./App.css";
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import Main from './components/MainComponent';
import { createBrowserHistory as createHistory } from 'history'
const history = createHistory()

const store = ConfigureStore();

class App extends Component{
 
  render(){
  return (
    <Provider store={store}>
    <HashRouter history={history}>
      <div className="">
        <Main />
      </div>
    </HashRouter>
  </Provider>
  );
  }
}

export default App;
