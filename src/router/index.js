import { routesConfig, RouteWithSubRoutes } from "./routeConfig";
import { Redirect, Switch } from "react-router-dom";

// const Routes = () => (
//     <Switch>
//       {routesConfig.map((route, i) => (
//         <RouteWithSubRoutes key={i} {...route} />
//       ))}
//       <Redirect from="" to="/home" />
//     </Switch>
// );

// export default Routes;
// import React from "react";
// import { Route, Link, Switch } from "react-router-dom";

// import Home from "../components/Home";
// import Count from "../components/Count";
// const PrimaryLayout = () => (
//   <div className="primary-layout">
//     <header>
//       <Link to="/">toHome</Link>&emsp;|&emsp;
//       <Link to="/count">toCount</Link>
//     </header>
//     <main>
//       <Switch>
//         <Route path="/" exact component={Home} />
//         <Route path="/count" exact component={Count} />
//       </Switch>
//     </main>
//   </div>
// );

// export default PrimaryLayout;
