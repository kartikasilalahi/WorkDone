import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Dashboard from '../pages/landingpage/admin/dashboardAdmin'
import NotFound from './notFound'

const AdminRoute = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/dashboard`} component={Dashboard} />
      <Route exact path="*" component={NotFound} />

    </Switch>
  );
};
export default AdminRoute;
