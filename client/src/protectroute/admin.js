import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Dashboard from '../pages/landingpage/admin/dashboardAdmin'
import Departemen from '../pages/landingpage/admin/departemen'
import User from '../pages/landingpage/admin/user'
import Task from '../pages/landingpage/admin/task'
import Project from '../pages/landingpage/admin/project'
import ChangePassword from '../pages/landingpage/admin/change-password'
import NotFound from './notFound'

const AdminRoute = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/dashboard`} component={Dashboard} />
      <Route path={`${path}/departemen`} component={Departemen} />
      <Route path={`${path}/all-user`} component={User} />
      <Route path={`${path}/all-task`} component={Task} />
      <Route path={`${path}/all-project`} component={Project} />
      <Route path={`${path}/change-password`} component={ChangePassword} />
      <Route exact path="*" component={NotFound} />

    </Switch>
  );
};
export default AdminRoute;
