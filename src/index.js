import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import { routesConfig, RouteWithSubRoutes } from "./router/routeConfig";
import { Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./Store";
/*初始化*/
renderWithHotReload();

/*热更新*/
if (module.hot) {
  module.hot.accept("./router/index.js", () => {
    // const Router = require("./router/index.js").default;
    renderWithHotReload();
  });
}
function getRoutes() {
  return (
    <Switch>
      {routesConfig.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
      <Redirect from="" to="/home" />
    </Switch>
  );
}
function renderWithHotReload() {
  ReactDOM.render(
    <Provider store={Store}>
      <AppContainer>
        <BrowserRouter>
        {getRoutes()}
        </BrowserRouter>
      </AppContainer>
    </Provider>,
    document.getElementById("root")
  );
}

// 判断该浏览器支不支持 serviceWorker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(registration => {
        console.log("service-worker registed");
      })
      .catch(error => {
        console.log("service-worker registed error");
      });
  });
}
