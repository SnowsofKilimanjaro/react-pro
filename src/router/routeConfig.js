import React, { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
function WaitingComponent(Component) {
  return props => (
    <Suspense fallback={null}>
      <Component {...props} />
    </Suspense>
  );
}
export const routesConfig = [
  {
    path: "/home",
    component: WaitingComponent(lazy(() => import(/* webpackChunkName: "Home */ "../components/Home"))),
    exact: true
  },
  {
    path: "/workbench",
    component: WaitingComponent(lazy(() => import(/* webpackChunkName: "Home */ "../components/Home"))),
    exact: false,
    routes: [
      {
        path: "/workbench/demo1",
        component: WaitingComponent(lazy(() => import(/* webpackChunkName: "Home */ "../components/Home"))),
        exact: true
      },
      {
        path: "/workbench/demo1",
        component: WaitingComponent(lazy(() => import(/* webpackChunkName: "Home */ "../components/Home"))),
        exact: true
      }
    ]
  },
  {
    path: "/count",
    component: WaitingComponent(lazy(() => import(/* webpackChunkName: "Count */ "../components/Count"))),
    exact: true
  }
];
export  function RouteWithSubRoutes (route) {
    return (
        <Route
            exact={route.exact}
            path={route.path}
            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}
