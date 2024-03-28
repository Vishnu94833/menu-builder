import React, { Component } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
// import { ConfigureStore } from './redux/configureStore';
import Main from "./components/MainComponent";
import { ConfigureStore } from "./redux/configureStore";
// import { createBrowserHistory as createHistory } from 'history'
// const history = createHistory()

const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <BrowserRouter>
        <div className="">
          <Main />
        </div>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
