import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import EditProduct from "./Containers/EditProduct";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import { BrowserRouter as Router, Route } from "react-router-dom";

const store = configureStore();

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/edit-product" component={EditProduct} />
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(<Root store={store} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
