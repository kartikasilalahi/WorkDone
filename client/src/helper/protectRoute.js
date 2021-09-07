import React from 'react';
import propTypes from 'prop-types';
import { Route, Redirect, useRouteMatch } from 'react-router-dom';

const ProtectedRoute = ({ component, path }) => {
    let isLoggedIn = localStorage.getItem('isLogin')
    return isLoggedIn === null && path === "/auth" ? <Route component={component} path={path} />
        : isLoggedIn === null ? <Route path={path} component={component} />
            : <Route component={component} path={path} />
};

ProtectedRoute.propTypes = {
    component: propTypes.object.isRequired,
    path: propTypes.string.isRequired,
};

export default ProtectedRoute;
