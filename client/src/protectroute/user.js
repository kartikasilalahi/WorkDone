import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// const Dashboard = lazy(() => import('../Pages/Component/Page/user/dashboardUser'));
import Dashboard from '../pages/landingpage/user/dashboardUser';
import Notification from '../pages/landingpage/user/notification';
import Task from '../pages/landingpage/user/task';
import NotFound from './notFound';
import ChangePassword from '../pages/landingpage/user/changePassword';
import Report from '../pages/landingpage/user/report';
import Profile from '../pages/landingpage/user/profile';


const UseRoute = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/dashboard`} component={Dashboard} />
      <Route path={`${path}/notifications`} component={Notification} />
      <Route path={`${path}/all-task`} component={Task} />
      <Route path={`${path}/change-password`} component={ChangePassword} />
      <Route path={`${path}/report`} component={Report} />
      <Route path={`${path}/profile`} component={Profile} />
      <Route exact path="*" component={NotFound} />

    </Switch>
  );
};

export default UseRoute;
