import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
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
    <BrowserRouter history={history}>
      <div className="">
        <Main />
      </div>
    </BrowserRouter>
  </Provider>
  );
  }
}

export default App;
