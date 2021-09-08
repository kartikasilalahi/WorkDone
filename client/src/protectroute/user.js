import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// const Dashboard = lazy(() => import('../Pages/Component/Page/user/dashboardUser'));
import Dashboard from '../pages/landingpage/user/dashboardUser';
import Task from '../pages/landingpage/user/notification';
import NotFound from './notFound';

const UseRoute = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/dashboard`} component={Dashboard} />
      <Route path={`${path}/notifications`} component={Task} />
      <Route exact path="*" component={NotFound} />

    </Switch>
  );
};

export default UseRoute;
